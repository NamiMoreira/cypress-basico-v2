
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => { 
    cy.get('#firstName').type('naomi')
    cy.get('#lastName').type('moreira')
    cy.get('#email').type('moreira.naomiii@gmail.com')
    cy.get('#open-text-area').type('teste')
    cy.contains('button','Enviar').click()

 })

