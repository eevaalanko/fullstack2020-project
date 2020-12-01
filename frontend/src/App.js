import React, { useState } from "react";
import AppBarComponent from "./components/AppBar";
import { Switch, Route } from "react-router-dom";
import LoginComponent from "./components/LoginComponent";
import DescriptionComponent from "./components/DescriptionComponent";
import useAuthorizedUser from "./hooks/useAuthoriserUser";
import ChallengeList from "./components/ChallengeList";

// eslint-disable-next-line react/prop-types
const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: "red" }}>{errorMessage}</div>;
};

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const user = useAuthorizedUser();
  console.log("user: ", user);

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  return (
    <div>
      <AppBarComponent user={user} />
      <Notify errorMessage={errorMessage} />
      <Switch>
        <Route path="/login">
          <LoginComponent setError={setErrorMessage} />
        </Route>
        <Route path="/challenges">
          {user && <ChallengeList username={user.username} />}
        </Route>
        <Route path="/">
          <DescriptionComponent />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
