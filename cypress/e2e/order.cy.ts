describe('Constructor', () => {
    const selectors = {
        constructor: '[data-testid=constructor]',
       };
    beforeEach(() => {
        cy.visit('/')
        cy.intercept("GET","api/ingredients",{fixture: "ingredients.json"});
        cy.intercept("GET", "api/auth/user",  {fixture: "user.json"});
        cy.intercept("POST", "api/orders", {fixture: "order.json"});

     })

    afterEach(function () {
        cy.clearLocalStorage();
        cy.clearCookies();
    })
    it('should open order modal after order button click ', () => {
        cy.setCookie('authToken', 'test-accessToken');
        cy.reload();
        cy.get('[data-testid=643d69a5c3f7b9001cfa0940]').trigger('dragstart')
        cy.get(selectors.constructor).trigger('drop')
        cy.get('[data-testid=643d69a5c3f7b9001cfa093c]').trigger('dragstart')
        cy.get(selectors.constructor).trigger('drop')
        cy.getCookie('authToken').should('exist');
        cy.get('[data-testid=order-button]').click()
        cy.get('[data-testid=modal]').should("exist")
        cy.get('[data-testid=order_details-number]').should("have.text",2023)
    })
})