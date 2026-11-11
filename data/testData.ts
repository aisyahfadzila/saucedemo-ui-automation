// Public demo credentials published on the saucedemo.com login page.
export const users = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  lockedOut: { username: 'locked_out_user', password: 'secret_sauce' },
} as const;

export const customer = {
  firstName: 'Aisyah',
  lastName: 'Hani',
  postalCode: '12345',
} as const;

export const ITEM_NAME = 'Sauce Labs Onesie';
