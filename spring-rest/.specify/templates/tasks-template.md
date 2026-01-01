---

description: "Task list template for feature implementation"
---

# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

<!-- 
  ============================================================================
  IMPORTANT: The tasks below are SAMPLE TASKS for illustration purposes only.
  
  The /speckit.tasks command MUST replace these with actual tasks based on:
  - User stories from spec.md (with their priorities P1, P2, P3...)
  - Feature requirements from plan.md
  - Entities from data-model.md
  - Endpoints from contracts/
  
  Tasks MUST be organized by user story so each story can be:
  - Implemented independently
  - Tested independently
  - Delivered as an MVP increment
  
  DO NOT keep these sample tasks in the generated tasks.md file.
  ============================================================================
-->

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 프로젝트 초기화 및 기본 구조 설정

- [ ] T001 헌장에 정의된 프로젝트 구조 생성 (src/main/java, src/main/resources, src/test/java)
- [ ] T002 Spring Boot 3.4.1 프로젝트 초기화 (Gradle, JDK 21, 필수 의존성)
- [ ] T003 [P] Log4j2 설정 (비동기 로깅, MDC 추적)
- [ ] T004 [P] Swagger/OpenAPI 설정 (SpringDoc)
- [ ] T005 [P] 전역 예외 처리기 구현 (@ControllerAdvice)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 모든 사용자 스토리 구현 전에 완료되어야 하는 핵심 인프라

**⚠️ 중요**: 이 단계가 완료되기 전까지 사용자 스토리 작업을 시작할 수 없습니다

Spring Boot 프로젝트의 기본 작업 (프로젝트에 따라 조정):

- [ ] T006 PostgreSQL 데이터베이스 스키마 및 마이그레이션 설정 (Flyway/Liquibase)
- [ ] T007 [P] MyBatis 설정 (SqlSessionFactory, 매퍼 스캔)
- [ ] T008 [P] 인증/인가 프레임워크 구현 (Spring Security / JWT 등)
- [ ] T009 Docker Compose 설정 (로컬 PostgreSQL 환경)
- [ ] T010 환경별 설정 파일 구성 (application-dev.yml, application-prod.yml)
- [ ] T011 헬스 체크 엔드포인트 구현 (Spring Boot Actuator)

**체크포인트**: 기반 준비 완료 - 사용자 스토리 병렬 구현 가능

---

## Phase 3: User Story 1 - [Title] (Priority: P1) 🎯 MVP

**목표**: [이 스토리가 제공하는 기능 간단 설명]

**독립 테스트**: [이 스토리를 단독으로 검증하는 방법]

### Tests for User Story 1 (선택 사항 - 테스트가 명시적으로 요청된 경우만) ⚠️

> **중요: 테스트를 먼저 작성하고, 구현 전에 실패하는지 확인 (TDD)**

- [ ] T012 [P] [US1] [엔드포인트] 계약 테스트 작성 (MockMvc, src/test/.../controller/XxxControllerTest.java)
- [ ] T013 [P] [US1] [사용자 여정] 통합 테스트 작성 (@SpringBootTest, TestContainers)

### Implementation for User Story 1

- [ ] T014 [P] [US1] [Entity1] 엔티티 생성 (src/main/.../model/entity/Entity1.java)
- [ ] T015 [P] [US1] [Entity1] DTO 생성 (XxxRequest.java, XxxResponse.java)
- [ ] T016 [P] [US1] MyBatis 매퍼 인터페이스 및 XML 생성 (repository/XxxMapper.java, resources/mapper/XxxMapper.xml)
- [ ] T017 [US1] Service 계층 구현 (service/XxxService.java, @Service, @Transactional) - T016 의존
- [ ] T018 [US1] Controller 구현 (controller/XxxController.java, @RestController, Swagger 애노테이션) - T017 의존
- [ ] T019 [US1] 입력 검증 추가 (@Valid, @NotNull 등)
- [ ] T020 [US1] 에러 핸들링 추가 (try-catch, 커스텀 예외)
- [ ] T021 [US1] 로깅 추가 (Log4j2, 요청 ID 추적)

**체크포인트**: 이 시점에서 User Story 1은 완전히 작동하고 독립적으로 테스트 가능해야 합니다

---

## Phase 4: User Story 2 - [Title] (Priority: P2)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 2 (OPTIONAL - only if tests requested) ⚠️

- [ ] T018 [P] [US2] Contract test for [endpoint] in tests/contract/test_[name].py
- [ ] T019 [P] [US2] Integration test for [user journey] in tests/integration/test_[name].py

### Implementation for User Story 2

- [ ] T020 [P] [US2] Create [Entity] model in src/models/[entity].py
- [ ] T021 [US2] Implement [Service] in src/services/[service].py
- [ ] T022 [US2] Implement [endpoint/feature] in src/[location]/[file].py
- [ ] T023 [US2] Integrate with User Story 1 components (if needed)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - [Title] (Priority: P3)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 3 (OPTIONAL - only if tests requested) ⚠️

- [ ] T024 [P] [US3] Contract test for [endpoint] in tests/contract/test_[name].py
- [ ] T025 [P] [US3] Integration test for [user journey] in tests/integration/test_[name].py

### Implementation for User Story 3

- [ ] T026 [P] [US3] Create [Entity] model in src/models/[entity].py
- [ ] T027 [US3] Implement [Service] in src/services/[service].py
- [ ] T028 [US3] Implement [endpoint/feature] in src/[location]/[file].py

**Checkpoint**: All user stories should now be independently functional

---

[Add more user story phases as needed, following the same pattern]

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] TXXX [P] Documentation updates in docs/
- [ ] TXXX Code cleanup and refactoring
- [ ] TXXX Performance optimization across all stories
- [ ] TXXX [P] Additional unit tests (if requested) in tests/unit/
- [ ] TXXX Security hardening
- [ ] TXXX Run quickstart.md validation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together (if tests requested):
Task: "Contract test for [endpoint] in tests/contract/test_[name].py"
Task: "Integration test for [user journey] in tests/integration/test_[name].py"

# Launch all models for User Story 1 together:
Task: "Create [Entity1] model in src/models/[entity1].py"
Task: "Create [Entity2] model in src/models/[entity2].py"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
