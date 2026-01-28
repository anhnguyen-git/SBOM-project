# POM_Playwright

Playwright TypeScript testing framework for POM_Playwright.

## Setup

This project has been automatically configured with:
- Playwright Test Framework with TypeScript
- HTML and JSON reporters
- Multi-browser testing (Chrome, Firefox, Safari)
- Screenshot and video recording on failure
- Trace collection for debugging
- TypeScript strict mode enabled

## Commands

```bash
# Run all tests
npm test

# Run tests in headed mode (visible browser)
npm run test:headed

# Run tests with UI mode (interactive)
npm run test:ui

# Debug tests
npm run test:debug

# View HTML report
npm run report

# Install browsers (if needed)
npm run install:browsers
```

## Project Structure

```
POM_Playwright/
├── tests/                  # Test files directory
│   └── example.spec.ts     # Sample test file (TypeScript)
├── playwright-report/      # HTML reports (generated after test run)
├── test-results/           # Test artifacts (screenshots, videos, traces)
├── playwright.config.ts    # Playwright configuration (TypeScript)
├── tsconfig.json           # TypeScript configuration
├── package.json            # Node.js dependencies and scripts
└── README.md               # This file
```

## Writing Tests

Create new test files in the `tests/` directory with `.spec.ts` extension.

Example test structure:
```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Tests', () => {
  test('should do something', async ({ page }) => {
    await page.goto('https://example.com');
    await expect(page).toHaveTitle('Expected Title');
  });
});
```

## TypeScript Benefits

- Type safety and autocomplete in your IDE
- Better refactoring support
- Catch errors at compile time
- Enhanced code documentation
