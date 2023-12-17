describe('template spec', () => {
  it('passes', () => {
    cy.get("[data-cy=ingredients]")
      .contains("Ингредиент 1")
      .trigger("dragstart");
    cy.get("[data-cy=constructor]").trigger("drop");
  })
})