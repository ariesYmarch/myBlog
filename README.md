# your.log — 개인 블로그

GitHub Pages + Jekyll로 운영하는 개인 블로그입니다.

## 포함된 기능

- Markdown으로 글 작성
- Git commit / push 기반 배포
- 반응형 디자인
- 라이트 / 다크 모드
- 글 검색
- 태그 필터
- 글 상세 페이지
- 자동 목차(TOC)
- 이전 글 / 다음 글 이동
- RSS feed
- Open Graph 메타데이터
- 404 페이지
- GitHub Actions를 통한 GitHub Pages 자동 배포

## 1. 개인 정보 수정

`_config.yml`에서 아래를 바꾸세요.

```yml
title: "your.log"
description: "내 블로그 설명"
author:
  name: "내 이름"
  bio: "내 소개"
social:
  github: "https://github.com/내아이디"
```

`_layouts/home.html`의 About 문구도 원하는 내용으로 바꿀 수 있습니다.

## 2. 새 글 쓰기

`_posts` 폴더에 파일을 만듭니다.

파일 이름:

```text
YYYY-MM-DD-영문-slug.md
```

예:

```text
2026-10-01-my-first-dev-note.md
```

내용:

```md
---
layout: post
title: "글 제목"
date: 2026-10-01 20:00:00 +0900
categories: [dev]
tags: [javascript, study]
description: "글 목록에 표시할 한 줄 설명"
---

본문을 여기에 작성합니다.

## 소제목

Markdown을 그대로 사용하면 됩니다.

> 인용문

`inline code`

```js
console.log("hello");
```
```

저장하고 Git에 push하면 자동으로 배포됩니다.

## 3. GitHub Pages 설정

Repository → **Settings → Pages**

- Source: **GitHub Actions**

이후 `main` 브랜치에 push할 때마다 `.github/workflows/pages.yml`이 사이트를 빌드하고 배포합니다.

## 4. 로컬에서 미리보기

Ruby가 설치되어 있다면:

```bash
bundle install
bundle exec jekyll serve
```

브라우저에서:

```text
http://localhost:4000
```

## 5. 추천 운영 방식

글은 `_posts` 안의 Markdown 파일로만 관리하세요.

```text
my-blog/
├── _posts/
│   ├── 2026-09-27-hello-world.md
│   └── 2026-10-01-my-first-dev-note.md
├── _layouts/
├── assets/
├── .github/
└── _config.yml
```

이 구조의 장점은 **블로그 글 자체가 Git의 history에 남는다는 것**입니다. 나중에 글을 수정하거나 예전 버전으로 되돌리기도 쉽습니다.
