import cypress from "cypress";

describe("Okta w/ cy.origin and cy.session", function () {
  beforeEach(function () {
    // establish your authenticated session
    cy.session("loginToOkta", () => {
        // visit your app
      cy.visit("/");

      // get redirected to Okta
      cy.origin("https://dev-44127998.okta.com", () => {
        // sign into Okta
        cy.get('[name="identifier"]').type("chrislacey89+2@gmail.com");
        cy.get('[name="credentials.passcode"]').type("bugpassword");
        cy.get('[type="submit"]').click();
      });
      // make sure you have navigated back
      cy.url().should('contain', Cypress.config('baseUrl'))
    });
  });

  it("shows onboarding", function () {
    // with cy.session and cy.origin, each test needs to visit
    cy.visit("/");
    cy.contains("you have reached the secure route").should("be.visible");
  });

  it("shows onboarding", function () {
    cy.visit("/");
    cy.contains("you have reached the secure route").should("be.visible");
  });
});
