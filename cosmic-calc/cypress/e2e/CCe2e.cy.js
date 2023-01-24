// import { describe } from "node:test";

// //tests using cache data - use these details to login and for requests. Change the variables when needed.
// // const email = "lucy@lucy.com";
// // const password = "password";

// // uncomment if not cached.
// //  it("type in email and password", () => {
// //   cy.get('[data-testid="emailInput"]').type('lucy@lucy.com');
// //   cy.get('[data-testid="passwordInput"]').type('password');
// //   cy.get('[data-testid="loginButton"]').click();
// //  });

// // prevents uncaught exception email from making tests fail
// Cypress.on("uncaught:exception", (err, runnable) => {
//   return false;
// });

// function wait(time) {
//   cy.wait(time);
// }

// describe("Logs in and checks Nav bar items exist", () => {
//   it("Go to site", () => {
//     cy.visit("http://localhost:3000/");
//   });

//   it("Check if game button exists", () => {
//     cy.get('[data-testid="gameButton"]').should("exist");
//   });

//   it("Check if logout button exists", () => {
//     cy.get('[data-testid="logoutButton"]').should("exist");
//   });

//   it("Check if progress button exists", () => {
//     cy.get('[data-testid="progressButton"]').should("exist");
//   });

//   it("Check if score exists on nav bar and is not empty", () => {
//     cy.get('[data-testid="navBarScore"]').should("exist");
//     cy.get('[data-testid="navBarScore"]').should("not.be.empty");
//   });
// });

// describe("Check the features of the profile", () => {
//   it("Check if customise avatar button exists", () => {
//     cy.get('[data-testid="avatarButton"]').should("exist");
//   });

//   it("Check if name appears", () => {
//     cy.get('[data-testid="name"]').should("exist");
//   });

//   it("Check score is not empty", () => {
//     cy.get('[data-testid="score"]').should("not.be.empty");
//   });

//   it("Check if avatar exists", () => {
//     cy.get('[data-testid="avatarWrapProfile"]').should("exist");
//   });

//   it("check customise button navigates to /avatars", () => {
//     cy.get('[data-testid="avatarButton"]').click();
//     cy.url().should("include", "/avatars");
//   });
// });

// describe("Check features of avatar page", () => {
//   it("Check if customise avatar button exists", () => {
//     cy.get('[data-testid="avatarButtonDiv"]').should("exist");
//   });

//   it("Check if there are 6 buttons in this div", () => {
//     cy.get('[data-testid="avatarButtonDiv"]')
//       .find("button")
//       .should("have.length", 6);
//   });

//   it("Click on all the buttons to change (ants, head, body)", () => {
//     cy.get('[data-testid="avatarButtonDiv"]')
//       .find("button")
//       .click({ multiple: true });
//   });

//   it("Check if wardrobe exists", () => {
//     cy.get('[data-testid="avatar-wardrobe"]').should("exist");
//   });

//   it("Check if the color picker exists", () => {
//     cy.get('[data-testid="colorSubmitButton"]').should("exist");
//   });

//   it("Check if the color picker works", () => {
//     cy.get('[data-testid="colorSubmitButton"]').invoke("val", "#000000");
//   });

//   it("Check if avatar exists", () => {
//     cy.get('[data-testid="avatar"]').should("exist");
//   });

//   it("Check if there is a submit button", () => {
//     cy.get('[data-testid="submit-button"]').should("exist");
//   });

//   it("Check if the submit button works", () => {
//     cy.request("PATCH", `http://localhost:3001/avatars/email/${email}`, {
//       bodyId: 1,
//       antId: 1,
//       headId: 1,
//       avColour: "#000000",
//     }).then((response) => {
//       expect(response.status).to.eq(200);
//     });
//   });
// });
