const params = require('../fixtures/test_params.json')

describe('Mobileshop.eu Product tests', () => {
  const checkProductPageText = 'Add to basket'
  const suites = require('../fixtures/product_suites.json')

  suites.forEach(suite => {
    let tests
    switch(suite.suiteTag) {
      case '#mobile': tests = require('../fixtures/mobile_phones_tests.json')
      case '#electronics': tests = require('../fixtures/electronics_tests.json')
    }
    describe(suite.suiteName, () => {
      tests.forEach(test => {
        it(test.testName, () => {
          getHomePage()
          cy.get(suite.menuItemLocator).should('exist').click({force: true})
          cy.get(test.dropMenuItemLocator).should('exist').click({force: true})
          cy.get(params.pageTitleLocator).should('have.text', test.pageTitle)
          cy.get(params.productTitleLocator1).as('productTitleElement')
          cy.get('@productTitleElement').invoke('text').then(title => {
            cy.get(params.productPriceLocator1).invoke('text').then(price => {
              cy.get('@productTitleElement').should('exist').click({force: true})
              cy.get(params.addToBasketButtonLocator).should('have.text', checkProductPageText)
              cy.get(params.productPriceLocator2).invoke('text').should('eq', price)
            })
            cy.get(params.productTitleLocator2).invoke('text').should('eq', title) 
          })
        })
      })
    })    
  })
})

function getHomePage() {
  cy.visit(params.homeUrl)
  cy.url().should('include', params.homeUrl)
  cy.get(params.privacyButtonLocator).wait(1000).should('exist').click({force: true})
}