describe("Okta", function () {
  beforeEach(function () {
    cy.loginByOktaApi("chrislacey89+2@gmail.com", "bugpassword");
  });

  it("shows onboarding", function () {
    cy.contains("you have reached the secure route").should("be.visible");
  });
});
