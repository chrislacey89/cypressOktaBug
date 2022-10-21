import { OktaAuth } from "@okta/okta-auth-js";

// Okta
Cypress.Commands.add("loginByOktaApi", (username, password) => {
  const log = Cypress.log({
    displayName: "OKTA LOGIN",
    message: [`🔐 Authenticating | ${username}`],
    autoEnd: false,
  });

  log.snapshot("before");

  cy.request({
    method: "POST",
    url: `https://dev-44127998.okta.com/api/v1/authn`,
    body: {
      username,
      password,
    },
  }).then(({ body }) => {
    const user = body._embedded.user;
    const config = {
      issuer: `https://dev-44127998.okta.com/oauth2/default`,
      clientId: "0oa6vydtm7aZkSbNJ5d7",
      redirectUri: `http://localhost:5173/login/callback`,
      scope: ["openid", "email", "profile"],
    };

    const authClient = new OktaAuth(config);
    return authClient.token
      .getWithoutPrompt({
        sessionToken: body.sessionToken,
      })
      .then(({ tokens }) => {
        const userItem = {
          token: tokens.accessToken.value,
          user: {
            sub: user.id,
            email: user.profile.login,
            given_name: user.profile.firstName,
            family_name: user.profile.lastName,
            preferred_username: user.profile.login,
          },
        };

        window.localStorage.setItem("oktaCypress", JSON.stringify(userItem));

        log.snapshot("after");
        log.end();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  cy.visit('/');
});
