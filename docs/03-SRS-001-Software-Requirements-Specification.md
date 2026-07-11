# Project Atlas

# Software Requirements Specification (SRS-001)

**Version:** 1.0.0

**Status:** Draft

**Owner:** Project Atlas

**Codename:** Project Atlas

**Slogan:** Every Lead Has a Destination.

---

# Document Information

| Field | Value |
|-------|-------|
| Document | Software Requirements Specification |
| Version | 1.0 |
| Status | Draft |
| Platform | Desktop + Browser Extension |
| Architecture | Offline First |
| Database | SQLite |
| UI | React |
| Desktop Framework | Electron |
| Browser Extension | Manifest V3 |

---

# Table of Contents

1. Introduction
2. System Overview
3. Functional Requirements
4. Non-Functional Requirements
5. System Architecture
6. Modules
7. Data Flow
8. Business Rules
9. Error Handling
10. Future Scope

---

# 1. Introduction

## Purpose

This document defines the technical requirements for Project Atlas Version 1.

It describes how the software should be built and how its components interact.

The SRS serves as the primary reference for developers throughout implementation.

---

## Product Overview

Project Atlas is an offline-first Lead Intelligence Platform.

It consists of:

- Browser Extension
- Desktop Application
- SQLite Database

The browser extension captures publicly available business information after explicit user confirmation.

The desktop application validates, scores, categorizes, stores, and manages those leads.

---

## MVP Scope

Supported Sources

- Google Maps
- Google Search
- Company Websites

Future versions will introduce additional connectors.

---

# 2. System Overview

## Core Components

### Browser Extension

Responsibilities

- Detect supported pages
- Parse public business information
- Ask for user confirmation
- Send data to desktop application

---

### Desktop Application

Responsibilities

- Receive imported leads
- Process leads
- Store leads
- Display dashboard
- Manage projects
- Export data

---

### Local Database

SQLite stores

- Leads
- Projects
- Categories
- Settings
- Activity History

---

# 3. Functional Requirements

## Lead Import

The application shall allow users to import business leads from supported websites after confirmation.

---

## Lead Management

The application shall allow users to

- View
- Edit
- Archive
- Delete
- Restore

leads.

---

## Lead Scoring

Every imported lead shall receive a deterministic score between 0 and 100.

Priority colors

Green

75–100

Yellow

45–74

Red

0–44

---

## Categories

Users shall be able to

- Create
- Edit
- Delete

categories.

---

## Projects

Users shall be able to convert a lead into a project.

Project information shall remain linked to the original lead.

---

## Search

Users shall be able to search using

- Business Name
- Phone
- Email
- Website
- Tags
- Category

---

## Export

Supported formats

- CSV
- JSON

---

## Settings

Users shall be able to configure

- Theme
- Export Folder
- Categories
- Database Location

---

# 4. Non-Functional Requirements

## Performance

Application Startup

Less than 3 seconds

Search

Less than 300ms

Dashboard Refresh

Less than 500ms

Lead Import

Less than 2 seconds

---

## Security

- User confirmation required
- Local storage only
- No hidden background collection
- No automatic imports

---

## Reliability

The application shall continue operating even if a lead fails validation.

Errors shall never crash the application.

---

## Maintainability

Architecture shall remain modular.

Business logic shall remain independent of UI.

---

# 5. System Architecture

Project Atlas follows

- Clean Architecture
- Repository Pattern
- Dependency Injection
- Modular Design

---

## Architecture Diagram

```
Browser Extension

↓

Desktop Receiver

↓

Import Service

↓

Rule Engine

↓

Repository

↓

SQLite

↓

Dashboard
```

---

## Layers

Presentation

↓

Application

↓

Business Logic

↓

Repository

↓

Infrastructure

↓

SQLite

---

# 6. Modules

## Dashboard

Displays

- Statistics
- Recent Leads
- Recent Projects
- Activity

---

## Leads

Responsibilities

- CRUD
- Notes
- Tags
- Archive

---

## Projects

Responsibilities

- Convert Lead
- Manage Client
- Track Status

---

## Categories

Responsibilities

- Organize Leads

---

## Search

Responsibilities

- Instant Search
- Filters

---

## Import

Responsibilities

- Receive Data
- Trigger Rule Engine

---

## Rule Engine

Responsibilities

- Validation
- Duplicate Detection
- Category Matching
- Lead Scoring

---

## Export

Responsibilities

- CSV
- JSON

---

## Settings

Responsibilities

- User Preferences
- Categories
- Export Configuration

---

# 7. Data Flow

```
User Browses

↓

Extension Detects Business

↓

User Clicks "Import"

↓

Desktop Receives Data

↓

Rule Engine

↓

SQLite

↓

Dashboard Updates
```

---

# 8. Business Rules

## Validation

Every lead must contain

- Business Name

At least one of

- Phone
- Email
- Website

---

## Duplicate Detection

Duplicate comparison uses

- Business Name
- Website
- Phone

Possible duplicates are flagged for user review.

---

## Lead Scoring

The Rule Engine assigns a score based on

- Contact Information
- Website Availability
- Google Rating (if available)
- Category Match
- Data Completeness

Scores determine priority color.

---

## Categories

Users may create unlimited custom categories.

---

## Projects

A lead may only be converted into one active project.

---

# 9. Error Handling

Common errors

- Invalid Lead
- Duplicate Lead
- Import Failure
- Export Failure
- Database Error

The application shall

- Log the error
- Notify the user
- Continue operating

---

# 10. Future Scope

Version 2

- LinkedIn Connector
- Facebook Connector
- Instagram Connector
- Cloud Synchronization

Version 3

- CRM Integrations
- Team Collaboration
- Plugin Marketplace
- AI-Assisted Lead Analysis

---

# Engineering Principles

Project Atlas follows the following principles:

- Offline First
- Modular Design
- Clean Architecture
- Repository Pattern
- Dependency Injection
- SOLID Principles
- Deterministic Rule Engine
- Explicit User Consent

---

# Definition of Done

A feature is considered complete when:

- Functionality implemented
- Unit tests pass
- Documentation updated
- Code reviewed
- Acceptance criteria satisfied

---

# Conclusion

The Software Requirements Specification defines the technical foundation for Project Atlas Version 1.

It establishes the system architecture, functional behavior, non-functional requirements, business rules, and engineering principles required to implement a maintainable, scalable, and offline-first lead intelligence platform.

This document serves as the primary engineering reference during development.
