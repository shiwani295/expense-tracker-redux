import React, { useState } from "react";
const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const Initialtoken = localStorage.getItem("token");
  const [token, setToken] = useState(Initialtoken);
  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    //if the user login set the token
    console.log(token);
    setToken(token);
    localStorage.setItem("token", token);
  };
  const logoutHandler = () => {
    //if the user logout set the token null
    setToken(null);
    localStorage.removeItem("token");
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  //this auth provider use as a whole context when we and we can access the token
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

//this authentication apply on - Auth-context-> index,js->authform->mainNavigation,
