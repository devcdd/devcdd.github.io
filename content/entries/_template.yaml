# 새 문서 템플릿 — 복사해서 파일명을 바꿔 사용하세요.
# 파일명이 `_` 로 시작하면 빌드에서 제외됩니다.

code: LAB-000
title: 문서 제목
type: service         # service(서비스 기획) | life(인생 업그레이드) | etc(기타)
status: idea          # idea(아이디어) → building(진행중) → done(완성)
created: 2026-01-01
updated: 2026-01-01   # 선택
tags: [tag-a, tag-b]
summary: >
  목록과 카드에 노출되는 한두 문장 요약.

hypothesis: >        # 선택 — 실험/기획의 핵심 가설
  만약 X 를 하면 Y 가 될 것이다.

specs:               # 선택 — 핵심 수치/사양 카드
  - label: 감지 거리
    value: 3~4cm
    note: 보충 설명 (선택)

flow:                # 선택 — 동작 흐름 다이어그램
  - label: 첫 단계
    detail: 설명 (선택)
  - label: 마지막 단계

goals:               # 선택
  - 목표 1
  - 목표 2

milestones:          # 선택
  - title: 첫 번째 단계
    due: 2026-02-01
    done: false

sections:            # 본문. body 는 Markdown 지원
  - heading: 배경
    body: |
      왜 이걸 하려는지.
  - heading: 계획
    beforeMilestones: true   # 선택 — Milestones 위에 표시
    body: |
      - 단계별 내용
      - **강조**, `코드`, [링크](https://example.com)

links:               # 선택
  - label: 참고 자료
    url: https://example.com

draft: false         # true 면 빌드에서 숨김
