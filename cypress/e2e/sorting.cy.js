describe('Product Sorting Functionality', () => {
  beforeEach(() => {
    // Visit the product listing page
    cy.visit(Cypress.env('homepage'));
    cy.intercept('GET', '**/?orderby=date&paged=1').as('sortByLatest');
    cy.intercept('GET', '**/?orderby=price&paged=1').as('sortByPriceLowToHigh');
    cy.intercept('GET', '**/?orderby=price-desc&paged=1').as('sortByPriceHightToLow');
  });

  it('Sorts products by price from low to high', () => {
    cy.get('select.orderby').select('Sort by price: low to high');
    cy.wait('@sortByPriceLowToHigh');
    // Extract the prices into an array
    const prices = [];
    cy.get('.wp-block-woocommerce-product-price').each(($el) => {
      const priceText = $el.text().trim().replace(/[^\d.,]/g, '');
      const price = parseFloat(priceText).toFixed(2);
      prices.push(price);
    }).then(() => {
      // Verify the prices are sorted low to high
      const sortedPrices = [...prices].sort((a, b) => a - b);
      expect(prices).to.deep.equal(sortedPrices);
    });
  });

  it('Sorts products by price from high to low', () => {
    cy.get('select.orderby').select('Sort by price: high to low');
    cy.wait('@sortByPriceHightToLow');

    // Extract the prices into an array
    const prices = [];
    cy.get('.wp-block-woocommerce-product-price').each(($el) => {
      const priceText = $el.text().trim().replace(/[^\d.,]/g, '');
      const price = parseFloat(priceText).toFixed(2);
      prices.push(price);
    }).then(() => {
      // Verify the prices are sorted high to low
      let sortedPrices = [...prices].sort((a, b) => b - a);
      expect(prices).to.deep.equal(sortedPrices);
    });
  });

  it('Sorts products by latest', () => {
    cy.get('select.orderby').select('Sort by latest');
    cy.wait('@sortByLatest');
    const productNumbers = [];
    cy.get('li.product').each(($el) => {
      const postClass = $el.attr('class').match(/post-(\d+)/);
      if (postClass) {
        const postNumber = parseInt(postClass[1], 10);
        productNumbers.push(postNumber);
      }
    }).then(() => {
      // Verify that the product numbers are in descending order
      const sortedProductNumbers = [...productNumbers].sort((a, b) => b - a);
      expect(productNumbers).to.deep.equal(sortedProductNumbers);
    });
  });
});
