import { test, expect } from '../fixtures/pages';
import { customer, ITEM_NAME } from '../data/testData';

test.describe('E2E checkout', () => {
  test('completes checkout for Sauce Labs Onesie', async ({
    page,
    loggedInInventory,
    cartPage,
    checkoutPage,
  }) => {
    await test.step('Add item to cart', async () => {
      await loggedInInventory.addToCart(ITEM_NAME);
      await expect(loggedInInventory.cartBadge).toHaveText('1');
    });

    await test.step('Go to cart and verify the item', async () => {
      await loggedInInventory.openCart();
      await expect(page).toHaveURL(/cart\.html/);
      await expect(cartPage.itemNames).toHaveText([ITEM_NAME]);
    });

    await test.step('Proceed to checkout and enter information', async () => {
      await cartPage.checkout();
      await checkoutPage.fillInformation(customer.firstName, customer.lastName, customer.postalCode);
      await expect(page).toHaveURL(/checkout-step-two\.html/);
      await expect(checkoutPage.summaryItemNames).toHaveText([ITEM_NAME]);
    });

    await test.step('Finish and confirm the order is complete', async () => {
      await checkoutPage.finish();
      await expect(page).toHaveURL(/checkout-complete\.html/);
      await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
    });
  });
});
