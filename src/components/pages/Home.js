import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContextProvider';


function Home() {  
  const stateAuthentic = useContext(UserContext);
  const isAuthenticated = stateAuthentic[1];
  
  return (
    <div className="page">
      <h1>LOGIN WITH OKTA REACT</h1>
      {
        isAuthenticated ?
          <h2>You are already signed in<br />
            Click here to sign out:</h2> :
          ''
      }
      <Link to="/restricted">
        {stateAuthentic[0]}
      </Link>
    </div>
  );
}

export default Home;