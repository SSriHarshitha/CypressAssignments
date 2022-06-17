/// <reference types = "cypress" />

describe("Verifying the guide ambetterHealth website", () => {
        let data,locator;
        before(() =>{
            cy.visit("https://guide.ambetterhealth.com/")
            cy.fixture("guideHealth/data.json").then(function(local_data){ 
                data = local_data;
                return data
            })
            cy.fixture("guideHealth/locator.json").then(function(local_locator){
                locator = local_locator;
                return locator
            })
        })

    it('Setting up the network and searching the service by selecting state and specialty',function(){
        cy.setTheNetwork(locator,data)
        cy.searchState(locator,data)   
    })

    it('Validating the url and change the map move', function(){
        cy.urlValidation(locator,data)
        cy.searchMapMove(locator)
    })

    it('Applying the advance search and sorting the results by Distance',function(){
        cy.advanceSearch(locator)
        cy.sortedByDistance(locator,data)
    })

    it('Change the Language Filter and checking the results',()=>{
        cy.validateLanguageFilter(locator,data)
        cy.verifyTheResultedDetails(locator,data)
    })
})
