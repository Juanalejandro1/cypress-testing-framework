describe('test login', () => {
  it('should login successfully if the credentials are valid', () => {
    cy.visit('/', { failOnStatusCode: false });

    cy.url().should('include', Cypress.config().baseUrl);
    cy.contains('Inicio de Sesión', { timeout: 1000 }).should('be.visible');

    cy.env(['testUserEmail', 'testUserPassword']).then(({ testUserEmail, testUserPassword }) => {

      //LOGIN
      cy.get('input[placeholder="Correo electrónico"]').should('be.visible').as('loginEmailInput');
      cy.get('@loginEmailInput').clear();
      cy.get('@loginEmailInput').type(testUserEmail);

      cy.get('input[placeholder="Contraseña"]').should('be.visible').as('loginPasswordInput');
      cy.get('@loginPasswordInput').clear();
      cy.get('@loginPasswordInput').type(testUserPassword);

      cy.get('div').contains('Iniciar Sesión').should('be.visible').click();
      cy.get('div[tabindex=0]').contains('Seleccione una cuenta').should('be.visible').click();
      cy.get('div').contains('REST MOZZO SIMPLIFICADO').should('be.visible').click();
      cy.get('div[tabindex=0]').contains('Aceptar').should('be.visible').click();

      //JOIN TO ORDER MODULE AND SELECT CASHER
      cy.get('div[tabindex=0]').contains('Ordenar').should('be.visible').click();
      cy.get('div[tabindex=0]').contains('Seleccionar Caja').should('be.visible').click();
      cy.get('div[tabindex=0]').contains(/^Demo$/).should('be.visible').click();
      cy.get('div[tabindex=0]').contains('Enviar').should('be.visible').click();

      //PIN SELECTION
      cy.get('div[tabindex=0]').contains('9').should('be.visible').click();
      cy.get('div[tabindex=0]').contains('8').should('be.visible').click();
      cy.get('div[tabindex=0]').contains('7').should('be.visible').click();
      cy.get('div[tabindex=0]').contains('6').should('be.visible').click();
      cy.get('div[tabindex=0]').contains('').should('be.visible').click();

      //TABLE SELECTION
      cy.wait(3000);
      cy.get('div[dir=auto]').contains(/^Mesa 1$/, { timeout: 5000 }).should('be.visible').click();

      //CATEGORY AND FOOD SELECTION
      cy.get('div[dir=auto]').contains(/^ALMUERZOS$/).should('be.visible').click();
      cy.get('div[dir=auto]').contains(/^Casado con pollo$/).should('be.visible').click();
      cy.contains('Casado con pollo').parents().find('').first().click();
      cy.get('div[dir=auto]').contains(/^ABC Combo$/).should('be.visible').click();
      cy.get('div[dir=auto]').contains('Aros de cebolla').should('be.visible').click();
      cy.contains('Aros de cebolla').parents().find('div[style*="255, 25, 67"]').first().click();
      cy.get('div[dir=auto]').contains('¿Desea eliminar el producto?').should('be.visible');
      cy.get('div[dir=auto]').contains('Aceptar').should('be.visible').click();
      cy.get('input[placeholder=Cliente]').should('be.visible').as('clientNameInput');
      cy.get('@clientNameInput').clear();
      cy.get('@clientNameInput').type('CypressTeste2e');
      cy.get('div[tabindex=0]').contains('Prioridad').should('be.visible').click();


    });

  });
});