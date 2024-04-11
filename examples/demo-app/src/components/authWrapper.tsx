/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2019-2022 by the xcube development team and contributors.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is furnished to do
 * so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React from "react";
import { AuthProvider, useAuth } from "react-oidc-context";
import { User } from "oidc-client-ts";
import { authFromAmbient } from "../ambientVariable";

const Auth = AuthProvider as unknown as any;

const AuthWrapper: React.FC<React.PropsWithChildren<any>> = ({ children }) => {
  let authClient: any;

  if (
    authFromAmbient.authority &&
    authFromAmbient.client_id &&
    authFromAmbient.extraQueryParams.audience &&
    authFromAmbient.scope
  )
    authClient = authFromAmbient;
  else
    authClient = {
      client_id: "Bu3HUGAi1MzzhtRbch90yzfWafi5drtU",
      authority: "https://dev-vg9je1h6.eu.auth0.com/",
      scope:
        "openid email profile send:sap modify:sap modify:alert read:dataset:AT read:dataset:MT",
      extraQueryParams: {
        audience: "https://newdp.gmatics.eu",
      },
    };

  if (!authClient) {
    return <>{children}</>;
  }

  const handleSigninCallback = (_user: User | void): void => {
    console.info("handleSigninCallback:", _user);
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  const handleRemoveUser = (): void => {
    console.info("handleRemoveUser");
    // go home after logout
    window.location.pathname = "/";
  };

  // TODO (forman): check whether we can (should?) use
  //   baseUrl.href (from util/baseurl.ts) here
  // const redirectUri = baseUrl.href;
  const redirectUri = window.location.origin;

  return (
    <Auth
      {...authClient}
      loadUserInfo={true}
      scope={authClient.scope || "openid email profile"}
      automaticSilentRenew={true}
      redirect_uri={redirectUri}
      post_logout_redirect_uri={null}
      popup_post_logout_redirect_uri={null}
      onSigninCallback={handleSigninCallback}
      onRemoveUser={handleRemoveUser}
    >
      {children}
    </Auth>
  );
};

export default AuthWrapper;
