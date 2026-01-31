it("Should open the main page", () => {

    cy.visit("localhost:3000");
    cy.contains("Books list").should("be.visible");
});