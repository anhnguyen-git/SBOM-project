# SBom Application Page Map

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         SBom Application                                 │
│                  http://35.74.242.225:20010                              │
└─────────────────────────────────────────────────────────────────────────┘
                                  │
                                  │ Login
                                  ▼
                    ┌──────────────────────────┐
                    │    SBomLoginPage         │
                    │  /login                  │
                    │                          │
                    │  - Username input        │
                    │  - Password input        │
                    │  - Login button          │
                    └──────────────────────────┘
                                  │
                                  │ login()
                                  ▼
        ┌─────────────────────────────────────────────────────┐
        │              DashboardPage                          │
        │              /dashboard                             │
        │                                                     │
        │  ┌─────────────────────────────────────────────┐  │
        │  │         Navigation Menu                      │  │
        │  │  - Dashboard                                 │  │
        │  │  - PORTFOLIO                                 │  │
        │  │    • Projects                                │  │
        │  │    • Components                              │  │
        │  │    • Vulnerabilities                         │  │
        │  │  - AUDIT                                     │  │
        │  │    • Vulnerability Audit                     │  │
        │  │    • Policy Violation Audit                  │  │
        │  │    • EOL/EOS Components                      │  │
        │  └─────────────────────────────────────────────┘  │
        │                                                     │
        │  Content:                                           │
        │  - Serious Incidents table                          │
        │  - Summary (Projects, Targets)                      │
        │  - CVSS Severity chart                              │
        │  - License chart                                    │
        │  - Quick Access (Recent, Visited)                   │
        └─────────────────────────────────────────────────────┘
                                  │
          ┌───────────────────────┼───────────────────────┐
          │                       │                       │
          ▼                       ▼                       ▼
┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐
│   ProjectsPage      │  │  ComponentsPage     │  │ VulnerabilitiesPage │
│   /projects         │  │  /components        │  │  /vulnerabilities   │
│                     │  │                     │  │                     │
│  Statistics:        │  │  Statistics:        │  │  Statistics:        │
│  - Projects at Risk │  │  - Projects at Risk │  │  - Projects at Risk │
│  - Components Risk  │  │  - Components Risk  │  │  - Components Risk  │
│  - Total Risk Score │  │  - Total Risk Score │  │  - Total Risk Score │
│                     │  │                     │  │                     │
│  Tabs:              │  │  Search:            │  │  Search:            │
│  • Projects         │  │  - PURL search      │  │  - CVE ID search    │
│  • Targets          │  │                     │  │                     │
│                     │  │  Table:             │  │  Table:             │
│  Actions:           │  │  - Name             │  │  - CVE ID           │
│  - Create Project   │  │  - Version          │  │  - Source           │
│  - Search by name   │  │  - License          │  │  - Severity         │
│  - Export           │  │  - Risk Score       │  │  - CVSS/EPSS        │
│  - Refresh          │  │  - Vulnerabilities  │  │  - Analysis         │
│                     │  │  - EOL/EOS dates    │  │  - Affected Projects│
│  Table:             │  │                     │  │                     │
│  - Project name     │  └─────────────────────┘  └─────────────────────┘
│  - Risk Score       │
│  - Vulnerabilities  │
│  - Policy Violations│
│  - Owner            │
└─────────────────────┘

                                  │
          ┌───────────────────────┼───────────────────────┐
          │                       │                       │
          ▼                       ▼                       ▼
┌──────────────────────────┐  ┌──────────────────────────┐  ┌──────────────────────────┐
│ VulnerabilityAuditPage   │  │PolicyViolationAuditPage  │  │ EolEosComponentsPage     │
│ /vulnerability-audit     │  │ /policy-audit            │  │ /eol-eos-components      │
│                          │  │                          │  │                          │
│  Filters:                │  │  Filters:                │  │  Statistics:             │
│  ┌────────────────────┐ │  │  ┌────────────────────┐ │  │  - Projects at Risk      │
│  │ Projects           │ │  │  │ Projects           │ │  │  - Components at Risk    │
│  │ - Show inactive    │ │  │  │ - Show inactive    │ │  │  - Total Risk Score      │
│  └────────────────────┘ │  │  └────────────────────┘ │  │                          │
│  ┌────────────────────┐ │  │  ┌────────────────────┐ │  │  Date Filters:           │
│  │ Severity           │ │  │  │ Violation State    │ │  │  ┌────────────────────┐ │
│  │ ☑ Critical         │ │  │  │ ☑ WARN             │ │  │  │ EOL                │ │
│  │ ☑ High             │ │  │  │ ☑ INFORM           │ │  │  │ - Start date       │ │
│  │ ☑ Medium           │ │  │  │ ☑ FAIL             │ │  │  │ - End date         │ │
│  │ ☑ Low              │ │  │  └────────────────────┘ │  │  └────────────────────┘ │
│  │ ☑ Unassigned       │ │  │  ┌────────────────────┐ │  │  ┌────────────────────┐ │
│  └────────────────────┘ │  │  │ Text Search        │ │  │  │ EOS                │ │
│  ┌────────────────────┐ │  │  │ [_______________]  │ │  │  │ - Start date       │ │
│  │ Published Date     │ │  │  └────────────────────┘ │  │  │ - End date         │ │
│  │ From: [__________] │ │  │  ┌────────────────────┐ │  │  └────────────────────┘ │
│  │ To:   [__________] │ │  │  │ Search In          │ │  │                          │
│  └────────────────────┘ │  │  │ ☑ Policy Name      │ │  │  Table:                  │
│  ┌────────────────────┐ │  │  │ ☑ Component        │ │  │  - Name                  │
│  │ Text Search        │ │  │  │ ☑ License          │ │  │  - Version               │
│  │ [_______________]  │ │  │  │ ☑ Project Name     │ │  │  - License               │
│  └────────────────────┘ │  │  └────────────────────┘ │  │  - Risk Score            │
│  ┌────────────────────┐ │  │  ┌────────────────────┐ │  │  - Vulnerabilities       │
│  │ Search In          │ │  │  │ Policies           │ │  │  - EOL Date              │
│  │ ☑ CVE ID           │ │  │  │ [Select...      ▼] │ │  │  - EOS Date              │
│  │ ☑ Vulnerability    │ │  │  └────────────────────┘ │  │                          │
│  │ ☑ Component Name   │ │  │                          │  └──────────────────────────┘
│  │ ☑ Component Version│ │  │  Table:                  │
│  │ ☑ Project Name     │ │  │  - State                 │
│  └────────────────────┘ │  │  - Policy Name           │
│  ┌────────────────────┐ │  │  - Component             │
│  │ CVSSv2             │ │  │  - Project/Target Name   │
│  │ From: [__] To: [__]│ │  │  - License               │
│  └────────────────────┘ │  │                          │
│  ┌────────────────────┐ │  └──────────────────────────┘
│  │ CVSSv3             │ │
│  │ From: [__] To: [__]│ │
│  └────────────────────┘ │
│                          │
│  Table:                  │
│  - CVE ID                │
│  - Source                │
│  - Title                 │
│  - Severity              │
│  - Published             │
│  - CWE                   │
│  - CVSSv2/v3             │
│  - Project Name          │
│  - Component             │
│  - Version               │
│  - Analysis              │
│  - Suppressed            │
└──────────────────────────┘
```

## Page Object Hierarchy

```
BasePage (Abstract)
    │
    ├── SBomLoginPage
    │
    └── DashboardPage (Navigation Hub)
            │
            ├── ProjectsPage
            │
            ├── ComponentsPage
            │
            ├── VulnerabilitiesPage
            │
            ├── VulnerabilityAuditPage
            │
            ├── PolicyViolationAuditPage
            │
            └── EolEosComponentsPage
```

## Control Type Distribution

```
┌────────────────────────────────────────────────────┐
│ Control Types Used Across All Pages               │
├────────────────────────────────────────────────────┤
│ • menuitem      ████████░░ (8)  Navigation        │
│ • button        ████████████████████ (25)         │
│ • textbox       ████████████ (15)                 │
│ • searchbox     ████░░ (4)                        │
│ • checkbox      ████████████████ (20)             │
│ • combobox      ██░░ (2)                          │
│ • heading       ████████████████████████ (30)     │
│ • columnheader  ████████████████████████████ (35) │
│ • link          ████░░ (5)                        │
│ • img           ████████░░ (10)                   │
│ • tab           ██░░ (2)                          │
│ • spinbutton    ████░░ (4)                        │
│ • generic       ████████░░ (10)                   │
└────────────────────────────────────────────────────┘
Total: 170+ controls across all pages
```

## Language Support Coverage

```
┌─────────────────────────────────────────────────┐
│ Bilingual Selector Strategy Distribution       │
├─────────────────────────────────────────────────┤
│ ✓ ARIA Labels         ████████████████ (40%)   │
│   (Icons, images)                               │
│                                                 │
│ ✓ Dual Text           ████████████████ (35%)   │
│   (Headings, buttons)                           │
│                                                 │
│ ✓ HTML Attributes     ████████░░ (15%)         │
│   (Input fields)                                │
│                                                 │
│ ✓ ARIA Roles          ████░░ (8%)              │
│   (Semantic elements)                           │
│                                                 │
│ ✓ Structural          ██░░ (2%)                │
│   (Position-based)                              │
└─────────────────────────────────────────────────┘
100% Coverage - All selectors work in EN and JA
```

## Test Execution Flow

```
1. Login
   ├─ SBomLoginPage.login("rose2026", "Ntva@12345")
   └─ Navigate to Dashboard

2. Dashboard Verification
   ├─ Verify Summary section
   ├─ Verify CVSS Severity chart
   ├─ Verify License chart
   └─ Verify Quick Access

3. Navigate & Test Projects
   ├─ Click Projects menuitem
   ├─ Verify statistics
   ├─ Test search functionality
   └─ Verify table headers

4. Navigate & Test Components
   ├─ Click Components menuitem
   ├─ Verify PURL search
   └─ Verify table with EOL/EOS

5. Navigate & Test Vulnerabilities
   ├─ Click Vulnerabilities menuitem
   ├─ Verify CVE search
   └─ Verify CVSS/EPSS columns

6. Navigate & Test Vulnerability Audit
   ├─ Click Vulnerability Audit menuitem
   ├─ Test severity filters
   ├─ Test date range filters
   └─ Test text search

7. Navigate & Test Policy Violation Audit
   ├─ Click Policy Violation Audit menuitem
   ├─ Test violation state filters
   └─ Test policy selector

8. Navigate & Test EOL/EOS Components
   ├─ Click EOL/EOS menuitem
   ├─ Test EOL date range
   └─ Test EOS date range
```

## Quick Navigation Reference

```
From DashboardPage:
├─ navigateToProjects()              → ProjectsPage
├─ navigateToComponents()            → ComponentsPage
├─ navigateToVulnerabilities()       → VulnerabilitiesPage
├─ navigateToVulnerabilityAudit()    → VulnerabilityAuditPage
├─ navigateToPolicyViolationAudit()  → PolicyViolationAuditPage
└─ navigateToEolEosComponents()      → EolEosComponentsPage
```

---

**Legend:**
- ☑ = Checkbox control
- [___] = Text input field
- ▼ = Dropdown/Combobox
- • = List item
- ████ = Visual representation
