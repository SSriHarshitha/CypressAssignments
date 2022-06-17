/// <reference types = "cypress" />

describe("Verifying the cost of the product", () => {

    before(() =>{
        cy.visit("https://demo.nopcommerce.com/")
    })

    it("Registering in the page",() => {
        cy.get(".ico-register").click()
        cy.title().should('include','Register')
        cy.get("#gender-female").should('be.visible').click()
        cy.get("#FirstName").should('be.enabled').type("name22")
        cy.get("#LastName").should('be.enabled').type("rabbit13")
        cy.get("select[name=DateOfBirthDay]").select('8').should('have.value','8')
        cy.get("select[name=DateOfBirthMonth]").select('11')
        cy.get("select[name=DateOfBirthYear]").select('1998').should('have.value','1998')
        cy.get("#Email").type('faker3212@yaho.com')
        cy.get("#Company").type("3Pillar")
        cy.get("#Password").type("Doggy@12")
        cy.get("#ConfirmPassword").type("Doggy@12")
        cy.get("#register-button").should('be.enabled').click()

    } )

    it("Verifying the cost ",() => {

        cy.get("#small-searchterms").type('Nokia Lumia 1020')
        cy.get(".search-box-button").click()
        cy.get(".product-box-add-to-cart-button").click()
        cy.get("#topcartlink > a > .cart-label").click()
        cy.get(".qty-input").clear().type('2')
        cy.get("#updatecart").click() 
        cy.get(".product-subtotal").contains('698.00')
    })

})