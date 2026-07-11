# Project Atlas

# Rule Engine Specification

**Version:** 1.0.0

**Status:** Draft

Related Documents

- SRS-001
- Architecture Specification
- Database Design

---

# Table of Contents

1. Introduction
2. Rule Engine Workflow
3. Validation Rules
4. Duplicate Detection
5. Lead Scoring
6. Priority Assignment
7. Category Matching
8. Rule Processing Order
9. Future Improvements

---

# 1. Introduction

## Purpose

The Rule Engine is responsible for processing every imported lead before it is stored in the database.

Its responsibilities include:

- Validate lead information
- Detect duplicates
- Assign categories
- Calculate lead score
- Assign priority level

The Rule Engine is completely deterministic and does not use AI in Version 1.

---

# 2. Rule Engine Workflow

```
Lead Imported

↓

Validation

↓

Duplicate Detection

↓

Category Matching

↓

Lead Scoring

↓

Priority Assignment

↓

Save to Database
```

Every imported lead follows this workflow.

---

# 3. Validation Rules

A lead is considered valid if it contains:

### Required

- Business Name

### At Least One Contact Method

- Phone
- Email
- Website

If these conditions are not met, the lead is rejected.

---

## Data Cleanup

Before storing a lead, Atlas will:

- Remove extra spaces
- Convert URLs to lowercase
- Remove duplicate phone formatting
- Trim empty values

---

# 4. Duplicate Detection

Atlas checks for duplicate leads before saving.

A lead is considered a possible duplicate if:

- Business Name matches
- Website matches
- Phone number matches

If a duplicate is found:

- The user is notified.
- The user can choose to keep the existing lead or save the new one.

---

# 5. Lead Scoring

Every lead receives a score between **0 and 100**.

## Scoring Rules

| Rule | Points |
|-------|--------|
| Business Name Available | 10 |
| Phone Available | 20 |
| Email Available | 20 |
| Website Available | 20 |
| Address Available | 10 |
| Category Assigned | 10 |
| Google Rating Available | 10 |

Maximum Score

```
100 Points
```

---

# 6. Priority Assignment

After scoring, the lead is assigned a priority.

| Score | Priority | Color |
|--------|----------|--------|
| 75 – 100 | High | Green |
| 45 – 74 | Medium | Yellow |
| 0 – 44 | Low | Red |

The priority is calculated automatically and cannot be edited manually.

---

# 7. Category Matching

When a lead is imported, Atlas attempts to assign it to one of the user's categories.

Example:

```
User Categories

↓

Dentists

↓

Imported Business

↓

Smile Dental Clinic

↓

Category Assigned

↓

Dentists
```

If no matching category is found:

- The lead is marked as **Uncategorized**.
- The user can change it later.

---

# 8. Rule Processing Order

Every imported lead follows the same processing order.

```
Import Lead

↓

Validate

↓

Clean Data

↓

Check Duplicate

↓

Assign Category

↓

Calculate Score

↓

Assign Priority

↓

Save Lead
```

This order cannot be changed in Version 1.

---

# 9. Future Improvements

The Rule Engine is designed to support future enhancements, including:

- Custom scoring rules
- User-defined validation rules
- Industry-specific scoring profiles
- CRM integrations
- Optional AI-assisted scoring

These features are planned for future versions and are not part of the Version 1 MVP.

---

# Rule Engine Summary

The Rule Engine ensures that every imported lead is validated, scored, categorized, and prioritized before being stored.

By using deterministic rules instead of AI, Project Atlas provides consistent, transparent, and predictable lead evaluation while remaining fast, offline, and easy to maintain.
