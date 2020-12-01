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
  const [errorMessage, setErrorMessage] = useState(null);
  const client = useApolloClient();

  const logout = () => {
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
      <AppBarComponent />
      <Notify errorMessage={errorMessage} />
      <Switch>
        <Route path="/login">
          <LoginComponent setError={setErrorMessage} />
        </Route>
        <Route path="/">
          <DescriptionComponent />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
