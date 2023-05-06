import React from "react";

const LoginContext = React.createContext({
  isLoggedIn: false,
  username: "",
  key: '',
  onLogin: () => {},
  onLogout: () => {},
});

export default LoginContext;
