//tests using cache data - use these details to login and for requests. Change the variables when needed.
const email = "lucy@lucy.com";
const password = "password";
const avatarURL = "http://localhost:3001/api/users/avatars/";

// uncomment if not cached.
//  it("type in email and password", () => {
//   cy.get('[data-testid="emailInput"]').type('lucy@lucy.com');
//   cy.get('[data-testid="passwordInput"]').type('password');
//   cy.get('[data-testid="loginButton"]').click();
//  });

// prevents uncaught exception email from making tests fail
Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

function wait(time) {
  cy.wait(time);
}

describe("Logs in and checks Nav bar items exist", () => {
  it("Go to site", () => {
    cy.visit("http://localhost:3000/");
  });

  it("Check if game button exists", () => {
    cy.get('[data-testid="gameButton"]').should("exist");
  });

  it("Check if logout button exists", () => {
    cy.get('[data-testid="logoutButton"]').should("exist");
  });

  it("Check if progress button exists", () => {
    cy.get('[data-testid="progressButton"]').should("exist");
  });

  it("Check if score exists on nav bar and is not empty", () => {
    cy.get('[data-testid="navBarScore"]').should("exist");
    cy.get('[data-testid="navBarScore"]').should("not.be.empty");
  });
});

describe("Check the features of the profile", () => {
  it("Check if customise avatar button exists", () => {
    cy.get('[data-testid="avatarButton"]').should("exist");
  });

  it("Check if name appears", () => {
    cy.get('[data-testid="name"]').should("exist");
  });

  it("Check score is not empty", () => {
    cy.get('[data-testid="score"]').should("not.be.empty");
  });

  it("Check if avatar exists", () => {
    cy.get('[data-testid="avatarWrapProfile"]').should("exist");
  });

  it("check customise button navigates to /avatars", () => {
    cy.get('[data-testid="avatarButton"]').click();
    cy.url().should("include", "/avatars");
  });
});

describe("Check features of avatar page", () => {
  it("Check if customise avatar button exists", () => {
    cy.get('[data-testid="avatarButtonDiv"]').should("exist");
  });

  it("Check if there are 6 buttons in this div", () => {
    cy.get('[data-testid="avatarButtonDiv"]')
      .find("button")
      .should("have.length", 6);
  });

  it("Click on all the buttons to change (ants, head, body)", () => {
    cy.get('[data-testid="avatarButtonDiv"]')
      .find("button")
      .click({ multiple: true });
  });

  it("Check if wardrobe exists", () => {
    cy.get('[data-testid="avatar-wardrobe"]').should("exist");
  });

  it("Check if the color picker exists", () => {
    cy.get('[data-testid="colorSubmitButton"]').should("exist");
  });

  it("Check if the color picker works", () => {
    cy.get('[data-testid="colorSubmitButton"]').invoke("val", "#000000");
  });

  it("Check if avatar exists", () => {
    cy.get('[data-testid="avatar"]').should("exist");
  });

  it("Check if there is a submit button", () => {
    cy.get('[data-testid="submit-button"]').should("exist");
  });

  it("Check if the submit button works", () => {
    cy.request("PATCH", `${avatarURL}${email}`, {
      bodyId: 1,
      antId: 1,
      headId: 1,
      avColour: "#000000",
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});

describe("Go to and check progress page", () => {
  it("go to progress page", () => {
    cy.get('[data-testid="progressButton"]').click();
    cy.url().should("include", "/progress");
  });

  it("Check that there are 9 locked planets", () => {
    for (let i = 1; i < 9; i++) {
      cy.get(`#levelButton-${i}-lock`).should("exist");
    }
  });

  it("Check that there are the right amount of unlocked planets", () => {
    cy.get('[data-testid="navBarScore"]').then(($score) => {
      let score = $score.text().match(/\d+/g);
      score = score[0];
      let i = Math.floor(score / 50);
      for (let j = 1; j < i; j++) {
        cy.get(`#levelButton-${j}-unlock`).should("exist");
      }
    });
  });
});

describe("Go to and check game page", () => {
  it("Go to game page", () => {
    cy.get('[data-testid="gameButton"]').click();
    cy.url().should("include", "/game");
  });

  // check if game div exists
  it("Check if game div exists", () => {
    cy.get('[data-testid="questionDiv"]').should("exist");
  });

  // check if question text exists
  it("Check if question text exists", () => {
    cy.get('[data-testid="h2QuestionGameNumberofQuestions"]').should(
      "contain",
      "1)"
    );
  });

  // check if the score element exists
  it("Check if the score element exists", () => {
    cy.get('[data-testid="scoreDiv"]').should("exist");
    cy.get('[data-testid="h2ScoreGame"]').should("contain", "Score: 0");
  });

  // check if input exists
  it("Check if input exists", () => {
    cy.get('[data-testid="inputGame"]').should("exist");
  });

  // check if the input field can have data entered
  it("Check if the input field can have data entered", () => {
    cy.get('[data-testid="inputGame"]').type("1").type("{enter}");
  });

  // check if the correct answer element appears
  it("Check if the correct answer element appears and contains the right stuff", () => {
    cy.get('[data-testid="statementDiv"]').should("exist");
    cy.get('[data-testid="h3ResultGame"]').should(
      "contain",
      "The correct answer is:"
    );
    cy.get('[data-testid="h3ResultAnswerGame"]').should("exist");
  });

  //check if the next question button appears
  it("Check if the next question button appears", () => {
    cy.get('[data-testid="nextQuestionGameButton"]').should("exist");
    cy.get('[data-testid="nextQuestionGameButton"]').click();
  });
});
