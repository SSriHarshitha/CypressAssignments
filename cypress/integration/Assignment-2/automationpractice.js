/// <reference types = "cypress" />

describe("Verifying the automation practice website", () => {
    let data,locator;
    beforeEach(() =>{
        cy.visit("http://automationpractice.com/")
        cy.fixture("automationpractice/data.json").then(function(local_data){ 
            data = local_data;
            return data
        })
        cy.fixture("automationpractice/locator.json").then(function(local_locator){
            locator = local_locator;
            return locator
        })
    })

    it('validate the URL', ()=>{
        cy.urlValidation()
    })

    it("Sign in by new user", function(){
        cy.signUp(locator,data)
    })

    it.only("Validate by adding and removing the product from cart", function(){
        cy.signIn(locator,data)
        cy.addTheProduct(locator)
        cy.removeProductFromCart(locator,data)
    })


})