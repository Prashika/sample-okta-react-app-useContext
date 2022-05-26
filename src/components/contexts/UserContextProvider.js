import React, { useState, createContext } from 'react';
import { Link } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

export const UserContext = createContext();

function AuthContextProvider(props) {
    const { oktaAuth, authState } = useOktaAuth();
    const authentic = authState.isAuthenticated;

    const login = async () => { await oktaAuth.signInWithRedirect(); }
    const logout = async () => { await oktaAuth.signOut(); }

    const userText = authentic ?
        <button onClick={logout}>SIGN OUT</button>
        : <button onClick={login}>SIGN IN</button>;

    return (
        <UserContext.Provider value={[userText, authentic]}>
            {props.children}
        </UserContext.Provider>
    );
}

export default AuthContextProvider;
