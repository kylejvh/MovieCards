// “Given, When, Then”, or “Arrange, Act, Assert”.
/// <reference types="cypress" />

describe("Favorites List Functionality", () => {
  beforeEach(() => {
    cy.seedAndVisitMovie();
    // cy.visit("/");
    // cy.url().should("include", "/popular");

    // cy.get("div").find("img:last").click();
    // cy.url().should("include", "/details");
  });

  it("adds/removes a movie from the localStorage favorites list", () => {
    cy.get("[data-cy=addFavorite]")
      .contains("Add to List")
      .click()
      .should(() => {
        expect(localStorage.getItem("favorites")).not.to.be.null;
        assert.typeOf(localStorage.getItem("favorites"), "string");
      });

    cy.window().its("store").invoke("getState");
    // Button should be replaced with removeButton
    // Button should contain text "Remove from List"
    // cy.get("[data-cy=removeFavorite]")
    //   .contains("Remove from List")
    //   .click()
    //   .should(() => {
    //     expect(localStorage.getItem("favorites")).to.be.null;
    //     assert.typeOf(localStorage.getItem("favorites"), "undefined");
    //   });
    // Does the remove functionality deserve a separate test block???
  });
});
