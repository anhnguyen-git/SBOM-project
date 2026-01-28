# ARIA Label Usage for Test Automation

## Current Status: Good Use of ARIA Labels

### ✅ Already Using ARIA Labels (Language-Independent)

These controls are already using aria-label and work perfectly across EN/JA:

#### Icons & Image Buttons
- **Logo**: `img[aria-label="Logo"]`
- **Global Button**: `button:has([aria-label="global"])`
- **Notification Bell**: `[aria-label="bell"]`
- **Refresh/Sync Button**: `img[aria-label="sync"]`
- **Column Settings**: `img[aria-label="insert-row-right"]`
- **Search Icon Button**: `button:has([aria-label="search"])`
- **Plus Icon (Create)**: `button:has([aria-label="plus"])`

**Status**: ✅ Working perfectly - No changes needed

---

## 🔄 Currently Using Dual Text Selectors

These controls use dual selectors (EN + JA text) because they don't have aria-labels:

### Buttons with Text
```typescript
// Search Button
css: 'button:has-text("Search"), button:has-text("検索")'

// Export Button  
css: 'button:has-text("Export"), button:has-text("エクスポート")'

// Clear All Button
css: 'button:has-text("Clear All"), button:has-text("すべてクリア")'
```

### Headings
```typescript
css: 'h3:has-text("Serious Incidents"), h3:has-text("重大インシデント")'
css: 'h3:has-text("Projects at Risk"), h3:has-text("リスクのあるプロジェクト")'
css: 'h3:has-text("Summary"), h3:has-text("概要")'
```

### Tabs
```typescript
css: '[role="tab"]:has-text("Projects"), [role="tab"]:has-text("プロジェクト")'
css: '[role="tab"]:has-text("Targets"), [role="tab"]:has-text("ターゲット")'
```

**Status**: ✅ Working but verbose - Could be improved with aria-labels

---

## 📋 Request from Development Team

To improve test stability and accessibility, request developers add `aria-label` or `data-testid` to these elements:

### High Priority (Interactive Elements)

#### 1. Text Buttons
```html
<!-- Current -->
<button>Search</button>
<button>検索</button>

<!-- Recommended -->
<button aria-label="search">Search</button>
<button aria-label="search">検索</button>

<!-- OR -->
<button data-testid="search-button">Search</button>
<button data-testid="search-button">検索</button>
```

**Elements needing this:**
- Search buttons
- Export buttons
- Clear All buttons
- Create Project buttons
- Language selector buttons

#### 2. Input Fields
```html
<!-- Current -->
<input placeholder="Search" />
<input placeholder="検索" />

<!-- Recommended -->
<input aria-label="text-search" placeholder="Search" />
<input aria-label="text-search" placeholder="検索" />

<!-- OR -->
<input data-testid="text-search-input" placeholder="Search" />
<input data-testid="text-search-input" placeholder="検索" />
```

**Elements needing this:**
- Search inputs
- Date pickers (From/To)
- PURL search textbox

#### 3. Tabs
```html
<!-- Current -->
<div role="tab">Projects</div>
<div role="tab">プロジェクト</div>

<!-- Recommended -->
<div role="tab" aria-label="projects-tab">Projects</div>
<div role="tab" aria-label="projects-tab">プロジェクト</div>

<!-- OR -->
<div role="tab" data-testid="projects-tab">Projects</div>
<div role="tab" data-testid="projects-tab">プロジェクト</div>
```

### Medium Priority (Structural Elements)

#### 4. Headings
```html
<!-- Current -->
<h3>Summary</h3>
<h3>概要</h3>

<!-- Recommended -->
<h3 aria-label="summary-section">Summary</h3>
<h3 aria-label="summary-section">概要</h3>
```

**Note**: Headings are lower priority since they rarely change and dual selectors work fine.

---

## 📊 Benefits of ARIA Labels

### For Test Automation
1. **Language Independence**: Same selector works for all languages
2. **Stability**: Won't break when text content changes
3. **Cleaner Code**: Simpler, more readable selectors
4. **Maintainability**: Less duplication, easier updates

### For Accessibility
1. **Screen Reader Support**: Better experience for visually impaired users
2. **Keyboard Navigation**: Improved focus management
3. **WCAG Compliance**: Meets accessibility standards
4. **Semantic Clarity**: Clear purpose of each element

---

## 🎯 Implementation Strategy

### Phase 1: Icons & Interactive Elements (DONE ✅)
Already using aria-labels for all icon buttons and image elements.

### Phase 2: Text Buttons (Recommended)
Request developers add aria-labels to:
- Search buttons
- Export buttons  
- Clear All buttons
- Create/Add buttons

**Estimated effort**: 2-3 hours for development team

### Phase 3: Input Fields (Recommended)
Add aria-labels to:
- Search inputs
- Date pickers
- Comboboxes

**Estimated effort**: 2-3 hours for development team

### Phase 4: Tabs & Headings (Optional)
Add aria-labels to tabs and major section headings.

**Estimated effort**: 1-2 hours for development team

---

## 📝 Example Pull Request Description

```markdown
## Add ARIA Labels for Test Automation & Accessibility

### Changes
- Add `aria-label` attributes to interactive buttons
- Add `aria-label` to input fields
- Add `aria-label` to tabs

### Benefits
1. **Accessibility**: Improves screen reader support (WCAG 2.1 compliance)
2. **Test Automation**: Language-independent selectors
3. **Maintainability**: Stable selectors that don't break with text changes

### Example
Before:
```html
<button>Search</button>
```

After:
```html
<button aria-label="search">Search</button>
```

### Impact
- No visual changes
- No functional changes
- Improves accessibility score
- Enables more stable automated testing
```

---

## 🔍 How to Verify ARIA Labels

Use browser DevTools or Playwright Inspector:

```typescript
// Check if element has aria-label
await page.evaluate(() => {
  const button = document.querySelector('button');
  return button?.getAttribute('aria-label');
});
```

Or use accessibility snapshot in tests:

```typescript
await page.accessibility.snapshot();
// Will show all aria-labels in the tree
```

---

## 📚 Resources

- [ARIA Labels - MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Testing Library Priority](https://testing-library.com/docs/queries/about/#priority)

---

## Summary

**Current Status**: Good foundation with icon buttons using aria-labels  
**Next Step**: Request developers add aria-labels to text buttons and inputs  
**Expected Impact**: 50% reduction in dual selectors, improved accessibility  
**Effort Required**: 5-8 hours total development time across 3 phases
