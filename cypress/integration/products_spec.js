// Create a test suite for the products page
describe('Products page', () => {
  // Test the links to the single product page
  it('has links to single product page', () => {
    // Go to the products page URL
    cy.visit('/products');

    // Get the first link element and click on it
    cy.get('[data-cy=product-link-1]').click();

    // The resulting URL should include the single product path
    cy.url().should('include', '/products?id=1');
  });
});

describe('Product page', () => {
  it('has link to products page', () => {
    cy.visit('/products?id=1');
    cy.get('[data-cy=products-link]').click();
    cy.url().should('eq', 'http://localhost:3000/products');
  });
});
