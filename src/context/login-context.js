import React from "react";

const LoginContext = React.createContext({
  isLoggedIn: false,
  username: "",
  onLogin: () => {},
  onLogout: () => {},
});

export default LoginContext;
