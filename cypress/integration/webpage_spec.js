describe('Webpage', () => {
  it('products page has links to single product page', () => {
    cy.visit('http://localhost:3000/products');

    cy.get('[data-cy=product-link-1]').click();

    // Should be on a new URL which includes the product page
    cy.url().should('include', '/products?id=1');
  });
});
