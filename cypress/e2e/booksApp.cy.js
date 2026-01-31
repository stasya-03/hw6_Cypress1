it("Should open the main page", () => {
  cy.visit("/");
  cy.contains("Books list").should("be.visible");
});

describe("Books app login tests", () => {
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

describe("Favorite books tests", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login("test@test.com", "test");
    cy.shouldBeLoggedInApp("test@test.com");
  });

  it("Add book to favorite from main page", () => {
    const title = "The little Prince";

    cy.contains(title).should("be.visible");
    cy.contains("Add to favorite").click();

    cy.contains("Favorites").click();
    cy.contains(title).should("be.visible");
    cy.contains("Delete from favorite").should("be.visible");
  });

  it("Delete book from favorite from main page", () => {
    const title = "The little Prince";

    cy.contains(title).should("be.visible");
    cy.contains("Delete from favorite").click();

    cy.contains("Add to favorite").should("be.visible");
  });

  it.skip("Add book to favorite from adding new book", () => {
    const titleNewBook = "The Lord of the Rings";
    const author = "J.R.R. Tolkien";

    cy.contains("Add new").click();
    cy.get("#title").type(titleNewBook);
    cy.get("#authors").type(author);
    cy.contains("add to favorite").click();
    cy.contains("Submit").click();

    cy.contains("Favorites").click();
    cy.contains(titleNewBook).should("be.visible");
  });
});
