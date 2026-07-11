# Project Atlas

# Architecture Specification

Version: 1.0.0

Status: Draft

Related Documents

- PVD-001
- PRD-001
- SRS-001

---

# Table of Contents

1. Introduction
2. Architectural Principles
3. High-Level Architecture
4. System Components
5. Layer Architecture
6. Project Structure
7. Data Flow
8. Communication
9. Dependency Rules
10. Future Scalability

---

# 1. Introduction

## Purpose

This document defines the software architecture of Project Atlas.

It explains how the application's components interact, how responsibilities are divided, and how future modules can be added without affecting the existing system.

The architecture emphasizes maintainability, modularity, and offline-first operation.

---

# 2. Architectural Principles

Project Atlas follows these engineering principles:

- Offline First
- Modular Design
- Clean Architecture
- Repository Pattern
- Dependency Injection
- Event-Driven Communication
- SOLID Principles

Business logic must remain independent of the user interface and database implementation.

---

# 3. High-Level Architecture

```
                +----------------------+
                |  Browser Extension   |
                +----------+-----------+
                           |
                           |
                    Lead Import Request
                           |
                           ▼
                +----------------------+
                | Desktop Receiver     |
                +----------+-----------+
                           |
                           ▼
                +----------------------+
                | Import Service       |
                +----------+-----------+
                           |
                           ▼
                +----------------------+
                | Rule Engine          |
                +----------+-----------+
                           |
         +-----------------+-----------------+
         |                 |                 |
         ▼                 ▼                 ▼
 Validation        Duplicate Check     Lead Scoring
         |                 |                 |
         +-----------------+-----------------+
                           |
                           ▼
                +----------------------+
                | Lead Repository      |
                +----------+-----------+
                           |
                           ▼
                +----------------------+
                | SQLite Database      |
                +----------+-----------+
                           |
                           ▼
                +----------------------+
                | Desktop Dashboard    |
                +----------------------+
```

---

# 4. System Components

## Browser Extension

Responsibilities

- Detect supported pages
- Extract public business data
- Request user confirmation
- Send lead data to desktop application

Version 1 Sources

- Google Maps
- Google Search
- Company Websites

---

## Desktop Application

Responsibilities

- Receive imported leads
- Validate data
- Score leads
- Store leads
- Manage projects
- Display dashboard

---

## SQLite Database

Stores

- Leads
- Projects
- Categories
- Settings
- Activity Logs

---

# 5. Layer Architecture

```
Presentation Layer
│
├── Dashboard
├── Leads
├── Projects
├── Search
├── Settings
└── Categories

        │

Application Layer
│
├── DashboardService
├── LeadService
├── ProjectService
├── SearchService
├── ImportService
├── ExportService
└── SettingsService

        │

Business Layer
│
├── Rule Engine
├── Validation Engine
├── Duplicate Detection
├── Scoring Engine
└── Category Matching

        │

Repository Layer
│
├── LeadRepository
├── ProjectRepository
├── CategoryRepository
├── ActivityRepository
└── SettingsRepository

        │

Infrastructure Layer
│
├── SQLite
├── IPC
├── File System
├── Logging
├── Configuration
└── Backup
```

---

# 6. Project Structure

```
atlas/

├── apps/
│   ├── desktop/
│   └── extension/
│
├── packages/
│   ├── application/
│   ├── domain/
│   ├── infrastructure/
│   ├── shared/
│   └── ui/
│
├── docs/
├── scripts/
├── tests/
└── package.json
```

---

# 7. Data Flow

## Lead Import Flow

```
User Browses Website

↓

Extension Detects Business

↓

User Clicks Import

↓

Desktop Receiver

↓

Import Service

↓

Rule Engine

↓

Lead Repository

↓

SQLite

↓

Dashboard Refresh
```

---

## Lead Conversion Flow

```
Lead

↓

Convert To Project

↓

Project Repository

↓

SQLite

↓

Dashboard Update
```

---

# 8. Communication

## Browser Extension → Desktop

Communication Method

Local IPC

Data Format

JSON

Example Payload

```json
{
  "source": "google_maps",
  "businessName": "ABC Dental Clinic",
  "phone": "+1 555-123-4567",
  "website": "https://abcdental.com",
  "email": "",
  "category": "Dentist"
}
```

---

## Internal Communication

Application modules communicate through services.

Examples

Dashboard

↓

LeadService

↓

Repository

No UI component communicates directly with SQLite.

---

# 9. Dependency Rules

Allowed

```
UI

↓

Services

↓

Business Logic

↓

Repositories

↓

SQLite
```

Not Allowed

```
UI

↓

SQLite
```

Not Allowed

```
Rule Engine

↓

React
```

Not Allowed

```
Extension

↓

Database
```

---

# 10. Future Scalability

The architecture is designed to support future expansion without major restructuring.

Planned additions include:

- LinkedIn Connector
- Facebook Connector
- Instagram Connector
- Cloud Sync
- CRM Integrations
- Plugin System
- AI Assistant
- Team Collaboration

All new modules should integrate through services and repository interfaces rather than modifying existing components.

---

# Architecture Summary

Project Atlas follows a modular, layered architecture that separates user interface, application workflows, business rules, and infrastructure.

This design ensures maintainability, testability, scalability, and supports future expansion while preserving the offline-first philosophy of the platform.
