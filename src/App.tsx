import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Security } from "@okta/okta-react";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { Header } from "./Header";
import { LoginCallback } from "@okta/okta-react";
import { useNavigate } from "react-router-dom";
import SecureRoute from "@okta/okta-react";
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CALLBACK_PATH = import.meta.env.VITE_CALLBACK_PATH;
const ISSUER = import.meta.env.VITE_ISSUER;
const HOST = import.meta.env.VITE_HOST;
const REDIRECT_URI = `http://${HOST}${CALLBACK_PATH}`;
const SCOPES = import.meta.env.VITE_SCOPES;
import { RequiredAuth } from "./SecureRoute";

import { ErrorBoundary } from "react-error-boundary";

import React, { useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';

export const Logout = (): JSX.Element => {
  const { oktaAuth } = useOktaAuth();
  const logout = async () => {
    await oktaAuth.signOut();
  };
  useEffect(() => {
    logout();
  }, []);
  return <h1>Logging you out...</h1>;
};


function ErrorFallback({ error }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  );
}

if (!SCOPES || !CLIENT_ID || !CALLBACK_PATH || !ISSUER || !HOST) {
  throw new Error("All environmental variables must be set");
}

const config = {
  issuer: ISSUER,
  clientId: CLIENT_ID,
  redirectUri: REDIRECT_URI,
  scopes: SCOPES.split(/\s+/),
};

const oktaAuth = new OktaAuth(config);

const App = () => {
  const navigate = useNavigate();
  const restoreOriginalUri = (_oktaAuth: unknown, originalUri: string) => {
    navigate(toRelativeUrl(originalUri || "/", window.location.origin));
  };

  return (
    <Security restoreOriginalUri={restoreOriginalUri} oktaAuth={oktaAuth}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Routes>
        <Route path="login/callback" element={<LoginCallback loadingElement={<>loading...</>} />} />
          <Route path="/" element={<RequiredAuth />}>
            <Route path="" element={<div>you have reached the secure route</div>} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </Security>
  );
};

export default App;
