describe('1. Criação de Usuário', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    const signinButtom = cy.get('[data-cy=signin-button]').contains('Cadastre-se')
    signinButtom.should('be.visible')
    signinButtom.click();
  })

  it('1.1. [ERROR] Com nome menor que 3 caracteres.', () => {
    const signinNameInput = cy.get('[data-cy=signin-input-name]')
    const signinEmailInput = cy.get('[data-cy=signin-input-email]')
    const signinPasswordInput = cy.get('[data-cy=signin-input-password]')
    const signinButton = cy.get('[data-cy=signin-create-button]')


    signinNameInput.type('Jo')
    signinEmailInput.type('cypress@test.com')
    signinPasswordInput.type('$Test123')
    signinButton.click()

    cy.get('[id=toast-error-signin-title]').should('be.visible')
    cy.get('[id=toast-error-signin-title]').contains('Erro ao criar usuário')
    cy.get('[id=toast-error-signin-description]').contains('Seu nome deve conter pelo menos 3 caracteres')
  })

  it('1.2. [ERROR] Com email inválido.', () => {
    const signinNameInput = cy.get('[data-cy=signin-input-name]')
    const signinEmailInput = cy.get('[data-cy=signin-input-email]')
    const signinPasswordInput = cy.get('[data-cy=signin-input-password]')
    const signinButton = cy.get('[data-cy=signin-create-button]').contains('Criar Usuário')

    signinNameInput.type('Joanna')
    signinEmailInput.type('cypress/test.com')
    signinPasswordInput.type('$Test123')
    signinButton.click()

    cy.get('[id=toast-error-signin-title]').should('be.visible')
    cy.get('[id=toast-error-signin-title]').contains('Erro ao criar usuário')
    cy.get('[id=toast-error-signin-description]').contains('Insira um email válido')
  })

  it('1.3. [ERROR] Com senha inválida.', () => {
    const signinNameInput = cy.get('[data-cy=signin-input-name]')
    const signinEmailInput = cy.get('[data-cy=signin-input-email]')
    const signinPasswordInput = cy.get('[data-cy=signin-input-password]')
    const signinButton = cy.get('[data-cy=signin-create-button]').contains('Criar Usuário')
    
    signinNameInput.type('Joanna')
    signinEmailInput.type('cypress@test.com')
    signinPasswordInput.type('test123')
    signinButton.click()

    cy.get('[id=toast-error-signin-title]').should('be.visible')
    cy.get('[id=toast-error-signin-title]').contains('Erro ao criar usuário')
    cy.get('[id=toast-error-signin-description]').contains('As senhas devem conter pelo menos 8 caracteres, uma maiúscula, uma minúscula, um número e um caractere especial')
  })

  it('1.4. [SUCCESS] Informações corretas.', () => {
    const signinNameInput = cy.get('[data-cy=signin-input-name]')
    const signinEmailInput = cy.get('[data-cy=signin-input-email]')
    const signinPasswordInput = cy.get('[data-cy=signin-input-password]')
    const signinButton = cy.get('[data-cy=signin-create-button]').contains('Criar Usuário')
    
    signinNameInput.type('Joanna')
    signinEmailInput.type('cypress@test.com')
    signinPasswordInput.type('$Test123')
    signinButton.click()

    cy.get('[id=toast-success-signin-title]').should('be.visible')
    cy.get('[id=toast-success-signin-title]').contains('Bem vindo!')
    cy.get('[id=toast-success-signin-description]').contains('Agora faça seu login!')
  })
});
