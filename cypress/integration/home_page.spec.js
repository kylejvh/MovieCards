// “Given, When, Then”, or “Arrange, Act, Assert”.

//* This test should actually test request/response... No stubbing
beforeEach(() => {
  cy.visit("/");
});

describe("Navigation", () => {
  it("visits the popular movies page", () => {
    cy.url().should("include", "/popular");

    cy.contains("Popular Movies");
  });
});

describe("Loading State", () => {
  it("displays a loading spinner", () => {
    cy.get("[data-cy=loadSpinner]")
      .should("be.visible")
      .and("contain", "Loading Results");
  });
});

describe("Fetching and Displaying Movie Data", () => {
  it("loads movies on page load", () => {
    cy.server();
    // Make get request to proper endpoints
    // Stub response, or programmatically set state?
    cy.route("GET");
  });

  it("properly displays loaded movies and details", () => {
    // an img element should be present...
  });
});
