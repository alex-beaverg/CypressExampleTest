let homeUrl = 'https://www.mobileshop.eu/'
let checkProductPageText = 'Add to basket'

describe('mobileshop.eu tests', () => {
  const params = require('../fixtures/parameters.json');

  params.forEach((test) => {
    it(test.testName, () => {
      getHomePage()
      cy.get('nav[class="main-menu"] button[data-drop="catMainDropPanel"]').should('exist').click({force: true})
      cy.get(test.dropMenuLocator).should('exist').click({force: true})
      cy.get('header h1 > span').should('have.text', test.pageTitle)
      cy.get('div[class="product-wrap"]:first-child div h5 a').as('productTitleElement')
      cy.get('@productTitleElement').invoke('text').then($title => {
        cy.get('div[class="product-wrap"]:first-child div div[class="price"] > div').invoke('text').then($price => {
          cy.get('@productTitleElement').should('exist').click({force: true})
          cy.get('div[class="buttons"] > a:first-child > span').should('have.text', checkProductPageText)
          cy.get('div[class="price-wrap"] > div[class="price"]').invoke('text').should('eq', $price)
        })
        cy.get('h1[class="product-name"]').invoke('text').should('eq', $title) 
      })
    })
  })  

  function getHomePage() {
    cy.visit(homeUrl)
    cy.url().should('include', homeUrl)
    cy.get('a[class="button db ghost"]').wait(1000).should('exist').click({force: true})
  }
}) 