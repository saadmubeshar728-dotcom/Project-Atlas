# Project Atlas

# Development Bible

**Version:** 1.0.0

**Status:** Draft

Related Documents

- Architecture Specification
- SRS-001

---

# Table of Contents

1. Introduction
2. Development Principles
3. Project Structure
4. Naming Conventions
5. Code Standards
6. Git Workflow
7. Commit Messages
8. Pull Requests
9. Definition of Done

---

# 1. Introduction

This document defines the coding standards and development workflow for Project Atlas.

The goal is to keep the codebase clean, readable, maintainable, and easy for every developer to understand.

---

# 2. Development Principles

All development should follow these principles:

- Keep code simple.
- Avoid unnecessary complexity.
- Write reusable components.
- Keep functions small and focused.
- Separate business logic from UI.
- Write readable code before clever code.
- Follow the Single Responsibility Principle.

Whenever there are multiple solutions, choose the simplest one that meets the requirements.

---

# 3. Project Structure

```
atlas/

├── apps/
│   ├── desktop/
│   └── extension/
│
├── docs/
│
├── packages/
│
├── tests/
│
└── package.json
```

Each folder should have a single responsibility.

---

# 4. Naming Conventions

## Files

Use PascalCase for React components.

Examples

```
Dashboard.tsx
LeadCard.tsx
ProjectTable.tsx
```

Use camelCase for utility files.

Examples

```
leadService.ts
dateFormatter.ts
```

---

## Variables

Use meaningful names.

Good

```
leadScore
businessName
projectStatus
```

Avoid

```
x
data
temp
```

---

## Functions

Function names should describe their purpose.

Examples

```
calculateLeadScore()
importLead()
saveProject()
searchLeads()
```

---

# 5. Code Standards

- Keep functions under 50 lines whenever possible.
- Avoid duplicate code.
- Handle errors properly.
- Remove unused code before committing.
- Write comments only when necessary.
- Keep components focused on one task.

---

# 6. Git Workflow

Main Branches

```
main
develop
```

Feature branches

```
feature/dashboard
feature/leads
feature/import
feature/settings
```

Bug fixes

```
fix/import-error
fix/dashboard-search
```

---

# 7. Commit Messages

Use clear and descriptive commit messages.

Examples

```
Add lead scoring system

Create dashboard layout

Fix duplicate detection bug

Improve search performance
```

Avoid messages like

```
Update

Fix

Changes

Done
```

---

# 8. Pull Requests

Before merging:

- Code compiles successfully.
- No console errors.
- Documentation updated if required.
- Code reviewed.
- Feature tested.

---

# 9. Definition of Done

A task is considered complete when:

- Feature is fully implemented.
- No known bugs remain.
- Code follows project standards.
- Documentation is updated.
- Testing has been completed.
- The feature is ready for release.

---

# Development Summary

Project Atlas values simplicity, consistency, and maintainability.

Every contribution should improve the codebase without making it more difficult to understand.

When in doubt, choose the simpler solution.
