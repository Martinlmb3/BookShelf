# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Spring Boot CRUD starter project for a training series. Uses Java 21, Spring Boot 3.5.5, Maven, H2 in-memory database, and Lombok.

## Build & Run Commands

```bash
# Run the application (Windows)
mvnw.cmd spring-boot:run

# Build
mvnw.cmd clean package

# Run tests
mvnw.cmd test

# Run a single test class
mvnw.cmd test -Dtest=ClassName

# Run a single test method
mvnw.cmd test -Dtest=ClassName#methodName
```

## Architecture

- **Package:** `com.example.demo` — all source under `src/main/java/com/example/demo/`
- **Entry point:** `DemoApplication.java` (`@SpringBootApplication`)
- **Packaging:** WAR with embedded Tomcat
- **Database:** H2 in-memory (`jdbc:h2:mem:testdb`), console at `http://localhost:8080/h2-console` (user: `sa`, no password)
- **DDL:** `create-drop` — schema is recreated on every restart
- **Naming strategy:** Hibernate converts camelCase fields to snake_case columns

## Key Conventions

- Entities use Lombok annotations (`@Data`, `@Builder`, `@NoArgsConstructor`, `@AllArgsConstructor`)
- Repositories extend `JpaRepository`
- REST controllers use `@RestController` with `@RequestMapping`
- Server runs on port 8080
