import React from "react";

const LoginContext = React.createContext({
    isLoggedIn: false,
    username: '',
});

export default LoginContext;