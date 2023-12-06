import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Auth0Provider } from "@auth0/auth0-react";
import Routing from "./Routing";

function App() {
  return (
    <Auth0Provider
      domain="dev-lvx04gpir514yisr.us.auth0.com"
      clientId="jAs3G0RPYsvmlsnfF2XurxhRW8EI3uYf"
      authorizationParams={{
        redirect_uri: `${window.location.origin}/login-callback`,
      }}
    >
      <Routing />
    </Auth0Provider>
  );
}

export default App;
