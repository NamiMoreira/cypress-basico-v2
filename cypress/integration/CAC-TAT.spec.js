/ <reference types="Cypress" /

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatorios e envia o formulario',function(){
        cy.get('#firstName').type('naomi')
        cy.get('#lastName').type('moreira')
        cy.get('#email').type('moreira.naomiii@gmail.com')
        cy.get('#open-text-area').type('teste',{delay: 0})
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida',function(){
        cy.get('#firstName').type('naomi')
        cy.get('#lastName').type('moreira')
        cy.get('#email').type('moreira.naomiii@gmail,com')
        cy.get('#open-text-area').type('teste teste')
        cy.get('button[type="submit"]').click()
        // cy.get('.success').should('be.visible')

        cy.get('.error').should('be.visible')
    })

    it('verifica o campo de telefone se foi preenchio corretamente',function(){
        cy.get('#phone')
        .type('abscklasdfjafhjka')
        .should('have.value','')
    })
    it('verifica se gera erro quando o campo checkbox do telefone é preenchido',function(){
        cy.get('#firstName').type('naomi')
        cy.get('#lastName').type('moreira')
        cy.get('#email').type('moreira.naomiii@gmail.com')
        cy.get('#check > [for="phone"]').click()
        cy.get('#open-text-area').type('teste teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

  it('verifica se os campos estao com valor esperadoe depois limpa os mesmo',function(){
    cy.get('#firstName')
    .type('naomi')
    .should('have.value','naomi')
    .clear()
    cy.get('#lastName')
    .type('moreira')
    .should('have.value','moreira')
    .clear()
    cy.get('#email')
    .type('moreira.naomiii@gmail.com')
    .should('have.value','moreira.naomiii@gmail.com')
    .clear()
    cy.get('#open-text-area')
    .type('teste')
    .should('have.value','teste')
    .clear()
  })
  it('verifica se gera erro ao nao preencher os dados',function(){
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', function() {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })
  
  it('seleciona um produto (Youtube) por seu valor (value)',function(){
    cy.get('#product')
    .select('YouTube')
    .should('have.value','youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)',function(){
    cy.get('#product')
    .select('mentoria')
    .should('have.value','mentoria')
  })
  it('seleciona um produto (Blog) por seu índice',function(){
    cy.get('#product')
    .select(1)
    .should('have.value','blog')
  })
  it('marca o tipo de atendimento "Feedback"',function(){
    cy.get('input[type="radio"][value="feedback"]')
    .check()
    .should('have.value','feedback')
  })

  it('marca cada tipo de atendimento',function(){
    cy.get('input[type="radio"]')
    .should('have.length',3)
    .each(function($radio){
        cy.wrap($radio)
        .check()
        .should('be.checked')
    })
  })
  it('marca ambos checkboxes, depois desmarca o último',function(){
    cy.get('input[type="checkbox"]')
    .check()
    .should('be.checked')
    .last()
    .uncheck()
  })


    it('seleciona arquivo da pasta features',function(){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona arquivo simulano um drag-and-drop',function(){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json',{action:'drag-drop'})
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',function(){
        cy.fixture('example').as('sampleFile')
        cy.get('input[type="file"]')
          .selectFile('@sampleFile')
    })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',function(){
        cy.get('#privacy a')
        .should('have.attr','target','_blank')
    })
    it.only('acessa a página da política de privacidade removendo o target e então clicando no link',function(){
        cy.get('#privacy a')
        .invoke('removeAttr','target')
        .click()

        cy.contains('Talking About Testing')
        .should('be.visible')
    })
})