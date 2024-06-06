const params = require('../fixtures/test_params.json');

describe('Mobileshop.eu Product tests', () => {
  const suites = require('../fixtures/product_suites.json');
  suites.forEach(suite => {    
    context(suite.suiteName, () => {
      let tests = getProductSuite(suite.suiteTag);
      tests.forEach(test => {
        it(test.testName, () => {
          cy.log('Test "' + test.testName + '" was started!');
          cy.get(suite.menuItemLocator).should('exist').click({force: true});
          cy.get(test.dropMenuItemLocator).should('exist').click({force: true});
          cy.get(params.pageTitleLocator).should('have.text', test.pageTitle);
          cy.get(params.productTitleLocator1).as('productTitleElement');
          cy.get('@productTitleElement').invoke('text').then(title => {
            cy.get(params.productPriceLocator1).invoke('text').then(price => {
              cy.get('@productTitleElement').should('exist').click({force: true});
              cy.get(params.addToBasketButtonLocator).should('have.text', params.checkProductPageText);
              cy.get(params.productPriceLocator2).invoke('text').should('eq', price);
            })
            cy.get(params.productTitleLocator2).invoke('text').should('eq', title);
          })
          cy.log('Test "' + test.testName + '" was finished!');
        })
      })
    })
  })
})

describe('Mobileshop.eu Login tests', () => {
  const tests = require('../fixtures/login_tests.json');
  tests.forEach(test => {
    it(test.testName, () => {
      cy.log('Test "' + test.testName + '" was started!');
      cy.get(params.loginButtonLocator).should('exist').click({force: true});
      cy.get(params.emailTextFieldLocator).should('exist').type(test.login);
      cy.get(params.passTextFieldLocator).should('exist').type(test.password);
      cy.get(params.submitLoginButtonLocator).should('exist').click({force: true});
      if (test.testName.includes('Valid')) {
        cy.get(params.logoutButton).should('exist');
      } else if (test.testName.includes('Invalid')) {
        cy.get(params.logoutButton).should('not.exist');
      } else {
        cy.get(params.logoutButton).should('exist').click({force: true});
        cy.url().should('include', params.homeUrl);
      }
      cy.log('Test "' + test.testName + '" was finished!');
    })
  })
})

beforeEach(() => {
  cy.log('Opening Home Page...');
  cy.visit(params.homeUrl);
  cy.url().should('include', params.homeUrl);
  cy.get(params.privacyButtonLocator).wait(1000).should('exist').click({force: true});
})

function getProductSuite(suiteTag) {
  switch(suiteTag) {
    case '#mobile': return require('../fixtures/mobile_phones_tests.json');
    case '#electronics': return require('../fixtures/electronics_tests.json');
  }
}