import { test, expect } from '../fixtures/pages';
import { users } from '../data/testData';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('logs in with valid credentials', async ({ page, loginPage, inventoryPage }) => {
    await loginPage.login(users.standard.username, users.standard.password);

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(inventoryPage.title).toHaveText('Products');
  });

  test('shows an error for a locked out user', async ({ page, loginPage }) => {
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);

    await expect(loginPage.error).toContainText('Sorry, this user has been locked out');
    await expect(page).not.toHaveURL(/inventory\.html/);
  });

  test('shows an error for invalid credentials', async ({ loginPage }) => {
    await loginPage.login('invalid_user', 'wrong_password');

    await expect(loginPage.error).toContainText('Username and password do not match');
  });

  test('requires a username', async ({ loginPage }) => {
    await loginPage.login('', users.standard.password);

    await expect(loginPage.error).toContainText('Username is required');
  });

  test('requires a password', async ({ loginPage }) => {
    await loginPage.login(users.standard.username, '');

    await expect(loginPage.error).toContainText('Password is required');
  });
});
