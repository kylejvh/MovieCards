// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// Programmatically sets state - as if user clicks "Avengers: Infinity War" in UI
Cypress.Commands.add("seedAndVisitMovie", (seedData = "fixture:avengersTestMovie.json") => {
  // How do I set up tests to emulate being on the proper page?

  // stub or actually send request
  // stub
  cy.server();
  cy.route({
    method: "GET",
    url:
      "https://api.themoviedb.org/3/movie/299536?api_key=0aecc06bb4fadb06b5f071fef0c2ce6d&&language=en-US&append_to_response=credits,videos,images&include_image_language=en,null",
    status: 200,
    response: seedData,
  });
  cy.visit("/popular/299536/details");

  // actually send request?
  //   cy.request({
  //     method: "GET",
  //     url: "https://api.themoviedb.org/3/movie/299536?api_key=0aecc06bb4fadb06b5f071fef0c2ce6d&&language=en-US&append_to_response=credits,videos,images&include_image_language=en,null",
  //     body: {
  //       email: Cypress.env("email"),
  //       password: Cypress.env("password"),
  //     },
  //   }).then(res => {
  //     window.localStorage.setItem("token", res.body.token);
  //   });
  // });
  // const store = ...
  // Set state programmatically - set state to avengers movie and go from there...
});
