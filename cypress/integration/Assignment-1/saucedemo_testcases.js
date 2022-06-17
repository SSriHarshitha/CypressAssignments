/// <reference types = "cypress" />

describe("Verifying the login with different credentials", () => {
    let data,locator;
    beforeEach(() =>{
        cy.visit("https://www.saucedemo.com/")
        cy.fixture("data.json").then(function(local_data){
            data = local_data;
            return data
        })
        cy.fixture("locators.json").then(function(local_locator){
            locator = local_locator;
            return locator
        })
    })
    
    it("Validating the login with different credentials", function() {
        for(let elem in data.usernames){
        cy.loginMethod(locator,data.usernames[elem],data.password)
        cy.logoutMethod(locator)
        }
    })

    it("Verify login with invalid username & valid password",function(){
        cy.loginMethod(locator,data.invalid_username,data.password)
        cy.validatingTheMessage(locator)
    })

    it("Verify login with valid username & invalid password",function(){
        cy.loginMethod(locator,data.usernames.username,data.invalid_password)
        cy.validatingTheMessage(locator)
    })

    it("Verify login with invalid username & invalid password",function(){
        cy.loginMethod(locator,data.invalid_username,data.invalid_password)
        cy.validatingTheMessage(locator)
    })

    it("Adding the product to cart", function(){
        cy.loginMethod(locator,data.usernames.username,data.password)
        cy.addToCart(locator)
        cy.cartDetails(locator)
    })

    it("Add the product and remove the product from the cart", function(){
        cy.loginMethod(locator,data.usernames.username,data.password)
        cy.addToCart(locator)
        cy.removeProduct(locator)
    })

    it('Add product and checkout and enter user details',function(){
        cy.loginMethod(locator,data.usernames.username,data.password)
        cy.addToCart(locator)
        cy.cartDetails(locator)
        cy.userInformation(locator,data)
    })
})