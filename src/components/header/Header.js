import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContextProvider';

function Header() {
  const userText = useContext(UserContext);
  const isAuthenticated = userText[1];

  return (
    <header>
      <div>Okta React App</div>
      <ul className="menu">
        {
          isAuthenticated ?
            <>
              <li><Link to="/restricted">Restricted Page</Link></li>
              <li><Link to="/securedpage">Secured Page</Link></li>
            </> : ''
        }
        {userText[0]}
      </ul>
    </header>
  );
}

export default Header;