'use client'


import React from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    loginHandler: () => { },
});

export default AuthContext;