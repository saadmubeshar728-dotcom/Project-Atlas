# Project Atlas

# Browser Extension Specification

**Version:** 1.0.0

**Status:** Draft

Related Documents

- SRS-001
- Architecture Specification

---

# Table of Contents

1. Introduction
2. Purpose
3. Supported Websites
4. Workflow
5. Data Collection
6. Communication
7. Permissions
8. Future Scope

---

# 1. Introduction

The Atlas Browser Extension helps users collect business leads while browsing supported websites.

The extension only works after the user gives permission to import the detected leads.

Version 1 focuses on collecting publicly available business information.

---

# 2. Purpose

The extension is responsible for:

- Detecting supported pages
- Reading publicly available business information
- Asking the user for confirmation
- Sending approved leads to the Atlas Desktop Application

The extension does **not** store any data locally.

---

# 3. Supported Websites

Version 1 supports:

- Google Maps
- Google Search
- Company Websites

Future versions will support:

- LinkedIn
- Facebook
- Instagram

---

# 4. Workflow

```
User Browses

↓

Extension Detects Business

↓

"Do you want to import this lead?"

↓

User Clicks Yes

↓

Lead Sent To Desktop Application

↓

Desktop Processes Lead
```

If the user selects **No**, nothing is imported.

---

# 5. Data Collection

The extension attempts to collect the following information:

- Business Name
- Phone Number
- Email Address (if available)
- Website
- Address
- Category
- Google Rating (if available)

The extension only collects information visible on the current page.

---

# 6. Communication

The extension sends the collected lead to the Atlas Desktop Application.

The desktop application is responsible for:

- Validation
- Duplicate Detection
- Lead Scoring
- Saving to the database

The extension performs no business logic.

---

# 7. Permissions

The extension requires permission to:

- Read supported web pages
- Display confirmation popups
- Communicate with the desktop application

The extension does not:

- Automatically import leads
- Run background scraping
- Collect data without user approval

---

# 8. Future Scope

Future versions may include:

- LinkedIn support
- Facebook support
- Instagram support
- Batch lead imports
- Additional business directories

---

# Summary

The Atlas Browser Extension is a lightweight companion to the desktop application.

Its only responsibility is to collect publicly available business information with user approval and send it to the desktop application for processing.
