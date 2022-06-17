/// <reference types = "cypress" /> 
describe("Test Suite",function(){
    it("Verify the title of the page ",function(){
        cy.visit("https://demo.nopcommerce.com/")
        cy.title().should('eq','nopCommerce demo store')
    })

    it("Verify the title of the page with negative testcase ",function(){
        cy.visit("https://demo.nopcommerce.com/")
        cy.title().should('eq','nopCommerce demo ')
    })

    it("Go the example page ",function(){
        cy.visit("https://example.cypress.io")
        cy.contains('root').click()
        cy.url().should('include','/commands/querying')
    })

})