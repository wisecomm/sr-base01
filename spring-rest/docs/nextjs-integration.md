# Walkthrough: nextjs-client Integration into spring-rest

Finished integrating the `nextjs-client` frontend project into the `spring-rest` Spring Boot project.

## Changes Made

### Frontend (nextjs-client)
- **Enabled Static Export**: Added `output: 'export'` to `next.config.ts`.
- **Fixed Compatibility**: Removed `"use server"` from `paserver-actions.ts` to allow static export (converted to client-side mock data).

### Backend (spring-rest)
- **Unified Deployment:** Frontend is served from `/` via Spring Boot's static resource handling.
- **SPA Routing:** Unknown paths like `/login` are automatically redirected to `index.html` for client-side routing.
- **Environment-Specific CORS:** Restrictive CORS in production, permissive in development.
- **Docker-Free Testing:** Integration tests run using H2 (PostgreSQL compatibility mode), removing the need for Docker/Testcontainers during build.
- **Security Configuration**:
  - Updated `SecurityConfig.java` to permit access to static resources (`/`, `/index.html`, etc.).
  - **CORS Refactoring**: Moved allowed origins to properties (`application.yml`). Port 3000 is now only allowed in the development profile.

## Verification Results

### Build Verification
Ran `./gradlew buildFrontend copyFrontend` successfully.
- **Output**: Next.js static files are correctly generated and placed in `spring-rest/src/main/resources/static`.

### File Structure Check
Verified that `index.html`, `_next/`, and other static assets are present in the target directory.

```bash
# Example static files in spring-rest/src/main/resources/static:
index.html
paserver.html
payments.html
_next/
favicon.ico
...
```

## How to Run (Direct Commands)

### Frontend (nextjs-ra02)
- **Development**: `pnpm dev` (Runs on `http://localhost:3000`)
- **Build**: `pnpm build` (Generates static files in `/out`)
- **Test**: `pnpm test:e2e` (Runs Playwright tests)

### Backend (spring-rest)
- **Development**: `./gradlew bootRun` (Runs on `http://localhost:8080`)
- **Build**: `./gradlew build` (Includes frontend build automatically)
- **Test**: `./gradlew test` (Runs JUnit tests)
- **Frontend Only Update**: `./gradlew buildFrontend copyFrontend` (Only updates frontend assets)

## Workflow Suggestions

1. **Frontend-heavy Work**: 
   - Run Spring Boot (`./gradlew bootRun`) for APIs.
   - Run Next.js (`pnpm dev`) for fast UI iterations with Hot Reload.
2. **Integration Testing**: 
   - Run `./gradlew buildFrontend copyFrontend`.
   - Start Spring Boot and access `http://localhost:8080`.
3. **Deployment Preparation**: 
   - Run `./gradlew build`. This creates a production-ready JAR containing the full application.
