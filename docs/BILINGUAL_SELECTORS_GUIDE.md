# Bilingual Selector Quick Reference

## Language-Agnostic Selector Patterns

This guide provides selector patterns that work in both English and Japanese versions of the SBom application.

---

## Pattern 1: ARIA Labels (Recommended for Icons/Buttons)

**Use Case:** Icons, buttons with images, navigation items

**Advantage:** Completely language-independent

```typescript
// ✅ BEST - Works in any language
refreshButton: {
  type: "button",
  css: 'img[aria-label="sync"]'
}

dashboardMenuItem: {
  type: "menuitem",
  css: '[role="menuitem"]:has([aria-label="dashboard"])'
}
```

**Common ARIA Labels in SBom:**
- `dashboard` - Dashboard icon
- `product` - Projects icon
- `container` - Components icon
- `safety` - Vulnerabilities icon
- `project` - Project/Vulnerability Audit icon
- `one-to-one` - Policy/EOL-EOS icons
- `sync` - Refresh button
- `search` - Search button
- `plus` - Add/Create button
- `insert-row-right` - Column settings
- `global` - Language selector
- `bell` - Notifications

---

## Pattern 2: Dual Text Matching

**Use Case:** Headings, labels, table headers

**Advantage:** Explicit support for both languages

```typescript
// ✅ Works in both EN and JA
filtersHeading: {
  type: "heading",
  css: 'h3:has-text("Filters"), h3:has-text("フィルタ")'
}

exportButton: {
  type: "button",
  css: 'button:has-text("Export"), button:has-text("エクスポート")'
}
```

### Common Translations:

| English | Japanese | Pattern |
|---------|----------|---------|
| Dashboard | ダッシュボード | `'h1:has-text("Dashboard"), h1:has-text("ダッシュボード")'` |
| Projects | プロジェクト | `'h3:has-text("Projects"), h3:has-text("プロジェクト")'` |
| Components | コンポーネント | `'h3:has-text("Components"), h3:has-text("コンポーネント")'` |
| Vulnerabilities | 脆弱性 | `'h3:has-text("Vulnerabilities"), h3:has-text("脆弱性")'` |
| Filters | フィルタ | `'h3:has-text("Filters"), h3:has-text("フィルタ")'` |
| Search | 検索 | `'button:has-text("Search"), button:has-text("検索")'` |
| Export | エクスポート | `'button:has-text("Export"), button:has-text("エクスポート")'` |
| Create | 作成 | `'button:has-text("Create"), button:has-text("作成")'` |
| Clear All | すべてクリア | `'button:has-text("Clear All"), button:has-text("すべてクリア")'` |
| Severity | 重大度 | `'h5:has-text("Severity"), h5:has-text("重大度")'` |
| Summary | 概要 | `'h3:has-text("Summary"), h3:has-text("概要")'` |
| No data | データなし | `'img[aria-label="No data"], img[aria-label="データなし"]'` |

### Table Headers:

| English | Japanese | Pattern |
|---------|----------|---------|
| Name | 名前 | `'[role="columnheader"]:has-text("Name"), [role="columnheader"]:has-text("名前")'` |
| Version | バージョン | `'[role="columnheader"]:has-text("Version"), [role="columnheader"]:has-text("バージョン")'` |
| Source | ソース | `'[role="columnheader"]:has-text("Source"), [role="columnheader"]:has-text("ソース")'` |
| License | ライセンス | `'[role="columnheader"]:has-text("License"), [role="columnheader"]:has-text("ライセンス")'` |
| Risk Score | リスクスコア | `'[role="columnheader"]:has-text("Risk Score"), [role="columnheader"]:has-text("リスクスコア")'` |
| Published date | 公開日 | `'[role="columnheader"]:has-text("Published date"), [role="columnheader"]:has-text("公開日")'` |
| EOL Date | EOL日付 | `'[role="columnheader"]:has-text("EOL Date"), [role="columnheader"]:has-text("EOL日付")'` |
| EOS Date | EOS日付 | `'[role="columnheader"]:has-text("EOS Date"), [role="columnheader"]:has-text("EOS日付")'` |
| Component | コンポーネント | `'[role="columnheader"]:has-text("Component"), [role="columnheader"]:has-text("コンポーネント")'` |
| Project Name | プロジェクト名 | `'[role="columnheader"]:has-text("Project Name"), [role="columnheader"]:has-text("プロジェクト名")'` |

---

## Pattern 3: Form Attributes

**Use Case:** Input fields, form elements

**Advantage:** HTML attributes don't change with language

```typescript
// ✅ Uses 'name' attribute - language-independent
usernameInput: {
  type: "textbox",
  name: "username"
}

passwordInput: {
  type: "textbox",
  name: "password"
}
```

**For placeholders (when no name attribute):**
```typescript
// Supports both languages in placeholder
searchBox: {
  type: "searchbox",
  css: '[placeholder*="Search"], [placeholder*="検索"]'
}

fromDate: {
  type: "textbox",
  css: 'input[placeholder*="From"], input[placeholder*="から"]'
}
```

---

## Pattern 4: ARIA Roles

**Use Case:** Semantic HTML elements

**Advantage:** Roles are language-independent

```typescript
// ✅ Role-based - works in any language
searchBox: {
  type: "searchbox",
  css: '[role="searchbox"]'
}

combobox: {
  type: "combobox",
  css: '[role="combobox"]'
}

dataTable: {
  type: "grid",
  css: '[role="table"], table'
}
```

**Common Roles:**
- `menuitem` - Navigation menu items
- `searchbox` - Search inputs
- `combobox` - Dropdown selectors
- `checkbox` - Checkboxes
- `tab` - Tab controls
- `tabpanel` - Tab content
- `columnheader` - Table column headers
- `button` - Buttons
- `link` - Links

---

## Pattern 5: Structural Selectors (Position-based)

**Use Case:** When elements have consistent position but different text

**Advantage:** Independent of text content

```typescript
// ✅ Position-based - language-independent
projectsAtRiskHeading: {
  type: "heading",
  css: "main > div:first-child > div > div:nth-of-type(1) h3"
}

componentsAtRiskHeading: {
  type: "heading",
  css: "main > div:first-child > div > div:nth-of-type(2) h3"
}

totalRiskScoreHeading: {
  type: "heading",
  css: "main > div:first-child > div > div:nth-of-type(3) h3"
}
```

**Use with caution:** These are fragile if UI structure changes.

---

## Pattern 6: Combining Patterns

**Use Case:** Complex elements requiring multiple criteria

```typescript
// ✅ Combines aria-label + text
createProjectButton: {
  type: "button",
  css: 'button:has([aria-label="plus"]):has-text("Create"), button:has([aria-label="plus"]):has-text("作成")'
}

// ✅ Combines role + text
vulnerabilitiesMenuItem: {
  type: "menuitem",
  css: '[role="menuitem"]:has([aria-label="safety"])'  // Aria-label only, more stable
}
```

---

## Anti-Patterns (Avoid)

### ❌ Text-only selectors (breaks in other language)
```typescript
// BAD - Only works in English
exportButton: {
  type: "button",
  css: 'button:has-text("Export")'  // Breaks in Japanese!
}
```

### ❌ Hardcoded English labels
```typescript
// BAD - Assumes English
searchButton: {
  type: "button",
  name: "Search"  // Text might be "検索" in Japanese
}
```

### ❌ XPath with text conditions
```typescript
// BAD - Language-specific
vulnerabilitiesMenuItem: {
  type: "menuitem",
  xpath: "//li[contains(., 'Vulnerabilities')]"  // Only English
}
```

---

## Best Practices

### 1. Prefer ARIA labels for icons/images
```typescript
✅ css: 'img[aria-label="sync"]'
❌ css: 'button:has-text("Refresh")'
```

### 2. Use dual text for headings/buttons
```typescript
✅ css: 'h3:has-text("Filters"), h3:has-text("フィルタ")'
❌ css: 'h3:has-text("Filters")'
```

### 3. Use HTML attributes when available
```typescript
✅ name: "username"
❌ css: 'input[placeholder="Username"]'
```

### 4. Combine patterns for robustness
```typescript
✅ css: 'button:has([aria-label="plus"]):has-text("Create"), button:has([aria-label="plus"]):has-text("作成")'
```

### 5. Test in both languages
```typescript
// Always verify selectors work in:
// - English (EN)
// - Japanese (JA)
```

---

## Testing Bilingual Selectors

### Manual Verification
```typescript
// 1. Login to app
// 2. Switch language to Japanese
// 3. Run same test
// 4. Verify all selectors still work
```

### Automated Testing
```typescript
test("should work in both languages", async ({ page }) => {
  // Test in English
  await loginPage.login("user", "pass");
  await dashboardPage.expectControl(dashboardPage.items.summaryHeading).toBeVisible();
  
  // Switch to Japanese
  await dashboardPage.switchLanguage("JA");
  
  // Same test in Japanese
  await dashboardPage.expectControl(dashboardPage.items.summaryHeading).toBeVisible();
});
```

---

## Selector Priority

When choosing a selector strategy, follow this priority:

1. **ARIA Labels** (aria-label, aria-labelledby) - Best for icons
2. **HTML Attributes** (name, id, data-testid) - Best for inputs
3. **ARIA Roles** (role="button", role="searchbox") - Good for semantic elements
4. **Dual Text** (both EN + JA) - For text elements
5. **Structural** (nth-of-type, position) - Last resort

---

## Common Pitfalls

### Pitfall 1: Assuming text won't change
```typescript
// ❌ Problem
css: 'button:has-text("Submit")'

// ✅ Solution
css: 'button:has-text("Submit"), button:has-text("送信")'
```

### Pitfall 2: Forgetting partial matches
```typescript
// ❌ Problem - Exact match required
css: '[placeholder="Search by CVE ID..."]'

// ✅ Solution - Partial match
css: '[placeholder*="Search"], [placeholder*="検索"]'
```

### Pitfall 3: Over-relying on structure
```typescript
// ❌ Problem - Fragile
css: 'div > div > div:nth-child(3) > button'

// ✅ Solution - Semantic + text
css: 'button:has-text("Export"), button:has-text("エクスポート")'
```

---

## Quick Reference Cheat Sheet

```typescript
// Navigation (icon-based)
'[role="menuitem"]:has([aria-label="dashboard"])'
'[role="menuitem"]:has([aria-label="product"])'
'[role="menuitem"]:has([aria-label="container"])'
'[role="menuitem"]:has([aria-label="safety"])'

// Actions (dual text)
'button:has-text("Search"), button:has-text("検索")'
'button:has-text("Export"), button:has-text("エクスポート")'
'button:has-text("Create"), button:has-text("作成")'
'button:has-text("Clear All"), button:has-text("すべてクリア")'

// Icons (aria-label)
'img[aria-label="sync"]'  // Refresh
'img[aria-label="search"]'  // Search
'img[aria-label="plus"]'  // Add/Create

// Inputs (attributes)
'input[name="username"]'
'input[name="password"]'
'[role="searchbox"]'
'[role="combobox"]'

// Tables (dual text)
'[role="columnheader"]:has-text("Name"), [role="columnheader"]:has-text("名前")'
'[role="columnheader"]:has-text("Version"), [role="columnheader"]:has-text("バージョン")'
```

---

**Remember:** Always verify selectors in both EN and JA before committing!
