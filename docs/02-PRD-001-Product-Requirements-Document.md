# Project Atlas

> **Document:** Product Requirements Document (PRD-001)  
> **Version:** 1.0.0  
> **Status:** Draft  
> **Owner:** Project Atlas Team  
> **Related Documents:** PVD-001

---

# Product Requirements Document (PRD-001)

## Document Purpose

The Product Requirements Document (PRD) defines **what Project Atlas must do**.

Unlike the Product Vision Document, which explains *why* Atlas exists, the PRD defines every functional requirement, feature, workflow, user interaction, and business expectation.

This document serves as the primary reference for developers, designers, testers, and project stakeholders throughout the development lifecycle.

---

# Table of Contents

1. Executive Summary
2. Product Overview
3. Business Objectives
4. Product Goals
5. Scope
6. Target Users
7. User Personas
8. User Journey
9. Functional Requirements
10. Non-Functional Requirements
11. Modules
12. Features
13. User Stories
14. Acceptance Criteria
15. Success Metrics
16. MVP Scope
17. Future Scope
18. Risks
19. Constraints
20. Glossary

---

# 1. Executive Summary

Project Atlas is an offline-first Lead Intelligence Platform that helps freelancers, agencies, and businesses capture, organize, score, and manage business leads collected from supported online sources.

Rather than acting as a traditional CRM, Atlas focuses on the **lead discovery and qualification** phase of the sales pipeline.

The product combines a lightweight browser extension with a desktop application to provide a seamless workflow for importing publicly available business information, validating it, assigning scores, and tracking progress from initial discovery to completed projects.

The first version (V1) emphasizes reliability, privacy, and modularity. It intentionally avoids unnecessary complexity such as AI-driven decision making or mandatory cloud services. Instead, Atlas relies on deterministic business rules and local data storage, ensuring that users retain full control of their information.

---

# 2. Product Overview

Project Atlas consists of two primary software components:

## 2.1 Atlas Browser Extension

The browser extension assists users while browsing supported websites.

Responsibilities include:

- Detect supported pages.
- Identify business listings.
- Extract publicly available business information after user confirmation.
- Standardize extracted data.
- Send data to the desktop application.

The extension never stores long-term business data and never imports information without the user's explicit action.

---

## 2.2 Atlas Desktop Application

The desktop application serves as the central workspace.

Responsibilities include:

- Receiving imported leads.
- Running validation rules.
- Removing duplicates.
- Scoring leads.
- Categorizing businesses.
- Managing projects.
- Displaying dashboards.
- Searching and filtering.
- Exporting data.
- Maintaining the local SQLite database.

The desktop application is the primary interface for all business operations.

---

# 3. Business Objectives

The primary business objectives of Project Atlas are:

### BO-01

Reduce manual lead collection by at least 80%.

---

### BO-02

Reduce repetitive copy-and-paste operations.

---

### BO-03

Improve lead organization.

---

### BO-04

Provide transparent lead prioritization through deterministic scoring.

---

### BO-05

Allow users to manage their complete lead pipeline from one application.

---

### BO-06

Create a commercial software product suitable for licensing and white-label deployment.

---

# 4. Product Goals

Project Atlas aims to achieve the following goals:

- Centralize lead management.
- Improve productivity.
- Increase lead conversion rates.
- Minimize administrative work.
- Protect user privacy.
- Operate offline.
- Provide a modular architecture for future expansion.

---

# 5. Product Scope

## Included in Version 1

### Browser Extension

- Google Maps support.
- Google Search support.
- Company website support.

### Desktop Application

- Dashboard
- Lead Inbox
- Projects
- Categories
- Search
- Filters
- Rule Engine
- Export
- SQLite Database
- Settings

---

## Excluded from Version 1

The following items are intentionally postponed:

- LinkedIn Connector
- Facebook Connector
- Instagram Connector
- Cloud Synchronization
- AI Assistance
- Team Collaboration
- Plugin Marketplace

---

# 6. Success Criteria

Project Atlas Version 1 will be considered successful when users can:

- Import leads from supported sources.
- Manage leads locally.
- Search and filter thousands of records.
- Convert leads into projects.
- Export data.
- Operate fully offline after installation.

---
---

# 7. Target Users

Project Atlas is designed primarily for professionals and businesses that regularly perform lead generation and business development activities.

The platform focuses on users who need a lightweight, offline-first alternative to traditional CRM systems during the lead discovery and qualification phase.

## Primary Target Users

### Freelancers

Freelancers often spend a significant amount of time searching for potential clients across Google Maps, search engines, and company websites.

Atlas helps them collect and organize opportunities without maintaining spreadsheets.

Typical services include:

- Web Development
- Graphic Design
- SEO
- Content Writing
- Video Editing
- Digital Marketing
- Automation
- Software Development

---

### Digital Agencies

Digital agencies generate hundreds or thousands of leads every month.

Atlas provides a centralized workspace for discovering, qualifying, and organizing those leads before they enter a CRM or project management system.

---

### Marketing Agencies

Marketing agencies can use Atlas to identify businesses that may require services such as:

- SEO
- Paid Advertising
- Branding
- Website Redesign
- Social Media Marketing

---

### Consultants

Business consultants often build prospect lists manually.

Atlas reduces research time while providing a structured pipeline.

---

### Sales Representatives

Sales professionals require organized lead pipelines with clear prioritization.

Atlas assists by scoring opportunities based on predefined business rules.

---

### Startup Founders

Founders looking for early customers can use Atlas to build prospect databases and track outreach activities.

---

# 8. User Personas

The following personas represent typical Atlas users.

---

## Persona A

### Name

Alex Johnson

### Occupation

Freelance Web Developer

### Experience

5 Years

### Goals

- Find new local businesses.
- Build long-term client relationships.
- Spend less time copying business information.

### Pain Points

- Too much manual work.
- Lost opportunities.
- Duplicate spreadsheets.
- Forgetting to follow up.

### Atlas Helps By

- Importing business information.
- Organizing everything automatically.
- Prioritizing leads.
- Tracking project conversions.

---

## Persona B

### Name

Sarah Williams

### Occupation

Agency Owner

### Company Size

12 Employees

### Goals

- Build outreach campaigns.
- Organize thousands of leads.
- Track conversions.

### Pain Points

- Data spread across multiple tools.
- Duplicate contacts.
- Difficult reporting.

### Atlas Helps By

- Centralized lead storage.
- Advanced filtering.
- Lead scoring.
- Project tracking.

---

## Persona C

### Name

Michael Davis

### Occupation

Sales Consultant

### Goals

- Find qualified businesses.
- Prioritize outreach.
- Increase response rates.

### Atlas Helps By

- Automatic organization.
- Priority scoring.
- Searchable lead database.

---

# 9. User Journey

This section describes the expected journey of a user from installation through project completion.

---

## Step 1 — Installation

The user downloads and installs:

- Atlas Desktop Application
- Atlas Browser Extension

---

## Step 2 — First Launch

During the first launch Atlas will:

- Create the local SQLite database.
- Create default categories.
- Configure settings.
- Ask for preferred industries.
- Configure extension connection.

---

## Step 3 — Daily Workflow

The user begins browsing supported websites.

Example:

Google Maps

↓

Searches for

```
Dentists in New York
```

Atlas detects supported content.

↓

Extension displays

```
We found 42 businesses.

Import them?
```

↓

User clicks

```
Import
```

↓

Atlas imports all supported business information.

---

## Step 4 — Rule Engine

Every imported lead passes through the Rule Engine.

```
Validate

↓

Normalize

↓

Duplicate Detection

↓

Category Detection

↓

Lead Scoring

↓

Priority Assignment

↓

Database Storage
```

No lead enters the database without passing these validation stages.

---

## Step 5 — Dashboard

The user opens Atlas Desktop.

Dashboard displays:

- Total Leads
- New Leads
- High Priority Leads
- Projects
- Recent Imports
- Activity Timeline

---

## Step 6 — Review Leads

User reviews imported businesses.

Possible actions:

- View Details
- Add Notes
- Change Category
- Archive
- Delete
- Mark Contacted
- Convert to Project

---

## Step 7 — Contact Business

Atlas does not automatically send emails or messages.

The user performs outreach independently.

Possible outreach methods include:

- Email
- Phone
- Website Contact Form
- Social Media
- Other communication channels

Atlas simply tracks progress.

---

## Step 8 — Update Lead Status

Possible statuses include:

```
New

↓

Qualified

↓

Contacted

↓

Meeting Scheduled

↓

Proposal Sent

↓

Negotiation

↓

Won

↓

Lost

↓

Archived
```

Every status change is recorded in the activity timeline.

---

## Step 9 — Convert to Project

When a lead becomes a client:

User clicks

```
Convert To Project
```

Atlas:

- Creates a new Project
- Links original Lead
- Preserves activity history
- Updates dashboard statistics

---

# 10. Core Product Features

The following features define Version 1.

## Lead Collection

- Browser Extension
- Import Confirmation
- Public Business Information Extraction

---

## Lead Management

- Search
- Filters
- Categories
- Notes
- Tags
- Priority
- Status

---

## Rule Engine

- Validation
- Duplicate Detection
- Category Matching
- Lead Scoring
- Priority Assignment

---

## Dashboard

Displays:

- Total Leads
- New Leads
- Green Leads
- Yellow Leads
- Red Leads
- Projects
- Recent Activity

---

## Projects Module

Allows users to:

- Convert leads into projects.
- Track project origin.
- View linked lead history.

---

## Export Module

Export options:

- CSV
- Excel (planned)
- JSON

---

## Settings

User can configure:

- Categories
- Scoring Rules
- Extension Preferences
- Database Backup
- Theme

---

# Chapter 2 Summary

This chapter defines:

- Target Users
- Personas
- Complete User Journey
- Core Features

These sections establish how real users are expected to interact with Project Atlas throughout their daily workflow.

---

# 11. Functional Requirements

## Introduction

Functional requirements define the behavior that Project Atlas must provide.

Every requirement in this section is mandatory for Version 1 unless otherwise specified.

Each requirement is assigned a unique identifier for future reference.

---

# 11.1 Browser Extension Requirements

## FR-001

The browser extension shall detect supported websites.

Priority: Critical

---

## FR-002

The extension shall recognize Google Maps business listing pages.

Priority: Critical

---

## FR-003

The extension shall recognize Google Search pages containing business listings.

Priority: Critical

---

## FR-004

The extension shall detect supported company websites.

Priority: High

---

## FR-005

The extension shall never collect data automatically.

The user must explicitly approve every import operation.

Priority: Critical

---

## FR-006

The extension shall display an import confirmation popup.

Example:

```
Found 18 Businesses

Import them?

[Import]

[Cancel]
```

Priority: Critical

---

## FR-007

The extension shall extract publicly available business information.

Possible fields include:

- Company Name
- Phone Number
- Website
- Address
- Email (if publicly visible)
- Rating
- Review Count
- Source
- Date Imported

Priority: Critical

---

## FR-008

The extension shall convert extracted information into the Atlas Lead Model before transmission.

Priority: Critical

---

## FR-009

The extension shall send imported leads to the desktop application.

Priority: Critical

---

## FR-010

The extension shall display import progress while data is being transferred.

Priority: Medium

---

# 11.2 Lead Import Requirements

---

## FR-011

The desktop application shall receive lead data from the browser extension.

---

## FR-012

Every imported lead shall receive a unique internal identifier.

---

## FR-013

The application shall record the import timestamp.

---

## FR-014

The application shall record the source platform.

Examples:

- Google Maps
- Google Search
- Website

---

## FR-015

The application shall preserve the original imported data.

---

## FR-016

Every imported lead shall be processed through the Rule Engine.

No lead may bypass validation.

---

# 11.3 Validation Requirements

---

## FR-017

The application shall validate required fields.

Minimum required fields:

- Business Name

---

## FR-018

Invalid leads shall be rejected.

---

## FR-019

Rejected leads shall be logged.

---

## FR-020

Validation errors shall be visible to the user.

---

# 11.4 Duplicate Detection

---

## FR-021

The application shall detect duplicate leads.

---

## FR-022

Duplicate detection shall compare:

- Business Name
- Website
- Phone Number

---

## FR-023

The application shall notify the user before importing duplicate records.

---

## FR-024

The user shall decide whether duplicates should be imported.

---

# 11.5 Categories

---

## FR-025

Users shall create custom categories.

---

## FR-026

Users shall edit categories.

---

## FR-027

Users shall delete categories.

---

## FR-028

Every lead shall belong to one category.

---

## FR-029

Categories shall support colors.

---

# 11.6 Lead Management

---

## FR-030

Users shall view all imported leads.

---

## FR-031

Users shall edit lead information.

---

## FR-032

Users shall delete leads.

---

## FR-033

Users shall archive leads.

---

## FR-034

Users shall restore archived leads.

---

## FR-035

Users shall add notes.

---

## FR-036

Users shall assign tags.

---

## FR-037

Users shall change lead status.

---

## FR-038

Users shall attach files in future versions.

Status: Deferred

---

# 11.7 Search

---

## FR-039

Users shall search by:

- Business Name
- Phone
- Website
- Email

---

## FR-040

Search results shall update instantly.

---

## FR-041

Search shall ignore letter casing.

---

## FR-042

Search shall support partial matching.

---

# 11.8 Filters

---

## FR-043

Users shall filter by:

- Category
- Score
- Priority
- Source
- Date
- Status

---

## FR-044

Multiple filters shall work together.

---

## FR-045

Users shall reset all filters.

---

# 11.9 Lead Scoring

---

## FR-046

Every imported lead shall receive a score.

Range:

0–100

---

## FR-047

Lead scores shall be calculated by deterministic business rules.

---

## FR-048

Users shall view score details.

---

## FR-049

Users shall customize scoring weights.

---

## FR-050

Scores shall automatically update after edits.

---

# 11.10 Priority Levels

---

## FR-051

Priority shall be determined from the lead score.

```
75-100

Green

45-74

Yellow

0-44

Red
```

---

## FR-052

Dashboard shall sort by priority.

Green

↓

Yellow

↓

Red

---

# 11.11 Dashboard

---

## FR-053

Dashboard shall display:

- Total Leads
- New Leads
- Green Leads
- Yellow Leads
- Red Leads
- Projects
- Recent Activity

---

## FR-054

Dashboard statistics shall update automatically.

---

## FR-055

Dashboard shall support quick navigation.

---

# 11.12 Projects

---

## FR-056

Users shall convert a lead into a project.

---

## FR-057

Converted projects shall preserve lead history.

---

## FR-058

Projects shall remain linked to their original lead.

---

## FR-059

Users shall reopen completed projects.

---

# 11.13 Export

---

## FR-060

Users shall export selected leads.

Formats:

- CSV
- JSON

---

## FR-061

Users shall export filtered results.

---

## FR-062

Export shall preserve categories and scores.

---

# 11.14 Settings

---

## FR-063

Users shall configure:

- Categories
- Theme
- Database Location
- Extension Settings

---

## FR-064

Users shall create local backups.

---

## FR-065

Users shall restore backups.

---

# 12. Non-Functional Requirements

## Performance

### NFR-001

Dashboard shall load within two seconds.

---

### NFR-002

Search results shall appear in under 300 milliseconds.

---

### NFR-003

Importing 100 leads shall complete in under five seconds.

---

## Reliability

### NFR-004

Application shall recover gracefully after unexpected shutdown.

---

### NFR-005

Database integrity shall be maintained.

---

## Security

### NFR-006

All data shall remain on the local device.

---

### NFR-007

No telemetry shall be enabled by default.

---

### NFR-008

User consent is required before every import.

---

## Usability

### NFR-009

Application shall remain usable without internet after installation.

---

### NFR-010

Common operations should require no more than three clicks.

---

## Maintainability

### NFR-011

Modules shall follow the Single Responsibility Principle.

---

### NFR-012

The application shall use a modular architecture.

---

### NFR-013

Business logic shall be separated from UI logic.

---

# 13. Business Rules

## BR-001

No lead may enter the database before validation.

---

## BR-002

Every lead receives exactly one score.

---

## BR-003

Every lead belongs to one category.

---

## BR-004

A lead can become a project only once.

---

## BR-005

Deleting a lead shall not automatically delete its linked project.

---

## BR-006

Every status change shall be recorded in the activity history.

---

# Chapter 3 Summary

This chapter defines the mandatory behavior of Project Atlas.

Every functional requirement listed here will later be mapped to:

- UI Screens
- Database Tables
- Rule Engine
- Test Cases
- Sprint Tasks

These requirements become the foundation for implementation and quality assurance.

---

# 14. System Modules

## Overview

Project Atlas is designed using a modular architecture.

Each module has a single responsibility and communicates with other modules through clearly defined interfaces.

This design minimizes dependencies and allows future enhancements without affecting unrelated parts of the application.

---

# Module Overview

```
                    Project Atlas

                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼

 Browser Extension   Desktop App      SQLite Database

                         │
                         ▼

                  Rule Engine

                         │
      ┌──────────┬────────────┬────────────┐
      ▼          ▼            ▼            ▼

 Dashboard    Leads      Projects     Settings

                         │
                         ▼

                  Export Manager
```

---

# 14.1 Browser Extension

## Purpose

The Browser Extension is responsible for detecting supported websites and assisting users in importing publicly available business information.

The extension **does not permanently store business data**.

---

## Responsibilities

- Detect supported websites
- Parse supported pages
- Display import confirmation
- Extract public business data
- Standardize extracted data
- Send data to Desktop Application

---

## Inputs

- Google Maps
- Google Search
- Company Websites

---

## Outputs

Atlas Lead Object

---

## Dependencies

Desktop Application

---

# 14.2 Desktop Application

## Purpose

Acts as the central workspace for the user.

Every imported lead eventually arrives here.

---

## Responsibilities

- Receive imported leads
- Store leads
- Manage projects
- Search
- Filtering
- Dashboard
- Rule Engine
- Export

---

## Dependencies

SQLite

Rule Engine

---

# 14.3 Rule Engine

## Purpose

The Rule Engine determines how Atlas processes every imported lead.

Every lead passes through this module.

---

## Responsibilities

Validation

↓

Normalization

↓

Duplicate Detection

↓

Category Assignment

↓

Lead Scoring

↓

Priority Calculation

↓

Database Storage

---

## Inputs

Atlas Lead Object

---

## Outputs

Validated Lead

---

## Rules

No lead bypasses the Rule Engine.

---

# 14.4 Dashboard Module

## Purpose

Provides users with a high-level overview of their business pipeline.

---

## Responsibilities

Display

- Total Leads
- New Leads
- Projects
- Green Leads
- Yellow Leads
- Red Leads
- Recent Activity

---

## Widgets

Lead Counter

Priority Chart

Recent Imports

Activity Timeline

Quick Actions

---

# 14.5 Lead Manager

## Purpose

Stores and manages every imported lead.

---

## Responsibilities

Create

Read

Update

Delete

Archive

Restore

Tag

Categorize

Search

Filter

---

## States

```
New

↓

Qualified

↓

Contacted

↓

Proposal Sent

↓

Negotiation

↓

Won

↓

Lost

↓

Archived
```

---

# 14.6 Project Manager

## Purpose

Converts qualified leads into active projects.

---

## Responsibilities

Create Project

Update Project

Delete Project

Close Project

Reopen Project

Link Lead

Maintain History

---

# 14.7 Search Engine

## Responsibilities

Instant Search

Partial Matching

Filtering

Sorting

Pagination

---

## Search Fields

Business Name

Phone

Website

Email

Address

Category

Tags

Notes

---

# 14.8 Export Manager

## Responsibilities

CSV Export

JSON Export

Future Excel Export

---

## Export Filters

Selected Leads

Current Search

Current Filter

Entire Database

---

# 14.9 Settings Module

## Responsibilities

Categories

Theme

Database

Backups

Extension

Scoring Rules

Preferences

---

# 15. Module Communication

```
Browser Extension

        │

        ▼

Desktop Receiver

        │

        ▼

Rule Engine

        │

        ▼

SQLite

        │

        ▼

Dashboard

Lead Manager

Project Manager

Search Engine

Export
```

Every communication inside Atlas should follow a single direction.

Modules never directly modify another module's internal state.

Communication must occur through services or repositories.

---

# 16. Feature Matrix

| Module | Version 1 | Future |
|----------|-----------|---------|
| Browser Extension | ✅ | Expanded Connectors |
| Dashboard | ✅ | Charts & Analytics |
| Lead Manager | ✅ | Bulk Operations |
| Rule Engine | ✅ | AI Assistance |
| Search | ✅ | Smart Search |
| Projects | ✅ | Team Projects |
| Export | ✅ | PDF & Excel |
| Settings | ✅ | Cloud Profiles |

---

# 17. Module Dependencies

```
Dashboard

↓

Lead Manager

↓

Rule Engine

↓

Database
```

Browser Extension communicates only with the Desktop Receiver.

The Rule Engine never communicates directly with the UI.

Database access must occur only through the Repository Layer.

---

# 18. State Transition Diagram

Lead Lifecycle

```
Imported

↓

Validated

↓

Qualified

↓

Contacted

↓

Meeting

↓

Proposal

↓

Negotiation

↓

Won

↓

Project
```

Alternative Flow

```
Imported

↓

Rejected

↓

Archived
```

---

# 19. Error Handling Strategy

Every module shall return structured error responses.

Example

```
Validation Error

↓

Rule Engine

↓

Error Object

↓

UI Notification

↓

Activity Log
```

No module should terminate the application because of invalid input.

Errors should be recoverable whenever possible.

---

# 20. Acceptance Criteria

The modular architecture shall satisfy the following requirements:

- Every module has one primary responsibility.
- Modules communicate through defined interfaces.
- UI components never access the database directly.
- Business logic remains independent of presentation logic.
- Modules can be replaced without rewriting the entire application.

---

# Chapter 4 Summary

This chapter defines the structural organization of Project Atlas.

It identifies every major subsystem, its responsibilities, dependencies, and interactions.

These definitions provide the architectural foundation that will be expanded in the Software Requirements Specification (SRS) and Architecture Specification documents.

---

# 21. Feature Specifications

## Overview

This chapter defines every major feature included in Project Atlas Version 1.

Each feature includes:

- Purpose
- Responsibilities
- User Actions
- System Behavior
- Business Rules
- Edge Cases
- Acceptance Criteria

---

# 21.1 Dashboard

## Purpose

The Dashboard is the landing page of Project Atlas.

It provides users with a high-level overview of their lead pipeline and business activity.

The dashboard should answer one question within five seconds:

> "What requires my attention today?"

---

## Responsibilities

- Display business statistics
- Highlight high-priority leads
- Show recent imports
- Display recent activity
- Provide quick navigation

---

## Dashboard Widgets

### Total Leads

Displays the total number of leads stored in Atlas.

---

### New Leads

Shows leads imported within the last 7 days.

---

### Priority Overview

Display:

- 🟢 Green Leads
- 🟡 Yellow Leads
- 🔴 Red Leads

---

### Projects

Displays:

- Active Projects
- Completed Projects

---

### Recent Imports

Shows the latest imported businesses.

Information displayed:

- Business Name
- Source
- Date Imported
- Score

---

### Activity Timeline

Displays recent actions.

Examples:

```
Lead Imported

Lead Updated

Lead Contacted

Project Created

Lead Archived
```

---

### Quick Actions

Buttons

```
Import Leads

View Leads

Create Category

Export

Backup Database
```

---

## Business Rules

Dashboard statistics must refresh automatically whenever lead data changes.

---

## Acceptance Criteria

- Dashboard loads under two seconds.
- Statistics are accurate.
- Widgets update automatically.
- Clicking a widget opens the relevant page.

---

# 21.2 Lead Manager

## Purpose

The Lead Manager stores and organizes every business imported into Atlas.

---

## Responsibilities

- Create Lead
- Edit Lead
- Delete Lead
- Archive Lead
- Restore Lead
- Categorize Lead
- Score Lead
- Add Notes
- Search
- Filter

---

## Lead Information

Each lead contains:

```
Business Name

Phone Number

Website

Email

Address

Category

Score

Priority

Status

Source

Import Date

Last Updated

Notes

Tags
```

---

## Available Actions

User may:

- Edit
- Delete
- Archive
- Restore
- Duplicate
- Convert to Project
- Copy Information

---

## Business Rules

Deleting a lead moves it to the Recycle Bin.

Permanent deletion requires confirmation.

---

## Acceptance Criteria

- CRUD operations complete successfully.
- Data remains synchronized.
- Duplicate detection works.
- Changes appear immediately.

---

# 21.3 Browser Extension

## Purpose

The Browser Extension assists users while browsing supported websites.

It acts only after user confirmation.

---

## Supported Sources

Version 1

- Google Maps
- Google Search
- Company Websites

---

## Responsibilities

- Detect supported pages
- Parse page
- Display Import Prompt
- Extract Public Information
- Send Lead Data

---

## Import Flow

```
User Browses

↓

Extension Detects

↓

Prompt User

↓

User Approves

↓

Extract Data

↓

Send to Desktop

↓

Desktop Validates

↓

Rule Engine

↓

SQLite
```

---

## Business Rules

The extension never imports data without user interaction.

---

## Acceptance Criteria

- Prompt appears correctly.
- Data extraction succeeds.
- Desktop receives data.
- Import finishes successfully.

---

# 21.4 Rule Engine

## Purpose

The Rule Engine is the intelligence layer of Atlas.

Every imported lead passes through it.

---

## Processing Pipeline

```
Receive Lead

↓

Validate

↓

Normalize

↓

Duplicate Check

↓

Category Match

↓

Lead Score

↓

Priority

↓

Save Database
```

---

## Validation

Checks:

- Required fields
- Valid formats
- Missing information

---

## Duplicate Detection

Compare:

- Business Name
- Phone
- Website

---

## Lead Scoring

Score:

0–100

---

## Priority

Green

Yellow

Red

---

## Acceptance Criteria

- Every lead processed.
- Invalid leads rejected.
- Duplicate detection accurate.
- Score generated.

---

# 21.5 Projects

## Purpose

Projects represent successful conversions from leads.

---

## Responsibilities

- Create Project
- Update Project
- Close Project
- Archive Project

---

## Project Information

```
Project Name

Client

Budget

Start Date

Status

Linked Lead

Notes
```

---

## Business Rules

One lead may create only one project.

---

## Acceptance Criteria

Project maintains history of original lead.

---

# 21.6 Search Engine

## Purpose

Enable users to find information instantly.

---

## Searchable Fields

- Business Name
- Phone
- Email
- Website
- Address
- Category
- Notes
- Tags

---

## Search Behavior

Supports:

- Partial Match
- Instant Search
- Case Insensitive

---

## Acceptance Criteria

Results appear within 300 milliseconds.

---

# 21.7 Filters

Available Filters

- Category
- Source
- Status
- Priority
- Score
- Import Date

---

Multiple filters may be combined.

---

# 21.8 Export

Supported Formats

- CSV
- JSON

Future

- Excel
- PDF

---

Export Options

- Entire Database
- Selected Leads
- Current Search
- Current Filter

---

# 21.9 Settings

Available Settings

General

Categories

Theme

Backups

Extension

Database

Scoring Rules

Preferences

---

# 21.10 Categories

Users may create unlimited categories.

Example

```
Dentists

Lawyers

Restaurants

Real Estate

Marketing

Construction
```

Categories are fully customizable.

---

# 21.11 Notes

Every lead supports unlimited notes.

Example

```
Client requested website redesign.

Follow up next Monday.

Interested in SEO package.
```

---

# 21.12 Tags

Tags provide lightweight organization.

Examples

```
Hot Lead

Cold Lead

High Budget

Local Business

Referral
```

---

# 21.13 Notifications

Atlas provides non-intrusive desktop notifications for:

- Import Completed
- Backup Completed
- Duplicate Detected
- Validation Failed
- Export Completed

---

# 22. Feature Dependency Matrix

| Feature | Depends On |
|----------|------------|
| Dashboard | Database |
| Rule Engine | Lead Manager |
| Projects | Lead Manager |
| Search | Database |
| Export | Database |
| Categories | Lead Manager |
| Browser Extension | Desktop Receiver |
| Settings | Database |

---

# Chapter 5 Summary

This chapter specifies the behavior of every major feature in Project Atlas Version 1.

These specifications define how users interact with the application and how each feature behaves under normal operating conditions.

Future documents, including the Software Requirements Specification (SRS), will expand these feature descriptions into detailed technical implementations.\

---

# 23. User Stories

## Overview

This chapter defines how different users interact with Project Atlas.

All user stories follow the standard format:

> **As a [User], I want [Action], so that [Benefit].**

These stories become the foundation for sprint planning, UI design, testing, and implementation.

---

# Epic 1 – Installation & Setup

---

## US-001

**As a new user, I want to install Atlas on my computer so that I can begin collecting leads.**

### Acceptance Criteria

- Desktop application installs successfully.
- Browser extension installs successfully.
- Application launches without errors.
- Local database is created automatically.

Priority: Critical

---

## US-002

**As a user, I want to connect my browser extension with Atlas Desktop so that imported leads appear automatically.**

### Acceptance Criteria

- Extension detects running desktop application.
- Connection status is visible.
- Failed connections display meaningful errors.

Priority: Critical

---

# Epic 2 – Lead Collection

---

## US-003

**As a user, I want Atlas to recognize supported websites so that I don't have to manually import data.**

Acceptance Criteria

- Google Maps detected.
- Google Search detected.
- Company Websites detected.
- Unsupported websites ignored.

Priority: Critical

---

## US-004

**As a user, I want Atlas to ask before importing leads so that I remain in control of my data.**

Acceptance Criteria

- Prompt always appears.
- Import never starts automatically.
- User may cancel.

Priority: Critical

---

## US-005

**As a user, I want Atlas to extract business information so that I don't need to copy everything manually.**

Acceptance Criteria

Extract:

- Business Name
- Phone
- Website
- Address
- Email (if available)
- Source

Priority: Critical

---

# Epic 3 – Lead Processing

---

## US-006

**As a user, I want Atlas to validate imported leads so that poor-quality data is rejected.**

Acceptance Criteria

- Required fields checked.
- Invalid leads rejected.
- Validation errors logged.

---

## US-007

**As a user, I want Atlas to detect duplicate businesses so that my database remains clean.**

Acceptance Criteria

Duplicate comparison uses:

- Business Name
- Website
- Phone Number

---

## US-008

**As a user, I want Atlas to automatically score leads so that I know which businesses deserve immediate attention.**

Acceptance Criteria

- Score generated.
- Score visible.
- Priority color assigned.

---

# Epic 4 – Lead Management

---

## US-009

**As a user, I want to edit lead information so that I can correct inaccurate data.**

Acceptance Criteria

- Every editable field updates.
- Changes saved immediately.

---

## US-010

**As a user, I want to archive old leads instead of deleting them permanently.**

Acceptance Criteria

- Lead disappears from active list.
- Lead appears in archive.
- Restore supported.

---

## US-011

**As a user, I want to add notes to leads so that I can remember important conversations.**

Acceptance Criteria

- Unlimited notes.
- Timestamp stored.
- Notes searchable.

---

## US-012

**As a user, I want to assign categories to leads so that similar businesses stay organized.**

Acceptance Criteria

- Custom categories supported.
- Categories editable.
- Colors supported.

---

# Epic 5 – Dashboard

---

## US-013

**As a user, I want to see my entire business pipeline from one dashboard so that I know where to focus my work.**

Acceptance Criteria

Dashboard displays:

- Total Leads
- New Leads
- Projects
- Recent Activity
- Priority Summary

---

## US-014

**As a user, I want dashboard widgets to update automatically so that I always see current information.**

Acceptance Criteria

Widgets refresh after:

- Import
- Edit
- Delete
- Project Conversion

---

# Epic 6 – Search & Filters

---

## US-015

**As a user, I want instant search so that I can find businesses quickly.**

Acceptance Criteria

Search by:

- Name
- Website
- Email
- Phone
- Tags
- Notes

---

## US-016

**As a user, I want multiple filters so that I can narrow down large lead lists.**

Acceptance Criteria

Filters combine correctly.

---

# Epic 7 – Projects

---

## US-017

**As a user, I want to convert a lead into a project so that I can track successful business opportunities.**

Acceptance Criteria

- Lead linked.
- History preserved.
- Dashboard updated.

---

## US-018

**As a user, I want projects to remain connected with their original lead so that I can review previous conversations.**

Acceptance Criteria

Original lead visible.

---

# Epic 8 – Export

---

## US-019

**As a user, I want to export selected leads so that I can share them or import them elsewhere.**

Acceptance Criteria

Formats:

- CSV
- JSON

---

## US-020

**As a user, I want export to respect filters so that only relevant data is exported.**

Acceptance Criteria

Current filters applied.

---

# Epic 9 – Settings

---

## US-021

**As a user, I want to customize categories and scoring so that Atlas matches my workflow.**

Acceptance Criteria

Changes persist after restart.

---

## US-022

**As a user, I want to back up my database so that I never lose important information.**

Acceptance Criteria

Backup created.

Restore works.

---

# 24. MVP Definition

Version 1 focuses on delivering a stable offline-first lead management platform.

## MVP Includes

### Browser Extension

- Google Maps
- Google Search
- Company Websites

---

### Desktop Application

- Dashboard
- Lead Manager
- Rule Engine
- Search
- Filters
- Projects
- Export
- Categories
- Notes
- Tags
- Settings

---

### Database

SQLite

---

### Lead Scoring

Rule-based

No AI

---

### Offline Support

Complete

---

# MVP Excludes

The following are intentionally postponed.

## Social Platforms

- LinkedIn
- Facebook
- Instagram

---

## Cloud

- User Accounts
- Cloud Backup
- Synchronization

---

## AI

- AI Lead Scoring
- AI Email Generation
- AI Suggestions

---

## Teams

- Shared Workspace
- User Permissions
- Collaboration

---

# 25. Product Success Metrics

Atlas Version 1 will be considered successful if the following metrics are achieved.

## Import Speed

100 leads

Less than 5 seconds

---

## Dashboard

Loads

Less than 2 seconds

---

## Search

Less than 300 milliseconds

---

## Duplicate Detection

Accuracy

95%

---

## Lead Scoring

100%

Every imported lead receives a score.

---

## Offline Capability

Application remains fully usable without internet after installation.

---

# 26. Risks & Assumptions

## Risks

- Website structure changes may affect extraction.
- Large datasets may impact performance.
- Users may create inconsistent categories.

---

## Assumptions

- Users browse supported websites manually.
- Imported information is publicly available.
- Local device has sufficient storage.
- SQLite is adequate for Version 1.

---

# Chapter 6 Summary

This chapter transforms business requirements into actionable development stories.

The user stories defined here provide a direct bridge between product management and software development. They are intended to become sprint tasks, GitHub issues, and implementation tickets during development.

---

---

# 27. Acceptance Criteria Matrix

## Overview

This matrix defines the minimum conditions that must be satisfied before Version 1 of Project Atlas can be considered complete.

Each feature must pass all associated acceptance criteria before release.

---

## Browser Extension

| Feature | Acceptance Criteria |
|----------|---------------------|
| Website Detection | Detects Google Maps, Google Search, and supported company websites |
| Import Prompt | Always asks for user confirmation before importing |
| Data Extraction | Extracts all supported public fields accurately |
| Communication | Successfully sends lead data to Desktop Application |
| Error Handling | Displays user-friendly messages when extraction fails |

---

## Lead Manager

| Feature | Acceptance Criteria |
|----------|---------------------|
| Create Lead | Lead stored successfully |
| Edit Lead | Updates saved instantly |
| Delete Lead | Confirmation required |
| Archive | Archived leads hidden from active view |
| Restore | Archived lead restored successfully |
| Notes | Unlimited notes supported |
| Tags | Multiple tags supported |

---

## Rule Engine

| Feature | Acceptance Criteria |
|----------|---------------------|
| Validation | Invalid leads rejected |
| Normalization | Fields standardized |
| Duplicate Detection | Duplicates detected with >95% accuracy |
| Scoring | Every lead receives a score |
| Priority | Green, Yellow, Red assigned correctly |

---

## Dashboard

| Feature | Acceptance Criteria |
|----------|---------------------|
| Statistics | Accurate counts |
| Activity Timeline | Updates automatically |
| Widgets | Clickable navigation |
| Performance | Loads in under 2 seconds |

---

## Search

| Feature | Acceptance Criteria |
|----------|---------------------|
| Instant Search | Results under 300ms |
| Partial Matching | Supported |
| Case Insensitive | Supported |
| Multi-field Search | Supported |

---

## Export

| Feature | Acceptance Criteria |
|----------|---------------------|
| CSV | Complete export |
| JSON | Complete export |
| Filtered Export | Supported |

---

# 28. Requirement Traceability Matrix

Every requirement must be traceable from idea to implementation.

| Requirement | Module | Test Case | Sprint |
|-------------|--------|-----------|---------|
| FR-001 | Browser Extension | TC-001 | Sprint 2 |
| FR-021 | Rule Engine | TC-018 | Sprint 4 |
| FR-046 | Lead Scoring | TC-026 | Sprint 5 |
| FR-053 | Dashboard | TC-034 | Sprint 6 |
| FR-060 | Export | TC-041 | Sprint 7 |

---

# 29. Release Strategy

## Internal Alpha

Purpose

Development validation.

Users

Development Team.

Expected Duration

2 Weeks.

Objectives

- Validate architecture.
- Verify module communication.
- Identify critical defects.

---

## Closed Beta

Purpose

Collect real-world feedback.

Users

Selected freelancers and agencies.

Objectives

- Validate workflows.
- Measure performance.
- Improve usability.

---

## Public Release (V1)

Purpose

Commercial release.

Objectives

- Stable desktop application.
- Stable browser extension.
- Offline-first workflow.
- Complete documentation.
- Comprehensive testing.

---

# 30. Future Version Planning

## Version 1.1

Minor Improvements

- Performance optimizations
- Additional export options
- Better search
- Bug fixes

---

## Version 2

Major Features

- LinkedIn Connector
- Facebook Connector
- Instagram Connector
- Cloud Synchronization
- Team Collaboration
- PostgreSQL Support

---

## Version 3

Intelligence Layer

- AI Lead Analysis
- AI Email Drafts
- AI Proposal Generator
- AI Recommendations
- Smart Categorization

---

# 31. Product Constraints

The following constraints apply to Version 1.

## Technical Constraints

- SQLite Database
- Offline-first architecture
- Chromium-based browsers only
- Electron Desktop Application

---

## Business Constraints

- No paid APIs required.
- No cloud dependency.
- No AI dependency.
- User consent required before import.

---

# 32. Glossary

| Term | Definition |
|------|------------|
| Lead | A business opportunity imported into Atlas |
| Project | A converted lead that became a client |
| Rule Engine | Module responsible for validation and scoring |
| Priority | Color assigned based on score |
| Extension | Browser component that collects lead information |
| Dashboard | Main application overview |
| Category | User-defined business grouping |

---

# 33. Appendix A – Supported Sources

Version 1

- Google Maps
- Google Search
- Company Websites

Future

- LinkedIn
- Facebook
- Instagram
- Business Directories
- Yelp
- Bing Places

---

# 34. Appendix B – Lead Lifecycle

```
Discovered

↓

Detected

↓

Imported

↓

Validated

↓

Scored

↓

Qualified

↓

Contacted

↓

Meeting

↓

Proposal

↓

Negotiation

↓

Won

↓

Project

↓

Completed
```

Alternative Path

```
Imported

↓

Rejected

↓

Archived
```

---

# 35. Appendix C – Priority System

```
Score

75–100

↓

🟢 GREEN

High Priority

--------------------------

45–74

↓

🟡 YELLOW

Medium Priority

--------------------------

0–44

↓

🔴 RED

Low Priority
```

---

# 36. Revision History

| Version | Date | Author | Description |
|----------|------|--------|-------------|
| 0.1 | Initial Draft | Project Atlas Team | Document Created |
| 0.5 | Feature Expansion | Project Atlas Team | Added Modules |
| 0.8 | User Stories | Project Atlas Team | Added MVP Definition |
| 1.0 | July 2026 | Project Atlas Team | Initial Release |

---

# 37. Document Approval

| Role | Name | Status |
|------|------|--------|
| Product Owner | Project Atlas Team | Approved |
| Technical Lead | Project Atlas Team | Approved |
| Architecture | Pending | Pending |
| Development | Pending | Pending |

---

# 38. Conclusion

Project Atlas Version 1 is defined as an offline-first Lead Intelligence Platform focused on discovering, organizing, scoring, and managing business opportunities.

This Product Requirements Document establishes the functional and business expectations for the product and serves as the authoritative reference for software architecture, development, testing, and future enhancements.

All subsequent technical documents, including the Software Requirements Specification (SRS), Architecture Specification, Database Design, and Development Standards, shall derive their implementation details from this document.

---

# End of Document
