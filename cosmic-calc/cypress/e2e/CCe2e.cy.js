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

//  it("type in email and password", () => {
//   cy.get('[data-testid="emailInput"]').type('lucy@lucy.com');
//   cy.get('[data-testid="passwordInput"]').type('password');
//   cy.get('[data-testid="loginButton"]').click();
//  });

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

describe ("go to avatar - should be logged in", () => {
  it("Go to site", () => {
    cy.visit("http://localhost:3000/avatars");
  });

  it("Check if customise avatar button exists", () => {
    cy.get('[data-testid="avatarButton"]').should("exist");
  });

  it("Click on button to change", () => {
    cy.get('[data-testid="avatarButton"]').click();
  });

  it("Check if avatar exists", () => {
    cy.get('[data-testid="avatar"]').should("exist");
  });

});

describe("go to profile - should be logged in", () => {
  it("Go to site", () => {
    cy.visit("http://localhost:3000/profile");
  });

  it("Check if customise avatar button exists", () => {
    cy.get('[data-testid="avatarButton"]').should("exist");
  });

  it("Check if name appears", () => {
    cy.get('[data-testid="name"]').should("exist");
  });

  it("Check score is not empty", () => {
    cy.get('[data-testid="score"]').should("not.be.empty");
  });

  it ("check customise button navigates to /avatars", () => {
    cy.get('[data-testid="avatarButton"]').click();
    cy.url().should("include", "/avatars");
});
});

describe("go to profile - should be logged in", () => {
  it("Go to site", () => {
    cy.visit("http://localhost:3000/profile");
  });

  it("Check if game button takes you to the games page", () => {
    cy.get('[data-testid="gameButton"]').click();
    cy.url().should("include", "/game");
  });
});