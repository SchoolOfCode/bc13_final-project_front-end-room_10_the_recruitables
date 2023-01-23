// prevents uncaught exception email from making tests fail
Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

function wait(time) {
  cy.wait(time);
}

describe("go to profile - should be logged in", () => {
  it("Go to site", () => {
    cy.visit("http://localhost:3000/");
  });

  it("Check if customise avatar button exists", () => {
    cy.get('[data-testid="avatarButton"]').should("exist");
  });

  it("Check if lets play button exists", () => {
    cy.get('[data-testid="gameButton"]').should("exist");
  });

  it("Check if logout button exists", () => {
    cy.get('[data-testid="logoutButton"]').should("exist");
  });

  it("Check if game button exists", () => {
    cy.get('[data-testid="gameButton"]').should("exist");
    wait(1000);
  });

  it("Check if progress button exists", () => {
    cy.get('[data-testid="progressButton"]').should("exist");
  });

  // it("Click on profile", () => {
  //   wait(1000);
  //   cy.get('[data-testid="avatarButton"]').click();
  // });
});

// test avatar button
// check if name appears
// check score is not empty
// check all three top buttons are there
// check if logo exists
