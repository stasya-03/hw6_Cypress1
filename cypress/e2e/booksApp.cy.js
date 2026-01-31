describe("Books app tests", () => {
  it("Should open the main page", () => {
    cy.visit("/");
    cy.contains("Books list").should("be.visible");
  });

  it("Successfully login", () => {
    cy.visit("/");
    cy.login("test@test.com", "test");
    cy.contains("Добро пожаловать test@test.com").should("be.visible");
  });

  it("Wrong login", () => {
    cy.visit("/");
    cy.login(" ", "test");
    cy.get("#mail")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
  });

  it("Wrong password", () => {
    cy.visit("/");
    cy.contains("Log in").click();
    cy.get("#mail").type("test@test.com");
    cy.contains("Submit").click();
    cy.get("#pass")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
  });
});
