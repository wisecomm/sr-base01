# Next.js 16+, Tailwind CSS 4, TypeScript를 위한 보일러플레이트 및 스타터

<p align="center">
  <a href="https://demo.nextjs-boilerplate.com">
    <img
      src="public/assets/images/nextjs-starter-banner.png?raw=true"
      alt="Next js starter banner"
      style="max-width: 100%; height: auto;"
    />
  </a>
</p>

🚀 App Router, Tailwind CSS, TypeScript가 포함된 Next.js용 보일러플레이트 및 스타터입니다. ⚡️ 개발자 경험을 최우선으로 생각합니다: Next.js, TypeScript, ESLint, Prettier, Lefthook (Husky 대체), Lint-Staged, Vitest (Jest 대체), Testing Library, Playwright, Commitlint, VSCode, Tailwind CSS, [Clerk](https://clerk.com?utm_source=github&utm_medium=sponsorship&utm_campaign=nextjs-boilerplate)를 이용한 인증, DrizzleORM을 이용한 데이터베이스 (PostgreSQL, SQLite, MySQL), PGlite를 이용한 로컬 데이터베이스 및 Neon을 이용한 프로덕션 데이터베이스 (PostgreSQL), [Sentry](https://sentry.io/for/nextjs/?utm_source=github&utm_medium=paid-community&utm_campaign=general-fy25q1-nextjs&utm_content=github-banner-nextjsboilerplate-logo)를 이용한 에러 모니터링, LogTape (Pino.js 대체) 및 로그 관리를 이용한 로깅, Monitoring as Code, Storybook, 다국어 지원 (i18n), CodeRabbit을 이용한 AI 기반 코드 리뷰, [Arcjet](https://launch.arcjet.com/Q6eLbRE)을 이용한 보안 (봇 탐지, 속도 제한, 공격 방어 등) 등 다양한 기능을 제공합니다.

이 프로젝트를 복제하여 나만의 Next.js 프로젝트를 만들어 보세요. 작동하는 인증 시스템이 포함된 라이브 데모는 [Next.js Boilerplate](https://demo.nextjs-boilerplate.com)에서 확인할 수 있습니다.

## 스폰서

<table width="100%">
  <tr height="187px">
    <td align="center" width="33%">
      <a href="https://clerk.com?utm_source=github&utm_medium=sponsorship&utm_campaign=nextjs-boilerplate">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="https://github.com/ixartz/SaaS-Boilerplate/assets/1328388/6fb61971-3bf1-4580-98a0-10bd3f1040a2">
          <source media="(prefers-color-scheme: light)" srcset="https://github.com/ixartz/SaaS-Boilerplate/assets/1328388/f80a8bb5-66da-4772-ad36-5fabc5b02c60">
          <img alt="Clerk – Authentication & User Management for Next.js" src="https://github.com/ixartz/SaaS-Boilerplate/assets/1328388/f80a8bb5-66da-4772-ad36-5fabc5b02c60">
        </picture>
      </a>
    </td>
    <td align="center" width="33%">
      <a href="https://www.coderabbit.ai?utm_source=next_js_starter&utm_medium=github&utm_campaign=next_js_starter_oss_2025">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="public/assets/images/coderabbit-logo-dark.svg?raw=true">
          <source media="(prefers-color-scheme: light)" srcset="public/assets/images/coderabbit-logo-light.svg?raw=true">
          <img alt="CodeRabbit" src="public/assets/images/coderabbit-logo-light.svg?raw=true">
        </picture>
      </a>
    </td>
    <td align="center" width="33%">
      <a href="https://sentry.io/for/nextjs/?utm_source=github&utm_medium=paid-community&utm_campaign=general-fy25q1-nextjs&utm_content=github-banner-nextjsboilerplate-logo">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="public/assets/images/sentry-white.png?raw=true">
          <source media="(prefers-color-scheme: light)" srcset="public/assets/images/sentry-dark.png?raw=true">
          <img alt="Sentry" src="public/assets/images/sentry-dark.png?raw=true">
        </picture>
      </a>
      <a href="https://about.codecov.io/codecov-free-trial/?utm_source=github&utm_medium=paid-community&utm_campaign=general-fy25q1-nextjs&utm_content=github-banner-nextjsboilerplate-logo">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="public/assets/images/codecov-white.svg?raw=true">
          <source media="(prefers-color-scheme: light)" srcset="public/assets/images/codecov-dark.svg?raw=true">
          <img alt="Codecov" src="public/assets/images/codecov-dark.svg?raw=true">
        </picture>
      </a>
    </td>
  </tr>
  <tr height="187px">
    <td align="center" width="33%">
      <a href="https://launch.arcjet.com/Q6eLbRE">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="public/assets/images/arcjet-dark.svg?raw=true">
          <source media="(prefers-color-scheme: light)" srcset="public/assets/images/arcjet-light.svg?raw=true">
          <img alt="Arcjet" src="public/assets/images/arcjet-light.svg?raw=true">
        </picture>
      </a>
    </td>
    <td align="center" width="33%">
      <a href="https://sevalla.com/">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="public/assets/images/sevalla-dark.png">
          <source media="(prefers-color-scheme: light)" srcset="public/assets/images/sevalla-light.png">
          <img alt="Sevalla" src="public/assets/images/sevalla-light.png">
        </picture>
      </a>
    </td>
    <td align="center" width="33%">
      <a href="https://l.crowdin.com/next-js">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="public/assets/images/crowdin-white.png?raw=true">
          <source media="(prefers-color-scheme: light)" srcset="public/assets/images/crowdin-dark.png?raw=true">
          <img alt="Crowdin" src="public/assets/images/crowdin-dark.png?raw=true">
        </picture>
      </a>
    </td>
  </tr>
  <tr height="187px">
    <td align="center" width="33%">
      <a href="https://betterstack.com/?utm_source=github&utm_medium=sponsorship&utm_campaign=next-js-boilerplate">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="public/assets/images/better-stack-white.png?raw=true">
          <source media="(prefers-color-scheme: light)" srcset="public/assets/images/better-stack-dark.png?raw=true">
          <img alt="Better Stack" src="public/assets/images/better-stack-dark.png?raw=true">
        </picture>
      </a>
    </td>
    <td align="center" width="33%">
      <a href="https://posthog.com/?utm_source=github&utm_medium=sponsorship&utm_campaign=next-js-boilerplate">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="https://posthog.com/brand/posthog-logo-white.svg">
          <source media="(prefers-color-scheme: light)" srcset="https://posthog.com/brand/posthog-logo.svg">
          <img alt="PostHog" src="https://posthog.com/brand/posthog-logo.svg">
        </picture>
      </a>
    </td>
    <td align="center" width="33%">
      <a href="https://www.checklyhq.com/?utm_source=github&utm_medium=sponsorship&utm_campaign=next-js-boilerplate">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="public/assets/images/checkly-logo-dark.png?raw=true">
          <source media="(prefers-color-scheme: light)" srcset="public/assets/images/checkly-logo-light.png?raw=true">
          <img alt="Checkly" src="public/assets/images/checkly-logo-light.png?raw=true">
        </picture>
      </a>
    </td>
  </tr>
  <tr height="187px">
    <td align="center" style=width="33%">
      <a href="https://nextjs-boilerplate.com/pro-saas-starter-kit">
        <img src="public/assets/images/nextjs-boilerplate-saas.png?raw=true" alt="Next.js SaaS Boilerplate with React" />
      </a>
    </td>
    <td align="center" width="33%">
      <a href="mailto:contact@creativedesignsguru.com">
        Add your logo here
      </a>
    </td>
  </tr>
</table>

### 데모

**라이브 데모: [Next.js Boilerplate](https://demo.nextjs-boilerplate.com)**

| 회원가입 | 로그인 |
| --- | --- |
| [![Next.js Boilerplate SaaS Sign Up](public/assets/images/nextjs-boilerplate-sign-in.png)](https://demo.nextjs-boilerplate.com/sign-up) | [![Next.js Boilerplate SaaS Sign In](public/assets/images/nextjs-boilerplate-sign-in.png)](https://demo.nextjs-boilerplate.com/sign-in) |

### 기능

개발자 경험을 최우선으로 하며, 매우 유연한 코드 구조와 필요한 것만 유지할 수 있는 기능을 제공합니다:

- ⚡ App Router를 지원하는 [Next.js](https://nextjs.org)
- 🔥 [TypeScript](https://www.typescriptlang.org)를 이용한 타입 체크
- 💎 [Tailwind CSS](https://tailwindcss.com) 통합
- ✅ TypeScript 및 React 19를 위한 Strict Mode
- 🔒 [Clerk](https://clerk.com?utm_source=github&utm_medium=sponsorship&utm_campaign=nextjs-boilerplate)를 이용한 인증: 회원가입, 로그인, 로그아웃, 비밀번호 찾기, 비밀번호 재설정 등.
- 👤 매직 링크(Magic Links), 다중 요소 인증(MFA), 소셜 로그인(Google, Facebook, Twitter, GitHub, Apple 등), 패스키(Passkeys)를 이용한 비밀번호 없는 로그인, 사용자 가장(User Impersonation)
- 📦 PostgreSQL, SQLite, MySQL과 호환되는 DrizzleORM을 이용한 타입 안전한 ORM
- 💽 PGlite를 이용한 오프라인 및 로컬 개발 데이터베이스
- ☁️ Neon(PostgreSQL)을 이용한 원격 및 프로덕션 데이터베이스
- 🌐 next-intl 및 [Crowdin](https://l.crowdin.com/next-js)을 이용한 다국어 지원 (i18n)
- ♻️ T3 Env를 이용한 타입 안전한 환경 변수
- ⌨️ React Hook Form을 이용한 폼 처리
- 🔴 Zod를 이용한 유효성 검사 라이브러리
- 📏 [ESLint](https://eslint.org)를 이용한 린터 (기본 Next.js, Next.js Core Web Vitals, Tailwind CSS 및 Antfu 설정)
- 💖 Prettier를 이용한 코드 포맷터
- 🦊 Git Hooks를 위한 Husky (Lefthook으로 대체됨)
- 🚫 Git 스테이징된 파일에 린터를 실행하기 위한 Lint-staged
- 🚓 Commitlint를 이용한 Git 커밋 린트
- 📓 Commitizen을 이용한 표준 준수 커밋 메시지 작성
- 🔍 Knip을 이용한 사용하지 않는 파일 및 의존성 감지
- 🌍 i18n-check를 이용한 i18n 유효성 검사 및 누락된 번역 감지
- 🦺 Vitest 및 브라우저 모드를 이용한 단위 테스트 (React Testing Library 대체)
- 🧪 Playwright를 이용한 통합 및 E2E 테스트
- 👷 GitHub Actions를 이용한 풀 리퀘스트 시 테스트 실행
- 🎉 UI 개발을 위한 Storybook
- 🐰 [CodeRabbit](https://www.coderabbit.ai?utm_source=next_js_starter&utm_medium=github&utm_campaign=next_js_starter_oss_2025)을 이용한 AI 기반 코드 리뷰
- 🚨 [Sentry](https://sentry.io/for/nextjs/?utm_source=github&utm_medium=paid-community&utm_campaign=general-fy25q1-nextjs&utm_content=github-banner-nextjsboilerplate-logo)를 이용한 에러 모니터링
- 🔍 Sentry Spotlight를 이용한 로컬 개발 에러 모니터링
- ☂️ [Codecov](https://about.codecov.io/codecov-free-trial/?utm_source=github&utm_medium=paid-community&utm_campaign=general-fy25q1-nextjs&utm_content=github-banner-nextjsboilerplate-logo)를 이용한 코드 커버리지
- 📝 LogTape를 이용한 로깅 및 [Better Stack](https://betterstack.com/?utm_source=github&utm_medium=sponsorship&utm_campaign=next-js-boilerplate)을 이용한 로그 관리
- 🖥️ [Checkly](https://www.checklyhq.com/?utm_source=github&utm_medium=sponsorship&utm_campaign=next-js-boilerplate)를 이용한 Monitoring as Code
- 🔐 보안 및 봇 보호 ([Arcjet](https://launch.arcjet.com/Q6eLbRE))
- 📊 PostHog를 이용한 분석
- 🎁 Semantic Release를 이용한 자동 변경 로그 생성
- 🔍 시각적 회귀 테스트
- 💡 `@` 접두사를 사용한 절대 경로 import
- 🗂 VSCode 설정: 디버그, 설정, 태스크 및 확장 프로그램
- 🤖 SEO 메타데이터, JSON-LD 및 Open Graph 태그
- 🗺️ Sitemap.xml 및 robots.txt
- 👷 Dependabot을 이용한 자동 의존성 업데이트
- ⌘ Drizzle Studio를 이용한 데이터베이스 탐색 및 Drizzle Kit을 이용한 CLI 마이그레이션 도구
- ⚙️ 번들 분석기 (Bundler Analyzer)
- 🌈 무료 미니멀리스트 테마 포함
- 💯 Lighthouse 점수 최적화

Next.js 내장 기능:

- ☕ HTML & CSS 축소 (Minify)
- 💨 라이브 리로드 (Live reload)
- ✅ 캐시 버스팅 (Cache busting)

선택적 기능 (추가하기 쉬움):

- 🔑 멀티 테넌시 (Multi-tenancy), 역할 기반 접근 제어 (RBAC)
- 🔐 싱글 사인온 (SSO), 엔터프라이즈 SSO, SAML, OpenID Connect (OIDC), EASIE를 위한 OAuth
- 🔗 Web 3 (Base, MetaMask, Coinbase Wallet, OKX Wallet)

### 철학

- 어떤 것도 숨기지 않으므로 요구 사항과 선호도에 맞게 필요한 조정이 가능합니다.
- 의존성은 매월 정기적으로 업데이트됩니다.
- 초기 비용 없이 무료로 시작할 수 있습니다.
- 커스터마이징이 쉽습니다.
- 최소한의 코드.
- 스타일이 지정되지 않은 템플릿.
- SEO 친화적.
- 🚀 프로덕션 준비 완료.

### 요구 사항

- Node.js 22+ 및 npm

### 시작하기

로컬 환경에서 다음 명령어를 실행하세요:

```shell
git clone --depth=1 https://github.com/ixartz/Next-js-Boilerplate.git my-project-name
cd my-project-name
npm install
```

참고로, 모든 의존성은 매달 업데이트됩니다.

그 후, 다음을 실행하여 라이브 리로드가 포함된 개발 모드로 프로젝트를 로컬에서 실행할 수 있습니다:

```shell
npm run dev
```

브라우저에서 http://localhost:3000 을 열어 프로젝트를 확인하세요. 참고로, 프로젝트는 이미 데이터베이스가 사전 구성되어 있습니다.

> [!WARNING]
> Next.js Boilerplate는 로컬 환경을 위한 완전히 작동하는 Postgres 데이터베이스와 함께 제공됩니다. 이 데이터베이스는 **임시**이며 클레임(claim)하지 않으면 **72시간** 후에 만료됩니다.
>
> 만료되면 프로젝트가 데이터베이스에 연결할 수 없으며 연결 오류가 발생합니다.
>
> 연결 오류를 방지하고 데이터베이스를 **영구적**으로 만들려면 `npm run neon:claim`을 실행하세요. 클레임 후에는 데이터베이스가 영구적이 되며 프로덕션 사용에도 적합해집니다.

> [!CAUTION]
> 인증 시스템을 사용하려면 환경 변수를 설정해야 합니다. [인증 설정](#인증-설정) 섹션을 참조하세요.

고급 기능이 필요하신가요? 멀티 테넌시 & 팀, 역할 & 권한, Shadcn UI, oRPC를 이용한 End-to-End 타입 안전성, Stripe 결제, 라이트/다크 모드 등. [Next.js Boilerplate Pro](https://nextjs-boilerplate.com/pro-saas-starter-kit)를 사용해 보세요.

### 인증 설정

시작하려면 [Clerk.com](https://clerk.com?utm_source=github&utm_medium=sponsorship&utm_campaign=nextjs-boilerplate)에서 Clerk 계정을 만들고 Clerk 대시보드에서 새 애플리케이션을 생성해야 합니다. 완료되면 `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` 및 `CLERK_SECRET_KEY` 값을 복사하여 `.env.local` 파일(Git에 추적되지 않음)에 추가하세요:

```shell
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_pub_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

이제 회원가입, 로그인, 로그아웃, 비밀번호 찾기, 비밀번호 재설정, 프로필 업데이트, 비밀번호 업데이트, 이메일 업데이트, 계정 삭제 등의 기능을 포함한 완전한 기능의 인증 시스템을 Next.js에서 사용할 수 있습니다.

### 원격 데이터베이스 설정

이 프로젝트는 PostgreSQL, SQLite, MySQL 데이터베이스와 호환되는 타입 안전한 ORM인 DrizzleORM을 사용합니다. 기본적으로 프로젝트는 PostgreSQL과 원활하게 작동하도록 구성되어 있으며, 원하는 PostgreSQL 데이터베이스 제공업체를 유연하게 선택할 수 있습니다.

로컬에서 프로젝트를 처음 실행하면 임시 PostgreSQL 데이터베이스가 자동으로 생성됩니다. 이를 통해 Docker나 추가 설정 없이 PostgreSQL 데이터베이스로 작업할 수 있습니다.

이 임시 데이터베이스는 클레임하지 않으면 **72시간 후에 만료**됩니다. 연결 오류를 방지하고 **데이터베이스를 영구적으로 만들려면** 다음 명령어를 실행하세요:

```shell
npm run neon:claim
```

그런 다음 터미널에 제공된 지침에 따라 클레임 프로세스를 완료하세요.

클레임이 완료되면 데이터베이스는 프로덕션 사용에 적합해집니다. 개발, 스테이징 및 프로덕션 환경을 위한 별도의 데이터베이스 브랜치를 생성하여 데이터를 격리할 수 있습니다.

#### 새롭고 빈 데이터베이스 생성

새롭고 빈 데이터베이스를 생성하려면 `.env.local` 파일에서 `DATABASE_URL`, `DATABASE_URL_DIRECT`, `PUBLIC_INSTAGRES_CLAIM_URL` 환경 변수를 제거하기만 하면 됩니다.

그런 다음 다음 명령어를 실행하여 새로운 임시 데이터베이스를 생성하세요:

```shell
npm run dev
```

데이터베이스가 생성되면 연결 문자열이 자동으로 `.env.local` 파일에 추가됩니다. 그리고 `npm run neon:claim`으로 데이터베이스를 클레임하는 것을 잊지 마세요.

### 번역 (i18n) 설정

번역을 위해 이 프로젝트는 `next-intl`과 [Crowdin](https://l.crowdin.com/next-js)을 결합하여 사용합니다. 개발자는 영어(또는 다른 기본 언어) 버전만 관리하면 됩니다. 다른 언어에 대한 번역은 Crowdin에 의해 자동으로 생성되고 처리됩니다. Crowdin을 사용하여 번역 팀과 협업하거나 기계 번역의 도움을 받아 직접 메시지를 번역할 수 있습니다.

번역(i18n)을 설정하려면 [Crowdin.com](https://l.crowdin.com/next-js)에서 계정을 만들고 새 프로젝트를 생성하세요. 새로 생성된 프로젝트에서 프로젝트 ID를 찾을 수 있습니다. 또한 계정 설정 > API로 이동하여 새 개인 액세스 토큰(Personal Access Token)을 생성해야 합니다. 그런 다음 GitHub Actions에서 `CROWDIN_PROJECT_ID` 및 `CROWDIN_PERSONAL_TOKEN` 환경 변수를 정의해야 합니다.

GitHub Actions에서 환경 변수를 정의한 후에는 `main` 브랜치에 새 커밋을 푸시할 때마다 로컬라이제이션 파일이 Crowdin과 동기화됩니다.

### 프로젝트 구조

```shell
.
├── README.md                       # README 파일
├── .github                         # GitHub 폴더
│   ├── actions                     # 재사용 가능한 액션
│   └── workflows                   # GitHub Actions 워크플로우
├── .storybook                      # Storybook 폴더
├── .vscode                         # VSCode 설정
├── migrations                      # 데이터베이스 마이그레이션
├── public                          # 공용 자산(assets) 폴더
├── src
│   ├── app                         # Next JS 앱 (App Router)
│   ├── components                  # React 컴포넌트
│   ├── libs                        # 서드파티 라이브러리 설정
│   ├── locales                     # 로케일 폴더 (i18n 메시지)
│   ├── models                      # 데이터베이스 모델
│   ├── styles                      # 스타일 폴더
│   ├── templates                   # 템플릿 폴더
│   ├── types                       # 타입 정의
│   ├── utils                       # 유틸리티 폴더
│   └── validations                 # 유효성 검사 스키마
├── tests
│   ├── e2e                         # E2E 테스트, Monitoring as Code 포함
│   └── integration                 # 통합 테스트
├── next.config.ts                  # Next JS 설정
└── tsconfig.json                   # TypeScript 설정
```

### 사용자 정의 (Customization)

전체 프로젝트에서 `FIXME:`를 검색하여 Next js Boilerplate를 쉽게 구성하고 빠르게 사용자 정의할 수 있습니다. 다음은 사용자 정의해야 할 가장 중요한 파일들입니다:

- `public/apple-touch-icon.png`, `public/favicon.ico`, `public/favicon-16x16.png` 및 `public/favicon-32x32.png`: 웹사이트 파비콘
- `src/utils/AppConfig.ts`: 설정 파일
- `src/templates/BaseTemplate.tsx`: 기본 테마
- `next.config.ts`: Next.js 설정
- `.env`: 기본 환경 변수

추가 사용자 정의를 위해 소스 코드에 대한 전체 액세스 권한이 있습니다. 제공된 코드는 프로젝트 시작을 돕기 위한 예시일 뿐입니다. 가능성은 무한합니다 🚀.

### 데이터베이스 스키마 변경

프로젝트에서 데이터베이스 스키마를 수정하려면 `./src/models/Schema.ts`에 위치한 스키마 파일을 업데이트할 수 있습니다. 이 파일은 Drizzle ORM 라이브러리를 사용하여 데이터베이스 테이블의 구조를 정의합니다.

스키마를 변경한 후 다음 명령어를 실행하여 마이그레이션을 생성하세요:

```shell
npm run db:generate
```

이 명령은 스키마 변경 사항을 반영하는 마이그레이션 파일을 생성합니다.

데이터베이스가 실행 중인지 확인한 후 다음을 사용하여 생성된 마이그레이션을 적용할 수 있습니다:

```shell
npm run db:migrate
```

변경 사항을 적용하기 위해 Next.js 서버를 다시 시작할 필요는 없습니다.

### 커밋 메시지 형식

이 프로젝트는 [Conventional Commits](https://www.conventionalcommits.org/) 사양을 따르므로 모든 커밋 메시지는 그에 따라 형식을 갖춰야 합니다. 커밋 메시지 작성을 돕기 위해 프로젝트는 커밋 프로세스를 안내하는 대화형 CLI를 제공합니다. 사용하려면 다음 명령어를 실행하세요:

```shell
npm run commit
```

Conventional Commits를 사용하는 이점 중 하나는 GitHub 릴리스를 자동으로 생성할 수 있다는 것입니다. 또한 릴리스에 포함된 커밋 유형에 따라 다음 버전 번호를 자동으로 결정할 수 있습니다.

### CodeRabbit AI 코드 리뷰

이 프로젝트는 AI 기반 코드 리뷰어인 [CodeRabbit](https://www.coderabbit.ai?utm_source=next_js_starter&utm_medium=github&utm_campaign=next_js_starter_oss_2025)을 사용합니다. CodeRabbit은 저장소를 모니터링하고 강력한 AI 엔진을 사용하여 모든 새로운 풀 리퀘스트에 대해 지능적인 코드 리뷰를 자동으로 제공합니다.

CodeRabbit 설정은 간단합니다. [coderabbit.ai](https://www.coderabbit.ai?utm_source=next_js_starter&utm_medium=github&utm_campaign=next_js_starter_oss_2025)를 방문하여 GitHub 계정으로 로그인하고 대시보드에서 저장소를 추가하세요. 그게 다입니다!

### 테스트

모든 단위 테스트는 소스 코드와 같은 디렉토리에 위치하여 찾기 쉽습니다. 단위 테스트 파일은 `*.test.ts` 또는 `*.test.tsx` 형식을 따릅니다. 이 프로젝트는 단위 테스트를 위해 Vitest와 React Testing Library를 사용합니다. 다음 명령어로 테스트를 실행할 수 있습니다:

```shell
npm run test
```

### 통합 및 E2E 테스트

이 프로젝트는 통합 및 엔드투엔드(E2E) 테스트를 위해 Playwright를 사용합니다. 통합 테스트 파일은 `*.spec.ts` 확장자를 사용하고, E2E 테스트 파일은 `*.e2e.ts` 확장자를 사용합니다. 다음 명령어로 테스트를 실행할 수 있습니다:

```shell
npx playwright install # 새 환경에서 처음 실행할 때만 필요
npm run test:e2e
```

### 스토리북 (Storybook)

Storybook은 UI 컴포넌트 개발 및 테스트를 위해 구성되어 있습니다. 이 프로젝트는 접근성 테스트 및 문서화 기능을 포함하여 Next.js 및 Vite 통합과 함께 Storybook을 사용합니다.

스토리는 `src` 디렉토리의 컴포넌트 옆에 위치하며 `*.stories.ts` 또는 `*.stories.tsx` 패턴을 따릅니다.

다음 명령어로 개발 모드에서 Storybook을 실행할 수 있습니다:

```shell
npm run storybook
```

이렇게 하면 http://localhost:6006 에서 Storybook이 시작되어 UI 컴포넌트를 격리된 상태에서 보고 상호 작용할 수 있습니다.

헤드리스 모드에서 Storybook 테스트를 실행하려면 다음 명령어를 사용할 수 있습니다:

```shell
npm run storybook:test
```

### 로컬 프로덕션 빌드

임시 인메모리 Postgres 데이터베이스를 사용하여 로컬에서 최적화된 프로덕션 빌드를 생성합니다:

```shell
npm run build-local
```

이 명령어는 다음을 수행합니다:

- 임시 인메모리 데이터베이스 서버 시작
- Drizzle Kit으로 데이터베이스 마이그레이션 실행
- 프로덕션용 Next.js 앱 빌드
- 빌드가 완료되면 임시 DB 종료

참고:

- 기본적으로 로컬 데이터베이스를 사용하지만 `npm run build`를 사용하여 원격 데이터베이스를 사용할 수도 있습니다.
- 이 명령어는 빌드만 생성하며 서버를 시작하지는 않습니다. 로컬에서 빌드를 실행하려면 `npm run start`를 사용하세요.

### 프로덕션 배포

빌드 프로세스 중에 데이터베이스 마이그레이션이 자동으로 실행되므로 수동으로 실행할 필요가 없습니다. 하지만 환경 변수에 `DATABASE_URL`을 정의해야 합니다.

그런 다음 다음 명령어로 프로덕션 빌드를 생성할 수 있습니다:

```shell
$ npm run build
```

이 명령어는 보일러플레이트의 최적화된 프로덕션 빌드를 생성합니다. 생성된 빌드를 테스트하려면 다음을 실행하세요:

```shell
$ npm run start
```

또한 자신의 키를 사용하여 `CLERK_SECRET_KEY` 환경 변수를 정의해야 합니다.

이 명령어는 프로덕션 빌드를 사용하여 로컬 서버를 시작합니다. 이제 선호하는 브라우저에서 http://localhost:3000 을 열어 결과를 확인할 수 있습니다.

### Sevalla에 배포

단일 플랫폼에서 데이터베이스와 함께 Next.js 애플리케이션을 배포할 수 있습니다. 먼저 [Sevalla](https://sevalla.com)에서 계정을 만드세요.

등록 후 대시보드로 리디렉션됩니다. 거기서 `Database > Create a database`로 이동하세요. PostgreSQL을 선택하고 빠른 설정을 위해 기본 설정을 사용하세요. 고급 사용자는 데이터베이스 위치와 리소스 크기를 사용자 정의할 수 있습니다. 마지막으로 `Create`를 클릭하여 프로세스를 완료하세요.

데이터베이스가 생성되어 준비되면 대시보드로 돌아가 `Application > Create an App`을 클릭하세요. GitHub 계정을 연결한 후 배포할 저장소를 선택하세요. 나머지 옵션은 기본 설정으로 유지한 다음 `Create`를 클릭하세요.

다음으로, `Networking > Connected services > Add connection`으로 이동하여 방금 생성한 데이터베이스를 선택하여 데이터베이스를 애플리케이션에 연결하세요. 또한 `Add environment variables to the application` 옵션을 활성화하고 `DB_URL`을 `DATABASE_URL`로 이름을 변경해야 합니다. 그런 다음 `Add connection`을 클릭하세요.

`Environment variables > Add environment variable`로 이동하여 Clerk 계정의 `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` 및 `CLERK_SECRET_KEY` 환경 변수를 정의하세요. `Save`를 클릭하세요.

마지막으로 `Overview > Latest deployments > Deploy now`를 클릭하여 새 배포를 시작하세요. 모든 것이 올바르게 설정되었다면 애플리케이션이 작동하는 데이터베이스와 함께 성공적으로 배포될 것입니다.

### 에러 모니터링

이 프로젝트는 에러 모니터링을 위해 [Sentry](https://sentry.io/for/nextjs/?utm_source=github&utm_medium=paid-community&utm_campaign=general-fy25q1-nextjs&utm_content=github-banner-nextjsboilerplate-logo)를 사용합니다.

#### Sentry 및 Spotlight를 이용한 로컬 개발

개발 환경에서는 추가 설정이 필요하지 않습니다: Next.js Boilerplate에는 Sentry와 Spotlight (개발용 Sentry)가 사전 구성되어 있습니다. 모든 에러는 로컬 Spotlight 인스턴스에 자동으로 캡처되어 Sentry Cloud로 데이터를 보내지 않고도 테스트할 수 있습니다.

`http://localhost:8969`의 Spotlight UI에서 캡처된 이벤트를 검사하고, 스택 트레이스를 보고, 에러를 분석할 수 있습니다.

#### Sentry를 이용한 프로덕션 설정

프로덕션 환경의 경우 Sentry 계정과 새 프로젝트를 만들어야 합니다. 그런 다음 `.env.production`에서 다음 환경 변수를 업데이트해야 합니다:

```shell
NEXT_PUBLIC_SENTRY_DSN=
SENTRY_ORGANIZATION=
SENTRY_PROJECT=
```

또한 호스팅 제공업체의 대시보드에서 `SENTRY_AUTH_TOKEN` 환경 변수를 생성해야 합니다.

### 코드 커버리지

Next.js Boilerplate는 코드 커버리지 보고 솔루션으로 [Codecov](https://about.codecov.io/codecov-free-trial/?utm_source=github&utm_medium=paid-community&utm_campaign=general-fy25q1-nextjs&utm_content=github-banner-nextjsboilerplate-logo)를 사용합니다. Codecov를 활성화하려면 Codecov 계정을 만들고 GitHub 계정에 연결하세요. 저장소가 Codecov 대시보드에 나타나야 합니다. 원하는 저장소를 선택하고 토큰을 복사하세요. GitHub Actions에서 `CODECOV_TOKEN` 환경 변수를 정의하고 토큰을 붙여넣으세요.

`CODECOV_TOKEN`을 GitHub Actions 비밀(secret)로 생성하고 소스 코드에 직접 붙여넣지 마세요.

### 로깅

이 프로젝트는 로깅을 위해 LogTape를 사용합니다. 개발 환경에서는 기본적으로 콘솔에 로그가 표시됩니다.

프로덕션의 경우, SQL을 사용하여 로그를 관리하고 쿼리하기 위해 [Better Stack](https://betterstack.com/?utm_source=github&utm_medium=sponsorship&utm_campaign=next-js-boilerplate)과 이미 통합되어 있습니다. Better Stack을 사용하려면 [Better Stack](https://betterstack.com/?utm_source=github&utm_medium=sponsorship&utm_campaign=next-js-boilerplate) 계정을 만들고 새 소스를 생성해야 합니다: Better Stack Logs Dashboard > Sources > Connect source로 이동하세요. 그런 다음 소스에 이름을 지정하고 플랫폼으로 Node.js를 선택하세요.

소스를 생성한 후 소스 토큰을 보고 복사할 수 있습니다. 환경 변수에서 토큰을 `NEXT_PUBLIC_BETTER_STACK_SOURCE_TOKEN` 변수에 붙여넣으세요. 또한 소스 토큰과 같은 위치에서 찾을 수 있는 `NEXT_PUBLIC_BETTER_STACK_INGESTING_HOST` 변수도 정의해야 합니다.

이제 모든 로그가 자동으로 Better Stack으로 전송되고 수집됩니다.

### Checkly 모니터링

이 프로젝트는 프로덕션 환경이 항상 실행 중인지 확인하기 위해 [Checkly](https://www.checklyhq.com/?utm_source=github&utm_medium=sponsorship&utm_campaign=next-js-boilerplate)를 사용합니다. 정기적인 간격으로 Checkly는 `*.check.e2e.ts` 확장자로 끝나는 테스트를 실행하고 테스트가 실패하면 알림을 보냅니다. 또한 여러 위치에서 테스트를 실행하여 애플리케이션이 전 세계적으로 사용 가능한지 확인할 수 있는 유연성을 제공합니다.

Checkly를 사용하려면 먼저 [웹사이트](https://www.checklyhq.com/?utm_source=github&utm_medium=sponsorship&utm_campaign=next-js-boilerplate)에서 계정을 만들어야 합니다. 계정을 만든 후 Checkly 대시보드에서 새 API 키를 생성하고 GitHub Actions에서 `CHECKLY_API_KEY` 환경 변수를 설정하세요. 또한 User Settings > General의 Checkly 대시보드에서 찾을 수 있는 `CHECKLY_ACCOUNT_ID`를 정의해야 합니다.

설정을 완료하려면 `checkly.config.ts` 파일을 자신의 이메일 주소와 프로덕션 URL로 업데이트하세요.

### Arcjet 보안 및 봇 보호

이 프로젝트는 사이트에 대한 심층 방어를 제공하기 위해 개별적으로 또는 결합하여 사용할 수 있는 여러 기능을 포함하는 Security as Code 제품인 [Arcjet](https://launch.arcjet.com/Q6eLbRE)을 사용합니다.

Arcjet을 설정하려면 [무료 계정을 생성](https://launch.arcjet.com/Q6eLbRE)하고 API 키를 받으세요. 그런 다음 `ARCJET_KEY` 환경 변수에 추가하세요.

Arcjet은 두 가지 주요 기능인 봇 탐지와 Arcjet Shield WAF로 구성되어 있습니다:

- [봇 탐지](https://docs.arcjet.com/bot-protection/concepts)는 검색 엔진, Slack 및 Twitter 미리보기와 같은 미리보기 링크 생성기, 일반적인 가동 시간 모니터링 서비스를 허용하도록 구성되어 있습니다. 스크래퍼 및 AI 크롤러와 같은 다른 모든 봇은 차단됩니다. 허용하거나 차단할 [추가 봇 유형을 구성](https://docs.arcjet.com/bot-protection/identifying-bots)할 수 있습니다.
- [Arcjet Shield WAF](https://docs.arcjet.com/shield/concepts)는 SQL 인젝션, 크로스 사이트 스크립팅 및 기타 OWASP Top 10 취약점과 같은 일반적인 공격을 탐지하고 차단합니다.

Arcjet은 Shield WAF 규칙을 포함하는 `src/libs/Arcjet.ts`의 중앙 클라이언트와 함께 구성됩니다. `proxy.ts`에서 Arcjet이 호출될 때 추가 규칙이 적용됩니다.

### 유용한 명령어

### 코드 품질 및 유효성 검사

이 프로젝트에는 코드 품질과 일관성을 보장하기 위한 여러 명령어가 포함되어 있습니다. 다음을 실행할 수 있습니다:

- `npm run lint`: 린팅 오류 확인
- `npm run lint:fix`: 린터에서 수정 가능한 문제를 자동으로 수정
- `npm run check:types`: 전체 프로젝트에서 타입 안전성 확인
- `npm run check:deps`: 사용하지 않는 의존성 및 파일 식별 도움
- `npm run check:i18n`: 모든 번역이 완료되고 올바른 형식인지 확인

#### 번역 분석기 (Bundle Analyzer)

Next.js Boilerplate에는 내장 번역 분석기가 포함되어 있습니다. JavaScript 번들의 크기를 분석하는 데 사용할 수 있습니다. 시작하려면 다음 명령어를 실행하세요:

```shell
npm run build-stats
```

명령어를 실행하면 결과와 함께 새 브라우저 창이 자동으로 열립니다.

#### 데이터베이스 스튜디오

이 프로젝트는 데이터베이스를 탐색하기 위해 Drizzle Studio로 이미 구성되어 있습니다. 다음 명령어를 실행하여 데이터베이스 스튜디오를 열 수 있습니다:

```shell
npm run db:studio
```

그런 다음 선호하는 브라우저에서 https://local.drizzle.studio 를 열어 데이터베이스를 탐색할 수 있습니다.

### VSCode 정보 (선택 사항)

VSCode 사용자인 경우 `.vscode/extension.json`에 제안된 확장 프로그램을 설치하여 VSCode와 더 잘 통합할 수 있습니다. 스타터 코드에는 VSCode와의 원활한 통합을 위한 설정이 함께 제공됩니다. 프론트엔드 및 백엔드 디버깅 경험을 위한 디버그 구성도 제공됩니다.

VSCode에 플러그인을 설치하면 ESLint와 Prettier가 코드를 자동으로 수정하고 오류를 표시할 수 있습니다. 테스트에도 동일하게 적용됩니다: VSCode Vitest 확장 프로그램을 설치하여 테스트를 자동으로 실행할 수 있으며, 문맥에 맞는 코드 커버리지도 보여줍니다.

프로 팁: TypeScript로 프로젝트 전체 타입 확인이 필요한 경우 Mac에서 <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>B</kbd>로 빌드를 실행할 수 있습니다.

### 기여

누구나 이 프로젝트에 기여할 수 있습니다. 질문이 있거나 버그를 발견하면 언제든지 이슈를 열어주세요. 제안과 개선 사항은 언제나 환영합니다.

### 라이선스

MIT 라이선스에 따라 라이선스가 부여됩니다, Copyright © 2025

자세한 내용은 [LICENSE](LICENSE)를 참조하세요.

## 스폰서

<table width="100%">
  <tr height="187px">
    <td align="center" width="33%">
      <a href="https://clerk.com?utm_source=github&utm_medium=sponsorship&utm_campaign=nextjs-boilerplate">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="https://github.com/ixartz/SaaS-Boilerplate/assets/1328388/6fb61971-3bf1-4580-98a0-10bd3f1040a2">
          <source media="(prefers-color-scheme: light)" srcset="https://github.com/ixartz/SaaS-Boilerplate/assets/1328388/f80a8bb5-66da-4772-ad36-5fabc5b02c60">
          <img alt="Clerk – Authentication & User Management for Next.js" src="https://github.com/ixartz/SaaS-Boilerplate/assets/1328388/f80a8bb5-66da-4772-ad36-5fabc5b02c60">
        </picture>
      </a>
    </td>
    <td align="center" width="33%">
      <a href="https://www.coderabbit.ai?utm_source=next_js_starter&utm_medium=github&utm_campaign=next_js_starter_oss_2025">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="public/assets/images/coderabbit-logo-dark.svg?raw=true">
          <source media="(prefers-color-scheme: light)" srcset="public/assets/images/coderabbit-logo-light.svg?raw=true">
          <img alt="CodeRabbit" src="public/assets/images/coderabbit-logo-light.svg?raw=true">
        </picture>
      </a>
    </td>
    <td align="center" width="33%">
      <a href="https://sentry.io/for/nextjs/?utm_source=github&utm_medium=paid-community&utm_campaign=general-fy25q1-nextjs&utm_content=github-banner-nextjsboilerplate-logo">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="public/assets/images/sentry-white.png?raw=true">
          <source media="(prefers-color-scheme: light)" srcset="public/assets/images/sentry-dark.png?raw=true">
          <img alt="Sentry" src="public/assets/images/sentry-dark.png?raw=true">
        </picture>
      </a>
      <a href="https://about.codecov.io/codecov-free-trial/?utm_source=github&utm_medium=paid-community&utm_campaign=general-fy25q1-nextjs&utm_content=github-banner-nextjsboilerplate-logo">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="public/assets/images/codecov-white.svg?raw=true">
          <source media="(prefers-color-scheme: light)" srcset="public/assets/images/codecov-dark.svg?raw=true">
          <img alt="Codecov" src="public/assets/images/codecov-dark.svg?raw=true">
        </picture>
      </a>
    </td>
  </tr>
  <tr height="187px">
    <td align="center" width="33%">
      <a href="https://launch.arcjet.com/Q6eLbRE">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="public/assets/images/arcjet-dark.svg?raw=true">
          <source media="(prefers-color-scheme: light)" srcset="public/assets/images/arcjet-light.svg?raw=true">
          <img alt="Arcjet" src="public/assets/images/arcjet-light.svg?raw=true">
        </picture>
      </a>
    </td>
    <td align="center" width="33%">
      <a href="https://sevalla.com/">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="public/assets/images/sevalla-dark.png">
          <source media="(prefers-color-scheme: light)" srcset="public/assets/images/sevalla-light.png">
          <img alt="Sevalla" src="public/assets/images/sevalla-light.png">
        </picture>
      </a>
    </td>
    <td align="center" width="33%">
      <a href="https://l.crowdin.com/next-js">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="public/assets/images/crowdin-white.png?raw=true">
          <source media="(prefers-color-scheme: light)" srcset="public/assets/images/crowdin-dark.png?raw=true">
          <img alt="Crowdin" src="public/assets/images/crowdin-dark.png?raw=true">
        </picture>
      </a>
    </td>
  </tr>
  <tr height="187px">
    <td align="center" width="33%">
      <a href="https://betterstack.com/?utm_source=github&utm_medium=sponsorship&utm_campaign=next-js-boilerplate">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="public/assets/images/better-stack-white.png?raw=true">
          <source media="(prefers-color-scheme: light)" srcset="public/assets/images/better-stack-dark.png?raw=true">
          <img alt="Better Stack" src="public/assets/images/better-stack-dark.png?raw=true">
        </picture>
      </a>
    </td>
    <td align="center" width="33%">
      <a href="https://posthog.com/?utm_source=github&utm_medium=sponsorship&utm_campaign=next-js-boilerplate">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="https://posthog.com/brand/posthog-logo-white.svg">
          <source media="(prefers-color-scheme: light)" srcset="https://posthog.com/brand/posthog-logo.svg">
          <img alt="PostHog" src="https://posthog.com/brand/posthog-logo.svg">
        </picture>
      </a>
    </td>
    <td align="center" width="33%">
      <a href="https://www.checklyhq.com/?utm_source=github&utm_medium=sponsorship&utm_campaign=next-js-boilerplate">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="public/assets/images/checkly-logo-dark.png?raw=true">
          <source media="(prefers-color-scheme: light)" srcset="public/assets/images/checkly-logo-light.png?raw=true">
          <img alt="Checkly" src="public/assets/images/checkly-logo-light.png?raw=true">
        </picture>
      </a>
    </td>
  </tr>
  <tr height="187px">
    <td align="center" style=width="33%">
      <a href="https://nextjs-boilerplate.com/pro-saas-starter-kit">
        <img src="public/assets/images/nextjs-boilerplate-saas.png?raw=true" alt="Next.js SaaS Boilerplate with React" />
      </a>
    </td>
    <td align="center" width="33%">
      <a href="mailto:contact@creativedesignsguru.com">
        Add your logo here
      </a>
    </td>
  </tr>
</table>

---

Made with ♥ by [CreativeDesignsGuru](https://creativedesignsguru.com) [![Twitter](https://img.shields.io/twitter/url/https/twitter.com/cloudposse.svg?style=social&label=Follow%20%40Ixartz)](https://twitter.com/ixartz)

Looking for a custom boilerplate to kick off your project? I'd be glad to discuss how I can help you build one. Feel free to reach out anytime at contact@creativedesignsguru.com!

[![Sponsor Next JS Boilerplate](https://cdn.buymeacoffee.com/buttons/default-red.png)](https://github.com/sponsors/ixartz)
