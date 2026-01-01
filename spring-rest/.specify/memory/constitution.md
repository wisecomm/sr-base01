<!--
Sync Impact Report - Constitution Update
═══════════════════════════════════════════════════════════════

VERSION CHANGE: 초기 템플릿 → 1.0.0

변경 사항:
  ✓ 새 프로젝트 헌장 초안 작성 (Spring Boot REST API)
  ✓ 7개 핵심 원칙 정의
  ✓ 기술 스택 및 개발 워크플로우 명시
  ✓ 거버넌스 규칙 수립

수정된 원칙:
  - [신규] I. API 우선 설계
  - [신규] II. 계층형 아키텍처
  - [신규] III. 테스트 우선 개발 (필수)
  - [신규] IV. 통합 테스트
  - [신규] V. 관찰 가능성
  - [신규] VI. API 버전 관리
  - [신규] VII. 단순성

추가된 섹션:
  - 기술 스택 제약사항
  - 개발 워크플로우

템플릿 업데이트 상태:
  ✅ .specify/memory/constitution.md (본 파일)
  ✅ .specify/templates/plan-template.md (Constitution Check, Technical Context, Project Structure 업데이트)
  ✅ .specify/templates/spec-template.md (변경 불필요 - 기술 중립적)
  ✅ .specify/templates/tasks-template.md (Phase 1-3 Spring Boot 예제로 업데이트)

후속 작업:
  - 템플릿 파일들의 Constitution Check 섹션을 새 원칙에 맞게 업데이트
  - 프로젝트 README 작성 시 헌장 참조

권장 커밋 메시지:
  docs: 헌장 v1.0.0 초안 작성 (Spring Boot REST API 프로젝트 기본 원칙 수립)

═══════════════════════════════════════════════════════════════
-->

# Spring REST API Constitution

## 핵심 원칙

### I. API 우선 설계

모든 기능은 RESTful API로 먼저 설계되어야 합니다:

- **필수 사항**:
  - OpenAPI 3.0 (Swagger) 스펙을 통한 API 문서화
  - 리소스 중심 URL 설계 (명사 사용, 동사 지양)
  - 적절한 HTTP 메서드 사용 (GET, POST, PUT, DELETE, PATCH)
  - 표준 HTTP 상태 코드 반환
  - JSON 기반 요청/응답 (Content-Type: application/json)

- **근거**: API 우선 접근은 프론트엔드-백엔드 분리, 명확한 계약 정의, 자동화된 문서화를 
  가능하게 하며, 향후 다양한 클라이언트(웹, 모바일, 서드파티)의 통합을 용이하게 합니다.

### II. 계층형 아키텍처

코드는 명확히 분리된 계층 구조를 따라야 합니다:

- **필수 계층**:
  - **Controller**: HTTP 요청/응답 처리, 입력 검증
  - **Service**: 비즈니스 로직, 트랜잭션 관리
  - **Repository (DAO)**: 데이터 접근 (MyBatis 매퍼)
  - **Model/Entity**: 도메인 객체 및 DTO

- **규칙**:
  - Controller는 Service만 호출 (Repository 직접 호출 금지)
  - Service는 여러 Repository를 조율 가능
  - 각 계층은 하위 계층만 의존 (상위 계층 의존 금지)
  - 계층 간 데이터 전달 시 DTO 사용 권장

- **근거**: 계층 분리는 관심사의 분리, 테스트 용이성, 유지보수성을 향상시키며,
  각 계층의 책임이 명확해져 코드 이해와 변경이 쉬워집니다.

### III. 테스트 우선 개발 (필수)

TDD(Test-Driven Development) 방식이 강제됩니다:

- **프로세스**:
  1. 테스트 케이스 작성
  2. 사용자 승인 (테스트 시나리오 검증)
  3. 테스트 실행 확인 (Red - 실패)
  4. 구현 (Green - 성공)
  5. 리팩토링 (코드 개선)

- **테스트 작성 기준**:
  - 단위 테스트: JUnit 5 사용, 각 Service 메서드별 테스트
  - 모킹: Mockito 사용하여 의존성 격리
  - 테스트 커버리지: 최소 80% 이상 유지

- **근거**: 테스트 우선 접근은 버그를 조기에 발견하고, 리팩토링 안정성을 보장하며,
  테스트 자체가 실행 가능한 문서 역할을 합니다. 비협상 사항입니다.

### IV. 통합 테스트

다음 영역에서는 통합 테스트가 필수입니다:

- **대상**:
  - 새로운 API 엔드포인트 (Controller → Service → Repository → DB)
  - 데이터베이스 트랜잭션 검증
  - API 계약 변경 (요청/응답 스키마 변경)
  - 외부 시스템 연동 (서드파티 API 호출)

- **도구**:
  - Spring Boot Test (@SpringBootTest)
  - TestContainers (PostgreSQL 컨테이너)
  - REST Assured 또는 MockMvc

- **근거**: 단위 테스트만으로는 계층 간 통합, DB 쿼리, 트랜잭션 동작을 검증할 수 없으며,
  통합 테스트는 실제 운영 환경과 유사한 조건에서 전체 흐름을 검증합니다.

### V. 관찰 가능성

시스템의 모든 동작은 추적 가능하고 디버깅 가능해야 합니다:

- **로깅 (Log4j2)**:
  - 구조화된 로깅 (JSON 형식 권장)
  - 로그 레벨 적절히 사용 (ERROR, WARN, INFO, DEBUG, TRACE)
  - 요청 ID를 통한 분산 추적 (MDC 사용)
  - 민감 정보 로깅 금지 (패스워드, 토큰 등 마스킹)

- **API 문서화**:
  - Swagger UI를 통한 실시간 API 탐색
  - 모든 엔드포인트에 명확한 설명, 파라미터, 응답 예제 포함

- **에러 핸들링**:
  - 전역 예외 처리기 (@ControllerAdvice)
  - 일관된 에러 응답 형식 (status, message, timestamp, path)
  - 스택 트레이스는 개발 환경에서만 노출

- **근거**: 프로덕션 환경에서 발생하는 문제를 신속히 파악하고 해결하려면 충분한 로그와
  문서가 필요하며, 이는 운영 비용을 크게 절감합니다.

### VI. API 버전 관리

API 변경은 하위 호환성을 고려하여 관리되어야 합니다:

- **버전 정책**:
  - URI 버저닝 사용 (예: `/api/v1/users`, `/api/v2/users`)
  - 버전 형식: MAJOR.MINOR.PATCH (Semantic Versioning)
    - MAJOR: 하위 호환 불가 변경 (기존 API 삭제, 응답 구조 변경)
    - MINOR: 하위 호환 가능 기능 추가 (새 필드, 새 엔드포인트)
    - PATCH: 버그 수정, 성능 개선

- **변경 관리**:
  - Breaking Change 발생 시 최소 1개 버전 이상 병행 운영
  - Deprecation 정책: 최소 3개월 전 공지, Swagger에 명시
  - 변경 이력은 CHANGELOG.md에 문서화

- **근거**: 외부 클라이언트가 예기치 않게 중단되는 것을 방지하고, 점진적 마이그레이션을
  허용하여 안정적인 서비스 운영을 보장합니다.

### VII. 단순성

복잡성보다 단순함을 우선시합니다:

- **원칙**:
  - YAGNI (You Aren't Gonna Need It): 현재 필요하지 않은 기능 구현 지양
  - KISS (Keep It Simple, Stupid): 가장 단순한 해결책 선택
  - 조기 최적화 금지: 성능 문제가 측정되기 전까지 가독성 우선

- **코드 작성**:
  - 명확한 이름 사용 (축약 지양)
  - 한 메서드는 한 가지 일만 수행
  - 중첩 깊이 최소화 (if 문 3단계 이하 권장)
  - 매직 넘버/문자열 금지 (상수 또는 Enum 사용)

- **근거**: 단순한 코드는 버그가 적고, 이해하기 쉬우며, 변경이 용이합니다.
  복잡한 코드는 정당한 사유가 있을 때만 허용되며 문서화되어야 합니다.

## 기술 스택 제약사항

이 프로젝트는 다음 기술 스택을 기준으로 구성됩니다:

### 필수 기술

- **빌드 도구**: Gradle 8.x 이상
- **Java 버전**: JDK 21 (LTS)
- **프레임워크**: Spring Boot 3.4.1
  - Spring Web (REST API)
  - Spring Boot Actuator (헬스 체크, 메트릭)
- **데이터베이스**: PostgreSQL 15.x 이상
- **ORM/SQL 매퍼**: MyBatis 3.x (XML 매퍼 또는 애노테이션 방식)
- **유틸리티**: Lombok (보일러플레이트 코드 제거)
- **API 문서화**: SpringDoc OpenAPI (Swagger UI)
- **로깅**: Log4j2 (비동기 로깅 설정 권장)

### 제약 사항

- **JPA/Hibernate 사용 금지**: 이 프로젝트는 MyBatis를 SQL 매퍼로 사용합니다.
- **임베디드 DB 운영 환경 금지**: H2 등은 테스트 환경에서만 허용, 운영은 PostgreSQL 필수.
- **레거시 Spring 버전 금지**: Spring Boot 3.x 이상만 사용 (Jakarta EE 9+ 기반).
- **동기 로깅 지양**: Log4j2 비동기 Appender 사용으로 성능 영향 최소화.

### 권장 사항

- **데이터베이스 마이그레이션**: Flyway 또는 Liquibase 사용
- **컨테이너화**: Docker, Docker Compose 사용
- **코드 품질**: SonarQube 또는 SpotBugs 연동
- **빌드 자동화**: GitHub Actions, GitLab CI/CD 등

## 개발 워크플로우

### 코드 리뷰

- **필수 검증 항목**:
  - ✅ 헌장 원칙 준수 확인 (특히 계층 분리, 테스트 작성)
  - ✅ API 문서화 완료 (Swagger 애노테이션)
  - ✅ 테스트 커버리지 80% 이상
  - ✅ 로그 레벨 및 민감 정보 처리 적절성
  - ✅ 네이밍 컨벤션 준수 (Java 표준)

- **PR 승인 조건**:
  - 최소 1명의 리뷰어 승인
  - 모든 테스트 통과 (단위 + 통합)
  - 빌드 성공 (Gradle build)

### 브랜치 전략

- **main**: 운영 배포 브랜치 (항상 배포 가능 상태)
- **develop**: 개발 통합 브랜치
- **feature/###-feature-name**: 기능 개발 브랜치 (develop에서 분기)
- **hotfix/###-issue**: 긴급 수정 브랜치 (main에서 분기)

### 배포 절차

1. develop 브랜치에서 통합 테스트 통과
2. Staging 환경 배포 및 검증
3. main 브랜치로 머지 및 태그 생성 (v1.0.0 형식)
4. Production 환경 배포
5. 모니터링 및 롤백 계획 준비

## Governance

### 헌장의 위상

- 이 헌장은 모든 개발 관행에 우선합니다.
- 헌장과 충돌하는 코드는 리팩토링 대상입니다.
- 복잡성이 필요한 경우 명시적인 정당화와 문서화가 필요합니다.

### 헌장 수정 절차

1. **제안**: 변경 사유와 영향 범위를 문서화
2. **검토**: 팀 전체 리뷰 및 토론
3. **승인**: 과반수 이상 동의 필요
4. **마이그레이션**: 기존 코드 영향 분석 및 점진적 적용 계획 수립
5. **버전 업데이트**: 아래 버전 정책에 따라 헌장 버전 증가

### 버전 정책

- **MAJOR**: 핵심 원칙 삭제 또는 하위 호환 불가 변경
- **MINOR**: 새 원칙 추가 또는 기존 원칙 확장
- **PATCH**: 오타 수정, 명확성 개선, 비의미론적 변경

### 준수 검증

- 모든 PR은 헌장 준수 여부 확인 필수
- 분기별 코드베이스 헌장 준수 감사 실시
- 헌장 위반 사항은 Technical Debt로 등록 및 추적

### 런타임 가이던스

프로젝트별 구체적인 구현 가이드는 다음 문서를 참조하세요:
- `.specify/templates/plan-template.md`: 구현 계획 작성
- `.specify/templates/spec-template.md`: 기능 명세 작성
- `.specify/templates/tasks-template.md`: 작업 분해 및 추적

**Version**: 1.0.0 | **Ratified**: 2025-11-10 | **Last Amended**: 2025-11-10
