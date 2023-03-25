describe('2. Login de Usuário', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    const loginButtom = cy.get('[data-cy=login-button]').contains('Login')
    loginButtom.should('be.visible')
    loginButtom.click();
  })

  it('2.1. [ERROR] Com email inválido.', () => {
    const loginEmailInput = cy.get('[data-cy=login-input-email]')
    const loginPasswordInput = cy.get('[data-cy=login-input-password]')
    const loginButton = cy.get('[data-cy=login-button]').contains('Bem-Vindo(a)!')

    loginEmailInput.type('cypress/test.com')
    loginPasswordInput.type('$Test123')
    loginButton.click()

    cy.get('[id=toast-error-login-title]').should('be.visible')
    cy.get('[id=toast-error-login-title]').contains('Erro ao criar usuário')
    cy.get('[id=toast-error-login-description]').contains('Insira um email válido')
  })

  it('2.2. [ERROR] Com senha inválida.', () => {
    const loginEmailInput = cy.get('[data-cy=login-input-email]')
    const loginPasswordInput = cy.get('[data-cy=login-input-password]')
    const loginButton = cy.get('[data-cy=login-button]').contains('Bem-Vindo(a)!')
    
    loginEmailInput.type('cypress@test.com')
    loginPasswordInput.type('test123')
    loginButton.click()

    cy.get('[id=toast-error-login-title]').should('be.visible')
    cy.get('[id=toast-error-login-title]').contains('Erro ao criar usuário')
    cy.get('[id=toast-error-login-description]').contains('As senhas devem conter pelo menos 8 caracteres, uma maiúscula, uma minúscula, um número e um caractere especial')
  })

  it('2.3. [SUCCESS] Informações corretas, com teste de cookies e redirecionamento.', () => {
    const loginEmailInput = cy.get('[data-cy=login-input-email]')
    const loginPasswordInput = cy.get('[data-cy=login-input-password]')
    const loginButton = cy.get('[data-cy=login-button]').contains('Bem-Vindo(a)!')
    
    loginEmailInput.type('test@cypress.com')
    loginPasswordInput.type('$Test123')
    loginButton.click()

    cy.get('[id=toast-success-login-title]').should('be.visible')
    cy.get('[id=toast-success-login-title]').contains('Olá, Joanna')
    cy.get('[id=toast-success-login-description]').contains('Seja bem-vindo(a)!')
    cy.get('[id=toast-expire-login-title]').should('be.visible')
    cy.get('[id=toast-expire-login-title]').contains('Sua sessão expira em:')
    cy.get('[id=toast-expire-login-description]').contains('Uma hora!')
    cy.url().should('include', '/todo-list')
    cy.getCookie('auth').should('exist')
    cy.getCookie('user').should('exist')
  })
});