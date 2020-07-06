// Given, When, Then...
// Given a user visits the homepage
// When the click the search bar
// and they type "The Prestige" into the .search-bar input
// Then the URL should include / search
// and the .search-bar input has "The Prestige" as its value.

describe('User loads homepage and searches for "The Prestige"', () => {
  it("Gets, types, and asserts", () => {
    cy.visit("/");
    cy.url().should("include", "/popular");

    cy.get("form").within(() => {
      cy.get('input[name="search"]').type("The Prestige");
      cy.root().submit();
    });

    cy.url().should("include", "/search");
  });
});
