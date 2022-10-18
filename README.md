# About 
This repo is a fork of `cypress-test-tiny` and reproduces a issue using cypress
to programmatically log in to Okta before running tests.

I have followed the guide from the official docs and still have this issue.
https://docs.cypress.io/guides/end-to-end-testing/okta-authentication#What-you-ll-learn

For this demo you can use the username `chrislacey89+2@gmail.com` and password
`bugpassword` to log in with Okta. I have these values hard coded in the the
test file.

## Steps to reproduce
1. Run the react app using `npm run dev`.
1. Run the cypress tests using `npm run cypress:open`.
1. Click on the `login.cy.js` test.
1. Observe the test fail. The error seems to have something to do with
   `authClient.token.getWithoutPrompt` not returning.
The error message is: 
```js
// cy.then() timed out after waiting 4000ms.
// Your callback function returned a promise that never resolved.
// The callback function was:

({
body
}) => {
const user = body._embedded.user;
const config = {
issuer: https://dev-44127998.okta.com/oauth2/default,
clientId: "0oa6vydtm7aZkSbNJ5d7",
redirectUri: http://localhost:5173/login/callback,
scope: ["openid", "email", "profile"]
};
const authClient = new _oktaAuthJs.OktaAuth(config);
console.log("authClient", authClient);
return authClient.token.getWithoutPrompt({
sessionToken: body.sessionToken
}).then(({
tokens
}) => {
const userItem = {
token: tokens.accessToken.value,
user: {
sub: user.id,
email: user.profile.login,
given_name: user.profile.firstName,
family_name: user.profile.lastName,
preferred_username: user.profile.login
}
};
window.localStorage.setItem("oktaCypress", JSON.stringify(userItem));
log.snapshot("after");
log.end();
}).catch(err => {
});
}
```

# cypress-test-tiny

> Tiny Cypress E2E test case

Build status | Name | Description
:--- | :--- | :---
[![CircleCI](https://circleci.com/gh/cypress-io/cypress-test-tiny.svg?style=svg)](https://circleci.com/gh/cypress-io/cypress-test-tiny) | CircleCI | Linux & Mac & Win 64
[![Build status](https://ci.appveyor.com/api/projects/status/er7wpte7j00fsm8d/branch/master?svg=true)](https://ci.appveyor.com/project/cypress-io/cypress-test-tiny-fitqm/branch/master) | AppVeyor | Windows 32-bit
[![Build status](https://ci.appveyor.com/api/projects/status/bpwo4jpue61xsbi5/branch/master?svg=true)](https://ci.appveyor.com/project/cypress-io/cypress-test-tiny/branch/master) | AppVeyor | Windows 64-bit
[ ![Codeship Status for cypress-io/cypress-test-tiny](https://app.codeship.com/projects/98843020-d6d6-0135-402d-5207bc7a4d86/status?branch=master)](https://app.codeship.com/projects/263289) | Codeship Basic | Linux Docker

## Important

Note that this project **DOES NOT** include Cypress dependency in the [package.json](package.json). The reason for such omission is that we use this project to test every Cypress build and do not want to spend time installing `cypress@x.x.x` just to immediately install and test `cypress@y.y.y`. Which means when submitting pull requests with a bug report, please save the problematic version of Cypress in `package.json`. Simply run `npm install --save-dev cypress` or `npm i -D cypress@x.x.x` and commit the change before submitting a pull request.
