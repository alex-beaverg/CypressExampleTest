let homeUrl = 'https://www.mobileshop.eu/'
let checkProductPageText = 'Add to basket'

describe('mobileshop.eu tests', () => {
  const params = require('../fixtures/mobile_phones_test_params.json')
  const locators = require('../fixtures/mobile_phones_test_locators.json')

  params.forEach((test) => {
    it(test.testName, () => {
      getHomePage()
      cy.get(locators.menuItemLocator).should('exist').click({force: true})
      cy.get(test.dropMenuItemLocator).should('exist').click({force: true})
      cy.get(locators.pageTitleLocator).should('have.text', test.pageTitle)
      cy.get(locators.productTitleLocator1).as('productTitleElement')
      cy.get('@productTitleElement').invoke('text').then($title => {
        cy.get(locators.productPriceLocator1).invoke('text').then($price => {
          cy.get('@productTitleElement').should('exist').click({force: true})
          cy.get(locators.addToBasketButtonLocator).should('have.text', checkProductPageText)
          cy.get(locators.productPriceLocator2).invoke('text').should('eq', $price)
        })
        cy.get(locators.productTitleLocator2).invoke('text').should('eq', $title) 
      })
    })
  })  

  function getHomePage() {
    cy.visit(homeUrl)
    cy.url().should('include', homeUrl)
    cy.get(locators.privacyButtonLocator).wait(1000).should('exist').click({force: true})
  }
}) 