# CDD LABS

디디의 아이디어 보관소. YAML로 쓴 계획 문서를 Astro로 정적 빌드해 [cdd.co.kr](https://cdd.co.kr)에 발행합니다.

```sh
pnpm install
pnpm dev     # http://localhost:4321
pnpm build   # dist/
```

## 문서 쓰기

`content/entries/_template.yaml`을 복사해 `content/entries/<이름>.yaml`로 저장하면 `/entries/<이름>`으로 발행됩니다. 형식은 `src/content.config.ts`에 정의돼 있어 잘못 쓰면 빌드가 실패합니다.

## 배포

`main`에 push하면 GitHub Actions가 빌드해 GitHub Pages로 배포합니다.
