import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { LoginCallback, SecureRoute, Security } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import './styles/App.css';
import Header from './components/header/Header';
import Home from './components/pages/Home';
import Restricted from './components/pages/Restricted';
import Securedpage from './components/pages/Securedpage';
import Authentication from './components/contexts/UserContextProvider';

function App() {

  const oktaAuth = new OktaAuth({
    issuer: `https://${process.env.REACT_APP_ISSUER}/oauth2/default`,
    clientId: process.env.REACT_APP_CLIENT_ID,
    redirectUri: `${window.location.origin}/callback`
  });

  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri, window.location.origin));
  };

  return (
    <div className="App">
      <div className="page">
        <div className="content">

          <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
            <Authentication>
              <Header />
              <Route path='/' exact={true} component={Home} />
              <SecureRoute path='/restricted' exact={true} component={Restricted} />
              <SecureRoute path='/securedpage' exact={true} component={Securedpage} />
              <Route path='/callback' component={LoginCallback} />
            </Authentication>
          </Security>

        </div>
      </div>
    </div>
  );
}

export default App;