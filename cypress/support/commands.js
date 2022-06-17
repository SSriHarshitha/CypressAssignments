// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })



// ------------- Assignment on saucedemo website -------------
Cypress.Commands.add('loginMethod',(locator,username,password) => {
    cy.get(locator.username).should('be.enabled').clear().type(username)
    cy.get(locator.password).should('be.enabled').clear().type(password)
    cy.get(locator.loginButton).should('be.visible').and('be.enabled').click()
})

Cypress.Commands.add('logoutMethod',(locator)=>{
    cy.get(locator.menuButton).click()
    cy.get(locator.logoutButton).click()
})

Cypress.Commands.add('validatingTheMessage',(locator)=>{
    cy.get(locator.validationMessage).then((e)=>{
        const t = e.text()
        expect(t).to.contains("Epic sadface: Username and password do not match any user in this service")
    })
})

Cypress.Commands.add('addToCart',function(locator){
    cy.get(locator.productTitle).first().then(($txt)=>{
        const title1 = $txt.text()
        cy.wrap(title1).as('titleText')
    })
    cy.get(locator.productPrice).eq(0).invoke('text').as('priceText')
    cy.get(locator.productDescription).eq(0).invoke('text').as('descriptionText')
    cy.get(locator.addToCartButton).eq(0).click()
    cy.get(locator.shoppingCartIcon).should("have.text","1").click()
})

Cypress.Commands.add('cartDetails',function(locator){
    cy.get(locator.productTitle).should('contain.text',this.titleText)
    cy.get(locator.productDescription).contains(this.descriptionText)
    cy.get(locator.productPrice).should('contain.text',this.priceText)
    cy.get(locator.checkoutButton).should('be.enabled').click()
})

Cypress.Commands.add('removeProduct',(locator)=>{
    cy.get(locator.removeButton).should('be.enabled').click()
    cy.get(locator.cartItem).should('be.empty')
})

Cypress.Commands.add('userInformation',function(locator,data){
    for(let prop in locator.userDetails){
        cy.get(locator.userDetails[prop]).should('be.visible').type(data.userDetails[prop])
    }
    cy.get(locator.continueButton).should('be.enabled').click()
    cy.get(locator.productTitle).should('have.text',this.titleText)
    cy.get(locator.productPrice).should('have.text',this.priceText)
    cy.get(locator.paymentInfo).eq(0).should('include.text',data.paymentInfo)
    cy.get(locator.paymentInfo).eq(1).should('have.text',data.shippingInfo)
    cy.get(locator.totalValue).should('have.text',data.total)
})


// --------- Assignment on automation practice website ---------
Cypress.Commands.add('urlValidation',()=>{
    cy.url().should('contain','http://automationpractice.com/')
    cy.title().should('include','My Store')
})

Cypress.Commands.add('signUp',function(locator,data){
    cy.get(locator.signinButton).click()
    cy.get(locator.emailValidation).should("be.visible").type(data.emailValue)
    cy.get(locator.createButton).should("be.enabled").click()
    cy.wait(5000)
    cy.get(locator.title_radioBtn).check()
    cy.get(locator.custfirstName).type(data.addressDetails.firstName)
    cy.get(locator.custlastName).type(data.addressDetails.lastName)
    cy.get(locator.email).should("have.value",data.emailValue)
    cy.get(locator.password).should("be.visible").type(data.password)
    cy.get(locator.days).select("8")
    cy.get(locator.months).select("9")
    cy.get(locator.years).select("2013")
    for(let prop in locator.addressDetails){
        cy.get(locator.addressDetails[prop]).should('be.visible').type(data.addressDetails[prop])
    }
    cy.get(locator.state).select("14")
    cy.get(locator.registerButton).click()
})

Cypress.Commands.add('signIn',function(locator,data){
    cy.get(locator.signinButton).click()
    cy.get(locator.email).should("be.visible").type(data.emailValue)
    cy.get(locator.password).should("be.visible").type(data.password)
    cy.get(locator.loginButton).should("be.enabled").click()
    cy.get(locator.userValidation).should('have.text',data.addressDetails.firstName+" "+data.addressDetails.lastName)
})

Cypress.Commands.add('addTheProduct',function(locator){
    cy.get(locator.womenTab).eq(0).trigger('mouseover')
    cy.get(locator.eveningDresses).first().should("be.hidden").click({force : true})
    cy.get(locator.productName).eq(1).invoke("text").as('title')
    cy.get(locator.productPrice).eq(0).invoke("text").as('price')
    cy.get(locator.addToCart).click({force : true})
    cy.wait(4000)
    cy.get(locator.proceedButton).click()
    cy.get('@price').then(pricetext=>{
        cy.get(locator.cartProductPrice).eq(7).should("contain.text",pricetext.trim())
    })
    cy.get('@title').then(titletext=>{
        const titleItem = titletext
        cy.get(locator.cartProductName).eq(2).should("contain.text",titleItem.trim())
    })
})

Cypress.Commands.add('removeProductFromCart', function(locator,data){
    cy.get(locator.proceedToSignInTab).eq(1).should("be.visible").click("center")
    cy.get(locator.proceedToAddressTab).should("be.visible").click("center")
    cy.get(locator.agreeTermsAndConditions).click("center")
    cy.get(locator.proceedToPaymentTab).should("be.visible").click("center")
    cy.get(locator.shoppingCart).should("be.visible").click("center")
    cy.get(locator.removeBtn).click({force : true})
    cy.reload()
    cy.get(locator.emptyCartMessage).should("contain.text",data.cartMessage)
})



// --------  Assignment on GuideAmbetterHealth website ----------
Cypress.Commands.add('setTheNetwork',(locator,data)=>{
    cy.get(locator.dontHavePlanBtn).eq(6).should('have.text',data.dontHavePlanText).click("center")
    cy.get(locator.state).click().type(data.state)
    cy.get(locator.selectState).should('have.text',data.state).click().wait(500)
    cy.get(locator.selectYear).should('have.value',data.networkYear)
    cy.get(locator.country).contains(data.countryFieldText).click()
    cy.get(locator.selectCountry).contains(data.country).click()
    cy.get(locator.continueButton).should('be.visible').click()
    cy.get(locator.selectNetwork).check()
    cy.get(locator.continueButton).should("be.enabled").click()
})

Cypress.Commands.add('searchState',function(locator,data){
    cy.get(locator.searchBox).first().type(data.specialty).wait(500)
    cy.get(locator.selectSpecialty).eq(1).click().wait(500)
    cy.get(locator.searchState).click().clear().type(data.state).wait(500)
    cy.get(locator.stateOption).first().click({force : true}).wait(1000)
    cy.get(locator.searchButton).contains('Search').click({force : true})
})

Cypress.Commands.add('urlValidation',function(locator,data){
    cy.wait(5000)
    cy.get(locator.resultCount).invoke("text").as('result_count')          
    cy.url().should('include',data.specialty)
    cy.url().should('include',data.stateCode)
})

Cypress.Commands.add('searchMapMove',function(locator){
    cy.get(locator.mapMoveButton).click()
    cy.get(locator.mapScreen)
      .trigger('mousedown',{ clientX: 952, clientY: 143 })
      .trigger('mousemove',{ clientX: 952, clientY: 300 })
      .trigger('mouseup')
      .trigger('mouseleave')
    cy.wait(6000)
    cy.get('@result_count').then(count=>{
        cy.get(locator.resultCount).should("not.have.text",count)
    })
    cy.get(locator.resultCount).invoke("text").as('resultCountAfterMapChange')
})

Cypress.Commands.add('advanceSearch', function(locator){
    cy.get(locator.advanceSearchBtn).contains('Advanced Search').click()
    cy.get(locator.providerSpecialtyField).click()
    cy.get(locator.primaryCareProviderOption).eq(0).click()
    cy.get(locator.submitButton).first().click()
})

Cypress.Commands.add('sortedByDistance', function(locator,data){
    cy.get(locator.resultCount).should('not.have.text',this.resultCountAfterMapChange)
    cy.get(locator.sortedByDropdown).should('be.visible').click()
    cy.get(locator.distanceOption).eq(1).click()
    cy.get(locator.specialistName).first().should('have.text', data.specialistName)
    cy.get(locator.miles).first().should('contains.text',data.topRowMiles)
})

Cypress.Commands.add('validateLanguageFilter',function(locator,data){
    cy.get(locator.languageDropdown).eq(3).contains('Language').click()
    cy.get(locator.languageTypeField).eq(1).type(data.language)
    cy.get(locator.englishOption).eq(3).find('input').check()
    cy.get(locator.applyButton).eq(3).contains('Apply').click()
})

Cypress.Commands.add('verifyTheResultedDetails', (locator,data)=>{
    cy.get(locator.specialistName).first().should('have.text', data.firstSpecialist).click()
    cy.get(locator.languageSpokenOption).should('contain.text',data.language)
    cy.get(locator.backButton).contains('Back').click()
})