import React, { useState, useEffect, useCallback } from 'react';

let logoutTimer;

export const AuthContext = React.createContext({
    token: '',
    userId: null,
    isLoggedIn: false,
    login: (token) => { },
    logout: () => { }
});

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();

    const remainingTime = adjExpirationTime - currentTime;
    return remainingTime;
};

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    const storedExpDate = localStorage.getItem('expTime');

    const remainingTime = calculateRemainingTime(storedExpDate);

    if (remainingTime <= 60000) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('expTime');

        return null;
    }

    return {
        token: storedToken,
        userId: storedUserId,
        duration: remainingTime
    };
}

const AuthContextProvider = (props) => {
    const tokenData = retrieveStoredToken();
    let initialToken;
    let initialUserId;
    if (tokenData){
        initialToken = tokenData.token;
        initialUserId = tokenData.userId;
    }
    
    const [token, setToken] = useState(initialToken);
    const [userId, setUserId] = useState(initialUserId);

    const userIsLoggedIn = !!token;

    const logoutHandler = useCallback(() => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('expTime');

        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    }, []);

    const loginHandler = (token, userId, expirationTime) => {
        setToken(token);
        setUserId(userId);
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('expTime', expirationTime);

        const remainingTime = calculateRemainingTime(expirationTime);

        logoutTimer = setTimeout(logoutHandler, remainingTime);
    };

    useEffect(() => {
        if (tokenData){
            console.log(tokenData.duration);
            logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }
    }, [tokenData, logoutHandler]);

    const contextValue = {
        token: token,
        userId: userId,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>;
};

export default AuthContextProvider;