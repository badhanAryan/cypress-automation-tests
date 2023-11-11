import 'cypress-iframe';

describe('Wallee webshop', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('homepage'));
    cy.intercept('POST', '**/wp-admin/admin-ajax.php').as('adminAjax');
    cy.intercept('GET', '**/?orderby=date&paged=1').as('sortByLatest');
    cy.intercept('POST', '**/?wc-ajax=update_order_review').as('updateOrderReview');
  });

  function addItemToCart() {
    cy.get('a.add_to_cart_button').contains('Add to cart').click();
    cy.get('.woocommerce-message').should('exist');
    // Fetch the price dynamically from the product's page or cart
    cy.get('td.product-price')
      .invoke('text')
      .then((priceText) => {
        // Extract the numerical value from the price text
        const price = parseFloat(priceText.replace(/[^\d.,]/g, ''));
        const newQty = 3;
        // Update the quantity of the product
        cy.get('.quantity input[type="number"]').clear().type(newQty);
        cy.get('button[name="update_cart"]').click();
        cy.get('button[name="update_cart"]').should('not.be.disabled');
        // Calculate the expected subtotal
        const expectedSubtotal = (price * newQty);
        // Verify the subtotal are updated
        cy.get('.cart-subtotal .woocommerce-Price-amount').should('contain', `€${expectedSubtotal}`);
        cy.get('.order-total .woocommerce-Price-amount').should('contain', `€${expectedSubtotal}`);
      });

    cy.get('a.checkout-button').click();
    cy.url().should('include', '/checkout');
  }

  // Function to fill up billing details
  function fillBillingDetails(createAccount = false) {
    cy.get('input[name=billing_first_name]').type('Good');
    cy.get('input[name=billing_last_name]').type('Customer');
    cy.get('.select2-selection--single').eq(0).click();
    cy.get('.select2-results__option').contains('Germany').click();
    cy.get('input[name=billing_address_1]').type('Hamburg');
    cy.get('input[name=billing_address_2]').type('Hamburg');
    cy.get('input[name=billing_postcode]').type('22222');
    cy.get('input[name=billing_city]').type('Hamburg');
    cy.get('input[name=billing_phone]').type('0112233444');
    // Generate a unique email using a timestamp
    const uniqueTimestamp = new Date().getTime();
    const uniqueEmail = `goodcustomer${uniqueTimestamp}@xyz.com`;
    cy.get('input[name=billing_email]').type(uniqueEmail);

    if (createAccount) {
      cy.get('label.woocommerce-form__label').eq(1).should('be.visible').click();
    }
    cy.wait('@adminAjax');
    cy.wait('@updateOrderReview');
  }

  it('adding items to the cart from homepage and checkout while creating new account', () => {
    addItemToCart();
    fillBillingDetails(true);
    // Interact with the checkbox and payment method
    // Using click() instead of check() due to 'display: none' CSS property
    // This is a workaround for a known issue where the input is hidden and controlled via custom JavaScript
    // cy.get('label.woocommerce-form__label').eq(1).should('be.visible').click();
    cy.get('.wc_payment_method').find('input[value="wallee_3"]').click();
    cy.get('label.woocommerce-form__label').eq(2).should('be.visible').click();
    cy.get('button#place_order').should('be.visible').click()

    // interacting with iframe
    cy.frameLoaded('#lightboxPaymentFrame');
    const accountNumber = 'DE89 3704 0044 0532 0130 00';
    cy.iframe().find('.payment-bank-account-number').type(accountNumber);
    cy.iframe().find('button.payment-submit-button').click()
  });

  it('add items to the cart and place an order without creating an account', () => {
    addItemToCart();
    fillBillingDetails();
    // Place the order without creating an account
    cy.get('button#place_order').click();
    cy.get('.wc_payment_method').find('input[value="wallee_3"]').click();
    cy.get('label.woocommerce-form__label').eq(2).should('be.visible').click();
    cy.get('button#place_order').should('be.visible').click();
    cy.get('#paymentFrameWrapper').should('be.visible')

    // interacting with iframe
    cy.frameLoaded('#lightboxPaymentFrame');
    const accountNumber = 'DE89 3704 0044 0532 0130 00';
    cy.iframe().find('.payment-bank-account-number').type(accountNumber);
    cy.iframe().find('button.payment-submit-button').click()
  });

  it('adding item to the cart using product details page', () => {
    cy.get('select.orderby').select('Sort by latest');
    cy.wait('@sortByLatest');
    cy.get('li.product').first().click();
    cy.get('button.single_add_to_cart_button').click();
    cy.get('.woocommerce-cart-form').should('exist')
  });
});

