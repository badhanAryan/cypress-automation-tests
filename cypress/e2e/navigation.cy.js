describe('Wallee webshop', () => {
  before(() => {
    cy.visit(Cypress.env('homepage'));
  });

  it('visiting homepage', () => {
    cy.get('.products-block-post-template').should('exist')
    cy.get('.products-block-post-template').find('.product').should('have.length.at.least', 1)
  });

  it('visiting cart', () => {
    cy.get('.wp-block-page-list').contains('Cart').should('be.visible')
    .click()
    cy.url().should('include', '/cart')
    cy.get('.wp-block-post-title').contains('Cart')
    // Navigate back to the homepage
    cy.get('p.wp-block-site-title').contains('Demo Shop').click();
    cy.url().should('eq', Cypress.env('homepage'));
  });

  it('visiting Login page', () => {
    cy.get('.wp-block-page-list').contains('My account').should('be.visible')
    .click()
    cy.url().should('include', '/my-account')
    // Check if the form is present
    cy.get('form.woocommerce-form-login').should('exist')
    cy.get('input[name="username"]').should('be.visible')
    cy.get('input[name="password"]').should('be.visible')
    cy.get('button.woocommerce-form-login__submit').should('be.visible')
    // Navigate back to the homepage
    cy.get('p.wp-block-site-title').contains('Demo Shop').click();
    cy.url().should('eq', Cypress.env('homepage'));
  });

  it('should navigate to an individual product page', () => {
    cy.get('li.product').contains('Add to cart').first().parents('li.product').within(() => {
      cy.get('h3 a').click();
    })
    cy.url().should('include', '/product/')
    cy.get('form.cart').should('be.visible')
    cy.get('.quantity input[type="number"]').should('exist')
  });
});
