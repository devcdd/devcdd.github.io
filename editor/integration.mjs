import { access, readdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const POSTS = fileURLToPath(new URL("../content/posts/", import.meta.url));
const PAGE = fileURLToPath(new URL("./index.html", import.meta.url));
// 글자·숫자·하이픈만 허용해 `../` 같은 경로 탈출을 막음
const SLUG = /^[\p{L}\p{N}-]+$/u;
const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "[::1]"]);

function send(res, status, data) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(data));
}

async function readJson(req) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 2_000_000) throw new Error("본문이 2MB 를 넘습니다.");
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

// frontmatter 한 줄 값만 간단히 읽음 (주석·따옴표 제거)
function pick(src, key) {
  return (src.match(new RegExp(`^${key}:(.*)$`, "m"))?.[1] ?? "")
    .replace(/\s+#.*$/, "")
    .trim()
    .replace(/^['"]|['"]$/g, "");
}

async function listPosts() {
  const files = (await readdir(POSTS)).filter((f) => f.endsWith(".md") && !f.startsWith("_"));
  const posts = await Promise.all(
    files.map(async (f) => {
      const src = await readFile(POSTS + f, "utf8");
      return { slug: f.slice(0, -3).normalize("NFC"), title: pick(src, "title"), date: pick(src, "date"), draft: pick(src, "draft") === "true" };
    }),
  );
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

async function handle(req, res, server) {
  const url = new URL(req.url ?? "/", "http://localhost");
  if (url.pathname === "/") {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.end(await readFile(PAGE));
  }

  // 다른 사이트가 브라우저를 통해 로컬 파일을 쓰지 못하게, 쓰기 요청은 같은 로컬 출처만 받음
  if (req.method !== "GET") {
    const host = (req.headers.host ?? "").replace(/:\d+$/, "");
    if (!LOCAL_HOSTS.has(host) || req.headers.origin !== `http://${req.headers.host}`) {
      return send(res, 403, { error: "로컬 편집기에서 보낸 요청만 받습니다." });
    }
  }

  if (url.pathname === "/api/posts" && req.method === "GET") return send(res, 200, await listPosts());
  if (url.pathname === "/api/preview" && req.method === "POST") {
    // 사이트와 같은 렌더러를 dev 서버에서 불러와 미리보기가 실제 페이지와 똑같이 나오게 함
    const { renderWithToc } = await server.ssrLoadModule("/src/lib/entries.ts");
    const { content } = await readJson(req);
    const [, fm = "", body = content] = String(content).match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/) ?? [];
    return send(res, 200, { title: pick(fm, "title"), html: renderWithToc(body).html });
  }

  const m = url.pathname.match(/^\/api\/posts\/([^/]+)$/);
  if (!m) return send(res, 404, { error: "없는 경로입니다." });
  const slug = decodeURIComponent(m[1]).normalize("NFC");
  if (!SLUG.test(slug)) return send(res, 400, { error: "slug 에는 글자·숫자·하이픈만 쓸 수 있습니다." });
  const file = `${POSTS}${slug}.md`;

  if (req.method === "GET") {
    try {
      return send(res, 200, { content: await readFile(file, "utf8") });
    } catch {
      return send(res, 404, { error: "글이 없습니다." });
    }
  }
  if (req.method === "PUT") {
    const { content, create } = await readJson(req);
    if (typeof content !== "string") return send(res, 400, { error: "content 가 필요합니다." });
    if (create && (await access(file).then(() => true, () => false))) {
      return send(res, 409, { error: "같은 slug 의 글이 이미 있습니다." });
    }
    await writeFile(file, content);
    return send(res, 200, { ok: true });
  }
  return send(res, 405, { error: "지원하지 않는 메서드입니다." });
}

/** `astro dev` 에서만 /__editor 로 글 편집기를 띄움. 빌드 결과에는 포함되지 않음 */
export default function postEditor() {
  return {
    name: "post-editor",
    hooks: {
      "astro:server:setup": ({ server, logger }) => {
        server.middlewares.use("/__editor", (req, res) => {
          handle(req, res, server).catch((e) => send(res, 500, { error: e.message }));
        });
        logger.info("글 편집기: /__editor");
      },
    },
  };
}
