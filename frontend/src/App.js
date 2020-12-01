import React, { useState } from "react";
import { useApolloClient } from "@apollo/client";
import AppBarComponent from "./components/AppBar";
import { Switch, Route } from "react-router-dom";
import LoginComponent from "./components/LoginComponent";
import DescriptionComponent from "./components/DescriptionComponent";

// eslint-disable-next-line react/prop-types
const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: "red" }}>{errorMessage}</div>;
};

const App = () => {
  const [token, setToken] = useState(null);
  const [page, setPage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <AppBarComponent />
      <DescriptionComponent />
      <Switch>
        <Route path="/login">
          <LoginComponent />
        </Route>
        <Route path="/">
          <p>pöö perusreitti</p>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
