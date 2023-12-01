import * as React from "react";
import {
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import { OidcResponseHandler, redirectToLogin } from "./auth/auth";
import { AuthProvider, RequireAuth, AuthStatus } from "./auth/authProvider";
import "./App.css";

/****************************************************************************************/
import ChatRoom from "./chatroom/chatroom";
/****************************************************************************************/

export default function App() {
  return (
    <AuthProvider>
      <h1>Petrock OIDC Client Example</h1>
      <p>
        This example demonstrates a simple login flow with three pages: a public
        page, a protected page, and a login page. In order to see the protected
        page, you must first login.
      </p>
      <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<PublicPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/oidc-response" element={<OidcResponseHandler />} />
        <Route
          path="/protected"
          element={
            //Wrap the page which you want to be protected with <RequireAuth />
            <RequireAuth>
              <ProtectedPage />
            </RequireAuth>
          }
        />
      </Route>
      </Routes>
    </AuthProvider>
  );
}

function Layout() {
  return (
    <div>
      <AuthStatus />
      <ul>
        <li>
          <Link to="/">Public Page</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
      </ul>
      <Outlet />
      <Credit />
    </div>
  );
}


function LoginPage() {
  return (
    <div className="Login">
      <p>You must log in to view the Protected page</p>
      <button onClick={redirectToLogin}>Sign in</button>
    </div>
  );
}

function PublicPage() {

  return <div className="public">
      <h3>Public</h3>
      <p>You are currently viewing publicly-known information</p>
  </div>;
}

function ProtectedPage() {
  return <div className="protected">
      <h3>Protect</h3>
      <p>You are currently viewing protected (potentially sensitive) information</p>
      <ChatRoom />
  </div>;
}

function Credit() {
  return <p><b>Note:</b> This page is running the OIDC client framework from the SIPB Petrock <a href="https://github.com/sipb/petrock/tree/main/auth_client#readme">repo</a>.</p>
}