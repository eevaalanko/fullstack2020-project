import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import { useApolloClient } from "@apollo/client";

// eslint-disable-next-line react/prop-types
const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: "red" }}>{errorMessage}</div>;
};
const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

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

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    );
  }

  return (
    <div>
      <button onClick={logout}>logout</button>
      <Notify errorMessage={errorMessage} />
      <h1>Challenge App</h1>
    </div>
  );
};

export default App;
