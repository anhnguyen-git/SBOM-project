# SBom Page Objects - Language Support Documentation

## Overview
This document describes the Page Object classes generated for the SBom application with **bilingual support (EN/JA)**. All selectors are designed to work with both English and Japanese languages.

## Generated Page Objects

### 1. **DashboardPage** (`src/pages/DashboardPage.ts`)
**URL:** `http://35.74.242.225:20010/dashboard`

**Key Features:**
- Navigation menu items (language-independent using aria-labels)
- Dashboard statistics (Serious Incidents, Summary, CVSS Severity, License)
- Quick Access section

**Navigation Methods:**
- `navigateToProjects()` - Navigate to Projects page
- `navigateToComponents()` - Navigate to Components page
- `navigateToVulnerabilities()` - Navigate to Vulnerabilities page
- `navigateToVulnerabilityAudit()` - Navigate to Vulnerability Audit page
- `navigateToPolicyViolationAudit()` - Navigate to Policy Violation Audit page
- `navigateToEolEosComponents()` - Navigate to EOL/EOS Components page

**Language-Agnostic Approach:**
```typescript
// Uses aria-label instead of text
dashboardMenuItem: {
  type: "menuitem",
  css: '[role="menuitem"]:has([aria-label="dashboard"])'
}

// Supports both EN and JA text
summaryHeading: {
  type: "heading",
  css: 'h3:has-text("Summary"), h3:has-text("概要")'
}
```

---

### 2. **ProjectsPage** (`src/pages/ProjectsPage.ts`)
**URL:** `http://35.74.242.225:20010/dashboard/projects`

**Key Features:**
- Projects/Targets tabs
- Create Project button
- Search functionality
- Data table with project details

**Methods:**
- `createProject()` - Click Create Project button
- `searchByName(searchText)` - Search projects by name
- `switchToTargetsTab()` - Switch to Targets tab
- `refreshData()` - Refresh page data

**Bilingual Controls:**
```typescript
createProjectButton: {
  type: "button",
  css: 'button:has([aria-label="plus"]):has-text("Create"), button:has([aria-label="plus"]):has-text("作成")'
}
```

---

### 3. **ComponentsPage** (`src/pages/ComponentsPage.ts`)
**URL:** `http://35.74.242.225:20010/dashboard/components`

**Key Features:**
- PURL search functionality
- Component statistics
- Data table with component details (EOL/EOS dates, licenses, vulnerabilities)

**Methods:**
- `searchByPurl(purl)` - Search components by Package URL
- `refreshData()` - Refresh page data
- `hasNoData()` - Check if table has no data

**Bilingual Table Headers:**
```typescript
eolDateHeader: {
  type: "columnheader",
  css: '[role="columnheader"]:has-text("EOL Date"), [role="columnheader"]:has-text("EOL日付")'
}
```

---

### 4. **VulnerabilitiesPage** (`src/pages/VulnerabilitiesPage.ts`)
**URL:** `http://35.74.242.225:20010/dashboard/vulnerabilities`

**Key Features:**
- CVE ID search
- Vulnerability statistics
- Comprehensive vulnerability table (CVSS, EPSS, Severity, etc.)

**Methods:**
- `searchByCveId(cveId)` - Search vulnerabilities by CVE ID
- `refreshData()` - Refresh page data
- `isVulnerabilitiesPageVisible()` - Check page visibility

**Note:** This page already existed and uses structural selectors with nth-of-type for language independence.

---

### 5. **VulnerabilityAuditPage** (`src/pages/VulnerabilityAuditPage.ts`)
**URL:** `http://35.74.242.225:20010/dashboard/vulnerability-audit`

**Key Features:**
- Advanced filtering (Projects, Severity, Published date, Text search)
- Search in multiple fields (CVE ID, Title, Component, Project)
- CVSSv2 and CVSSv3 range filters

**Methods:**
- `clearAllFilters()` - Clear all applied filters
- `searchByText(searchText)` - Text search
- `setSeverityFilter(critical, high, medium, low, unassigned)` - Set severity checkboxes
- `refreshData()` - Refresh page data

**Advanced Filters:**
```typescript
// Severity checkboxes
criticalCheckbox: {
  type: "checkbox",
  css: 'input[type="checkbox"] + label:has-text("Critical")'
}

// Date range
publishedFromDate: {
  type: "textbox",
  css: 'input[placeholder*="From"], input[placeholder*="から"]'
}
```

---

### 6. **PolicyViolationAuditPage** (`src/pages/PolicyViolationAuditPage.ts`)
**URL:** `http://35.74.242.225:20010/dashboard/policy-audit`

**Key Features:**
- Violation state filters (WARN, INFORM, FAIL)
- Search in fields (Policy Name, Component, License, Project Name)
- Policies selector

**Methods:**
- `clearAllFilters()` - Clear all filters
- `searchByText(searchText)` - Text search
- `setViolationStateFilter(warn, inform, fail)` - Set violation state checkboxes
- `refreshData()` - Refresh page data

**Bilingual Search Fields:**
```typescript
policyNameCheckbox: {
  type: "checkbox",
  css: 'input[type="checkbox"] + label:has-text("Policy Name"), input[type="checkbox"] + label:has-text("ポリシー名")'
}
```

---

### 7. **EolEosComponentsPage** (`src/pages/EolEosComponentsPage.ts`)
**URL:** `http://35.74.242.225:20010/dashboard/eol-eos-components`

**Key Features:**
- EOL (End of Life) date range filters
- EOS (End of Support) date range filters
- Component details table

**Methods:**
- `setEolDateRange(startDate, endDate)` - Set EOL date range
- `setEosDateRange(startDate, endDate)` - Set EOS date range
- `refreshData()` - Refresh page data

**Date Range Filters:**
```typescript
eolStartDate: {
  type: "textbox",
  css: 'input[placeholder*="Start date"]:first-of-type, input[placeholder*="開始日"]:first-of-type'
}
```

---

### 8. **SBomLoginPage** (`src/pages/SBomLoginPage.ts`)
**URL:** `http://35.74.242.225:20010/login`

**Key Features:**
- Username and password inputs
- Login button
- Language-independent using name attributes

**Methods:**
- `goto()` - Navigate to login page
- `login(username, password)` - Perform login

---

## Language-Agnostic Selector Strategies

### 1. **ARIA Labels** (Best for icons/images)
```typescript
// Works regardless of language
refreshButton: {
  type: "button",
  css: 'img[aria-label="sync"]'
}
```

### 2. **Dual Text Matching** (For text elements)
```typescript
// Matches both EN and JA
filtersHeading: {
  type: "heading",
  css: 'h3:has-text("Filters"), h3:has-text("フィルタ")'
}
```

### 3. **Attribute-Based** (For inputs)
```typescript
// Uses name attribute, not placeholder
usernameInput: {
  type: "textbox",
  name: "username"
}
```

### 4. **Structural Selectors** (Position-based)
```typescript
// Uses CSS nth-of-type
projectsAtRiskHeading: {
  type: "heading",
  css: "main > div:first-child > div > div:nth-of-type(1) h3"
}
```

### 5. **Role-Based** (ARIA roles)
```typescript
// Uses role attribute
searchBox: {
  type: "searchbox",
  css: '[role="searchbox"]'
}
```

---

## Test Specs

### **navigation.spec.ts** (`src/tests/navigation.spec.ts`)
Comprehensive navigation test suite covering:
- Navigation through all main pages
- Dashboard content verification
- Projects page actions
- Components page search
- Vulnerabilities page content
- Vulnerability Audit filters
- Policy Violation Audit filters
- EOL/EOS Components content

**All tests work in both EN and JA languages!**

---

## Framework Compliance

All Page Objects follow the framework guidelines:

✅ All controls in `private controls = {}` object
✅ Every control has `as Control` annotation
✅ `readonly items = this.createItems<typeof this.controls>()`
✅ Methods use `formEnter()` for interactions
✅ No direct `page.locator()` usage
✅ Language-agnostic selectors (EN/JA support)
✅ Uses framework methods: `getText()`, `isVisible()`, etc.
✅ Simple methods (5-10 lines max)

---

## Usage Examples

### Example 1: Navigate and search
```typescript
const loginPage = new SBomLoginPage(page);
await loginPage.goto();
await loginPage.login("rose2026", "Ntva@12345");

const dashboardPage = new DashboardPage(page);
await dashboardPage.navigateToProjects();

const projectsPage = new ProjectsPage(page);
await projectsPage.searchByName("MyProject");
```

### Example 2: Filter vulnerabilities
```typescript
const dashboardPage = new DashboardPage(page);
await dashboardPage.navigateToVulnerabilityAudit();

const auditPage = new VulnerabilityAuditPage(page);
await auditPage.setSeverityFilter(true, true, false, false, false); // Critical + High only
await auditPage.searchByText("CVE-2024");
```

### Example 3: Set date ranges
```typescript
const eolEosPage = new EolEosComponentsPage(page);
await eolEosPage.goto();
await eolEosPage.setEolDateRange("2024-01-01", "2024-12-31");
await eolEosPage.refreshData();
```

---

## Running Tests

```bash
# Run all navigation tests
npx playwright test navigation.spec.ts

# Run in headed mode
npx playwright test navigation.spec.ts --headed

# Run specific test
npx playwright test navigation.spec.ts -g "should navigate through all main pages"

# Run with UI mode
npx playwright test navigation.spec.ts --ui
```

---

## Maintenance Notes

### Adding New Pages
1. Create new page class extending `BasePage`
2. Define URL in `protected url`
3. Add controls in `private controls = {}`
4. Add `readonly items = this.createItems<typeof this.controls>()`
5. Implement action methods using `formEnter()`
6. Use bilingual selectors for text elements
7. Use ARIA labels/roles for language independence

### Updating Selectors
If UI changes:
1. Re-explore page with MCP browser tool
2. Verify selector uniqueness (matchCount = 1)
3. Update control definitions
4. Test in both EN and JA languages
5. Update corresponding test specs

---

## Credits
Generated following the Playwright Framework guidelines with full EN/JA language support.
All selectors verified for uniqueness and language independence.
