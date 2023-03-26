describe('4. TopRightMenu em contexto sem autenticação', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    const menuButtom = cy.get('[data-cy=menu-button]')
    menuButtom.should('be.visible')
    menuButtom.click();
  })

  it('4.1. [SUCCESS] Login visível', () => {
    const menuLogin = cy.get('[data-cy=menu-login]')
    menuLogin.should('be.visible')
    menuLogin.click()
    cy.get('[data-cy=login-input-email]').should('be.visible')
    cy.get('[data-cy=login-input-password]').should('be.visible')
    cy.get('[data-cy=login-button]').should('be.visible')
  })

  it('4.2. [SUCCESS] Cadastre-se visível', () => {
    const menuSignin = cy.get('[data-cy=menu-signin]')
    menuSignin.should('be.visible')
    menuSignin.click()
    cy.get('[data-cy=signin-input-name]').should('be.visible')
    cy.get('[data-cy=signin-input-email]').should('be.visible')
    cy.get('[data-cy=signin-input-password]').should('be.visible')
    cy.get('[data-cy=signin-create-button]').should('be.visible')
  })

  it('4.3. [ERROR] Logout não visível', () => {
    cy.get('[data-cy=menu-logout]').should('not.exist')
  })

  it('4.4. [ERROR] Alterar perfil não visível', () => {
    cy.get('[data-cy=menu-update]').should('not.exist')
  })
});

describe('5. TopRightMenu em contexto de autenticação', () => {
  beforeEach('5.x. Login para Autenticação JWT, persistente em Cookies por 1h', () => {
    cy.visit('http://localhost:3000')
    const loginButtom = cy.get('[data-cy=login-button]').contains('Login')
    loginButtom.should('be.visible')
    loginButtom.click();
    
    const loginEmailInput = cy.get('[data-cy=login-input-email]')
    const loginPasswordInput = cy.get('[data-cy=login-input-password]')
    const loginButton = cy.get('[data-cy=login-button]').contains('Bem-Vindo(a)!')
    
    loginEmailInput.type('test@cypress.com')
    loginPasswordInput.type('$Test123')
    loginButton.click()

    cy.wait(2000)
    cy.getCookie('auth').should('exist')
    cy.getCookie('user').should('exist')
    cy.url().should('contain', '/todo-list')

    const menuButtom = cy.get('[data-cy=menu-button]')
    menuButtom.should('be.visible')
    menuButtom.click();
  })

  it('5.1. [SUCCESS] Alterar perfil visível', () => {
    const menuUpdate = cy.get('[data-cy=menu-update]')
    menuUpdate.should('be.visible')
    menuUpdate.click()
    cy.get('[data-cy=update-input-name]').should('be.visible')
    cy.get('[data-cy=update-input-email]').should('be.visible')
    cy.get('[data-cy=update-input-password]').should('be.visible')

    const updateButton = cy.get('[data-cy=update-button]')
    updateButton.should('be.visible')
    updateButton.click()

    cy.get('[id=toast-modal-warning-update]').should('be.visible')
    cy.get('[id=toast-modal-warning-update-title]').contains('Essa funcionalidade está por vir!')
    cy.get('[id=toast-modal-warning-update-description]').contains('Entre mais tarde para ver o resultado.')
    cy.get('[data-cy=update-button-back]').click()
    cy.url().should('contain', '/todo-list')
  })

  it('5.2. [SUCCESS] Logout visível', () => {
    const menuLogout= cy.get('[data-cy=menu-logout]')
    menuLogout.should('be.visible')
    menuLogout.click()

    cy.url().should('contain', 'http://localhost:3000')
    cy.getCookie('auth').should('not.exist')
    cy.getCookie('user').should('not.exist')
    
  })

  it('5.3. [ERROR] Login não visível', () => {
    cy.get('[data-cy=menu-login]').should('not.exist')
  })

  it('5.4. [ERROR] Cadastre-se não visível', () => {
    cy.get('[data-cy=menu-signin]').should('not.exist')
  })
});

describe('6. Dobra de features em TopRightMenu com qualquer contexto', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    const menuButtom = cy.get('[data-cy=menu-button]')
    menuButtom.should('be.visible')
    menuButtom.click();
  })

  it('6.1. [SUCCESS] Alteração de Cores', () => {
    const menuColorMode = cy.get('[data-cy=menu-change-color]')
    menuColorMode.should('be.visible')
    menuColorMode.click()
    cy.get('[data-cy=form-container]').should('have.css', 'background-color', 'rgb(45, 55, 72)')
  })

  it('6.2. [SUCCESS] Sobre mim', () => {
    const menuAboutMe = cy.get('[data-cy=menu-about-me]')
    menuAboutMe.should('be.visible')
    menuAboutMe.click()
    
    cy.on('url:changed', (newUrl) => {
      expect(newUrl).to.contain('https://rafaelpermec.github.io/')
    })
  })
});