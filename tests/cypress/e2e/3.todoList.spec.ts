describe("3. Tela de To-Do's List e Toasts de Sucesso e Erro:", () => {
  beforeEach('3.x. Login para Autenticação JWT, persistente em Cookies por 1h', () => {
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

    cy.get('[id=toast-success-login-title]').should('be.visible')
    cy.get('[id=toast-success-login-title]').contains('Olá, Joanna')
    cy.get('[id=toast-success-login-description]').contains('Seja bem-vindo(a)!')
    cy.get('[id=toast-expire-login-title]').should('be.visible')
    cy.get('[id=toast-expire-login-title]').contains('Sua sessão expira em:')
    cy.get('[id=toast-expire-login-description]').contains('Uma hora!')
    cy.getCookie('auth').should('exist')
    cy.getCookie('user').should('exist')
    cy.url().should('contain', '/todo-list')
  })

  it('3.1. [SUCCESS] Adicionar nova tarefa com campo válido', () => {
    cy.get('[data-cy=todo-add-button]').click()
    cy.url().should('contain', '/todo-list/add')
    cy.get('[data-cy=add-task]').type('Teste Cypress')
    cy.get('[data-cy=add-task-button]').click()
    cy.get('[id=toast-success-add-todo]').should('be.visible')
    cy.get('[id=toast-success-add-todo-title]').contains('Tarefa adicionada com sucesso!')
    cy.url().should('contain', '/todo-list')
    cy.get('[data-cy=todo-item-5]').should('be.visible')
  })

  it('3.2. [ERROR] Adicionar nova tarefa com campo inválido', () => {
    cy.get('[data-cy=todo-add-button]').click()
    cy.url().should('contain', '/todo-list/add')
    cy.get('[data-cy=add-task-button]').click()
    cy.get('[id=toast-error-add-todo]').should('be.visible')
    cy.get('[id=toast-error-add-todo-title]').contains('Erro ao adicionar tarefa!')
    cy.get('[id=toast-error-add-todo-description]').contains('Preencha o campo acima.')
    cy.get('[data-cy=add-task-back-button]').click()
    cy.url().should('contain', '/todo-list')
  })

  it('3.3. [SUCCESS] Modificar tarefa com campo válido', () => {
    cy.wait(5000)
    cy.get('[data-cy=todo-edit-5]').click()
    cy.url().should('contain', '/todo-list/update')
    cy.get('[data-cy=update-task]').type('Testes BDD em E2E')
    cy.get('[data-cy=update-task-button]').click()
    cy.get('[id=toast-success-update-todo]').should('be.visible')
    cy.get('[id=toast-success-update-todo-title]').contains('Tarefa modificada com sucesso!')
    cy.url().should('contain', '/todo-list')
    cy.wait(5000)
    cy.get('[data-cy=todo-item-5]').should('be.visible')
    cy.get('[data-cy=todo-text-5]').should('be.visible').contains('Testes BDD em E2E')
  })

  it('3.4. [ERROR] Modificar tarefa com campo inválido', () => {
    cy.wait(5000)
    cy.get('[data-cy=todo-edit-5]').click()
    cy.url().should('contain', '/todo-list/update')
    cy.get('[data-cy=update-task-button]').click()
    cy.get('[id=toast-error-update-todo]').should('be.visible')
    cy.get('[id=toast-error-update-todo-title]').contains('Erro ao modificar tarefa!')
    cy.get('[id=toast-error-update-todo-description]').contains('Preencha o campo acima.')
    cy.get('[data-cy=update-task-back-button]').click()
    cy.url().should('contain', '/todo-list')
  })

  it('3.5. [SUCCESS] Deletar tarefa em Popover', () => {
    cy.get('[data-cy=todo-add-button]').click()
    cy.url().should('contain', '/todo-list/add')
    cy.get('[data-cy=add-task]').type('Task Deletada')
    cy.get('[data-cy=add-task-button]').click()
    cy.wait(5000)
    cy.get('[data-cy=todo-delete-6]').click()
    cy.wait(5000)
    cy.get('[data-cy=popover-delete-todo-button-6]').should('be.visible')
    cy.get('[data-cy=popover-delete-todo-button-6]').click()
    cy.get('[id=toast-delete-todo-and-save]').should('be.visible')
    cy.get('[id=toast-delete-todo-and-save-title]').contains('Tarefa deletada com sucesso!')
    cy.get('[id=toast-delete-todo-and-save-description]').contains('Para gravar sua lista, pressione o botão "Salvar Lista".')
    cy.get('[data-cy=todo-save-button]').click()
  })

  it('3.6. [SUCCESS] Fluxo de marcação em checkbox para deletar tarefas em conjunto', () => {
    for (let i = 0; i < 3; i++) {
      cy.get('[data-cy=todo-add-button]').click()
      cy.url().should('contain', '/todo-list/add')
      cy.get('[data-cy=add-task]').type('Task Deletada')
      cy.get('[data-cy=add-task-button]').click()
    }
    cy.wait(5000)
    cy.get('[data-cy=todo-checkbox-5]').click()
    cy.get('[data-cy=todo-checkbox-6]').click()
    cy.get('[data-cy=todo-checkbox-7]').click()
    cy.get('[data-cy=todo-checkbox-8]').click()
    cy.get('[data-cy=todo-clear-button]').click()


    cy.get('[id=toast-clear-completed-todo]').should('be.visible')
    cy.get('[id=toast-clear-completed-todo-title]').contains('Sucesso!')
    cy.get('[id=toast-clear-completed-todo-description]').contains('Tarefas concluídas foram removidas!')

    cy.get('[data-cy=todo-save-button]').click()
    cy.get('[id=toast-save-todo-checklist]').should('be.visible')
    cy.get('[id=toast-save-todo-checklist-title]').contains('Sucesso!')
    cy.get('[id=toast-save-todo-checklist-description]').contains('Sua lista de To-Do foi salva com sucesso!')

    cy.get('[data-cy=todo-checkbox-5]').should('not.exist')
    cy.get('[data-cy=todo-checkbox-6]').should('not.exist')
    cy.get('[data-cy=todo-checkbox-7]').should('not.exist')
    cy.get('[data-cy=todo-checkbox-8]').should('not.exist')
  })
});
