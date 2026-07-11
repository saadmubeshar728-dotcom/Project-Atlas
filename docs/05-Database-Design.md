# Project Atlas

# Database Design

**Version:** 1.0.0

**Status:** Draft

Related Documents

- SRS-001
- Architecture Specification

---

# Table of Contents

1. Introduction
2. Database Overview
3. Tables
4. Relationships
5. Indexes
6. Data Rules
7. Backup Strategy

---

# 1. Introduction

## Purpose

This document defines the database structure for Project Atlas Version 1.

Project Atlas uses **SQLite** as its primary database because it is lightweight, offline-first, reliable, and requires no external server.

---

# 2. Database Overview

Database Name

```
atlas.db
```

Version

```
1.0
```

Storage

```
Local Machine
```

Database Engine

```
SQLite
```

---

# 3. Tables

Project Atlas uses the following tables:

| Table | Purpose |
|---------|----------|
| leads | Stores imported business leads |
| projects | Stores converted client projects |
| categories | User-defined lead categories |
| activity_logs | Records user actions |
| settings | Application settings |

---

# 4. Table Structure

## leads

Stores all imported business leads.

| Column | Type | Description |
|----------|----------|----------------|
| id | INTEGER | Primary Key |
| business_name | TEXT | Business name |
| phone | TEXT | Phone number |
| email | TEXT | Email address |
| website | TEXT | Website URL |
| address | TEXT | Business address |
| city | TEXT | City |
| country | TEXT | Country |
| source | TEXT | Google Maps / Search / Website |
| category_id | INTEGER | Linked category |
| score | INTEGER | Lead score (0–100) |
| priority | TEXT | Green / Yellow / Red |
| notes | TEXT | User notes |
| imported_at | DATETIME | Import date |
| updated_at | DATETIME | Last update |

---

## projects

Stores leads converted into active projects.

| Column | Type | Description |
|----------|----------|----------------|
| id | INTEGER | Primary Key |
| lead_id | INTEGER | Related lead |
| project_name | TEXT | Project title |
| client_name | TEXT | Client name |
| budget | REAL | Project budget |
| status | TEXT | Active / Completed / Cancelled |
| start_date | DATE | Start date |
| end_date | DATE | Completion date |
| notes | TEXT | Internal notes |

---

## categories

Stores user-created lead categories.

| Column | Type | Description |
|----------|----------|----------------|
| id | INTEGER | Primary Key |
| name | TEXT | Category name |
| color | TEXT | Display color |

---

## activity_logs

Tracks user actions.

| Column | Type | Description |
|----------|----------|----------------|
| id | INTEGER | Primary Key |
| action | TEXT | Action performed |
| details | TEXT | Description |
| created_at | DATETIME | Timestamp |

Examples

- Lead Imported
- Lead Deleted
- Project Created
- Export Completed

---

## settings

Stores user preferences.

| Column | Type | Description |
|----------|----------|----------------|
| id | INTEGER | Primary Key |
| theme | TEXT | Light / Dark |
| export_folder | TEXT | Export location |
| default_category | TEXT | Default category |
| created_at | DATETIME | Creation time |
| updated_at | DATETIME | Last updated |

---

# 5. Relationships

```
Categories
      │
      │
      ▼
Leads
      │
      │
      ▼
Projects
```

Relationship Summary

- One category can contain many leads.
- One lead can become one project.
- Projects always reference an existing lead.

---

# 6. Indexes

To improve search performance, the following indexes should be created:

| Table | Column |
|---------|---------|
| leads | business_name |
| leads | phone |
| leads | email |
| leads | website |
| leads | score |
| leads | category_id |
| projects | status |

---

# 7. Data Rules

Lead Rules

- Every lead must have a business name.
- At least one contact method (phone, email, or website) is required.
- Scores must be between 0 and 100.
- Priority is calculated from the score and should not be manually edited.

Project Rules

- A project must reference an existing lead.
- A lead can only be converted into one active project.

Category Rules

- Category names must be unique.
- Categories cannot be deleted while leads are assigned to them.

---

# 8. Backup Strategy

The database file should be backed up manually by the user.

Backup Process

```
atlas.db

↓

Create Copy

↓

Save to User Selected Location
```

Future versions may include:

- Automatic scheduled backups
- Cloud synchronization
- Backup encryption

---

# Database Summary

Project Atlas uses a lightweight SQLite database to store all application data locally.

The schema is designed to support fast searches, reliable lead management, simple project tracking, and future expansion while maintaining the offline-first philosophy of the application.
