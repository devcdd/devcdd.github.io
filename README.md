# CDD LABS

디디의 아이디어 보관소. Markdown으로 쓴 글(끄적끄적), 공부 기록(차곡차곡), 계획 문서(뚝딱뚝딱), 컨퍼런스 기록(기웃기웃)을 Astro로 정적 빌드해 [cdd.co.kr](https://cdd.co.kr)에 발행합니다.

```sh
pnpm install
pnpm dev     # http://localhost:4321 (글 편집기: /__editor)
pnpm build   # dist/
```

## 문서 쓰기

`content/entries/_template.md`를 복사해 `content/entries/<이름>.md`로 저장하면 `/entries/<이름>`으로 발행됩니다. 끄적끄적 글은 `content/posts/<이름>.md`, 차곡차곡 글은 `content/notes/<이름>.md`에 쓰고 이미지는 각각 `public/posts/<이름>/`, `public/notes/<이름>/`에 둡니다. 뚝딱뚝딱 문서의 이미지는 `public/entries/<이름>/`에 둡니다. 기웃기웃은 행사 소개를 `content/conferences/<행사>.md`에, 세션 글을 같은 이름 폴더 `content/conferences/<행사>/<세션>.md`에 쓰며 세션은 `time` 순으로 정렬됩니다. frontmatter 형식은 `src/content.config.ts`에 정의돼 있어 잘못 쓰면 빌드가 실패합니다.

## 배포

`main`에 push하면 GitHub Actions가 빌드해 GitHub Pages로 배포합니다. 이 저장소(`devcdd.github.io`)가 cdd.co.kr의 루트이고, 블로그는 `devcdd/blog` 저장소에서 `/blog`로 배포됩니다. 내부 링크는 `src/lib/site.ts`의 `url()`로 만들어 경로가 바뀌어도 대응합니다.
