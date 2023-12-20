describe('Constructor', () => {
    const selectors = {
      ingredient1: '[data-testid=643d69a5c3f7b9001cfa0940]',
      ingredient2: '[data-testid=643d69a5c3f7b9001cfa093c]',
      constructor: '[data-testid=constructor]',
      ingredientDetailsName: '[data-testid=ingredient_details-name]',
      ingredientDetailsValue: '[data-testid=ingredient_details-value]',
      modal: '[data-testid=modal]',
      closeButton: '[data-testid=close_button]'
    };
  
    beforeEach(() => {
      cy.visit('/');
      cy.intercept("GET", "user",  {fixture: "user.json"});
      cy.intercept("POST", "orders", {fixture: "order.json"});
      cy.intercept("GET", "ingredients", {fixture: "ingredients.json"});
    });
  
    it('should contain ingredient after drag and drop', () => {
      cy.get(selectors.ingredient1).trigger('dragstart');
      cy.get(selectors.constructor).trigger('drop');
      cy.get(selectors.ingredient2).trigger('dragstart');
      cy.get(selectors.constructor).trigger('drop');
    });
  
    it('should open modal and contain ingredient details after click', () => {
      cy.get(selectors.ingredient1).click();
      cy.get(selectors.ingredientDetailsName).should("have.text", 'Говяжий метеорит (отбивная)');
      cy.get(selectors.ingredientDetailsValue).should("have.text", 2674);
    });
  
    it('should close modal after click ESC key', () => {
      cy.get(selectors.ingredient1).click();
      cy.get('body').trigger('keydown', { key: 'Escape' });
      cy.get(selectors.modal).should("not.exist");
    });
  
    it('should close order modal after click close button', () => {
      cy.get(selectors.ingredient1).click();
      cy.get(selectors.modal).should("exist");
      cy.get(selectors.closeButton).click();
      cy.get(selectors.modal).should("not.exist");
    });
  });
  