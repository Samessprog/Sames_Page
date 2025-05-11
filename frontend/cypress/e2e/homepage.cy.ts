/// <reference types="cypress" />

describe('Strona główna', () => {
  it('pokazuje tytuł, nagłówek i działa przycisk inkrementacji', () => {
    cy.visit('/');

    cy.title().should('include', 'Moja Aplikacja');

    cy.get('h1').should('contain.text', 'Vite + React');

    cy.get('button')
      .contains(/^count is \d+$/)
      .as('countBtn')
      .should('be.visible')
      .and('have.text', 'count is 0')
      .click()
      .should('have.text', 'count is 2');
  });
});
