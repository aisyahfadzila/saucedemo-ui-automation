# SauceDemo UI Automation (Task 3)

Playwright (TypeScript) UI tests for [saucedemo.com](https://www.saucedemo.com), using the Page Object Model.

| Spec | Scenarios |
|---|---|
| `tests/login.spec.ts` | valid login, locked-out user, invalid credentials, missing username, missing password |
| `tests/checkout.spec.ts` | E2E: add **Sauce Labs Onesie** → cart → checkout → finish → "Thank you for your order!" |

## Prerequisites
- Node.js 20+

## Run
```bash
npm install
npx playwright install chromium   # one-time browser download
npm test                          # headless, writes HTML report to playwright-report/
npm run test:headed               # watch the browser
npm run report                    # open the HTML report
npm run typecheck                 # TypeScript check only
```

Run one file or test:
```bash
npx playwright test tests/checkout.spec.ts
npx playwright test -g "locked out"
```

Override the site (defaults to `https://www.saucedemo.com`): `BASE_URL=... npm test`

## Design notes
- **Page Objects** in `pages/`, wired through Playwright fixtures in `fixtures/pages.ts`; the `loggedInInventory` fixture handles login for tests that are not about login.
- **Locators** use the site's `data-test` attributes (`testIdAttribute: 'data-test'`) and roles, never CSS/XPath chains.
- **No fixed waits:** only Playwright's auto-waiting and web-first assertions.
- Credentials are the public demo accounts shown on the login page (`data/testData.ts`).
- On failure the screenshot, video and trace are retained (`npx playwright show-trace <trace.zip>`).

## Report
Open `playwright-report/index.html` after a run (`npm run report`).
