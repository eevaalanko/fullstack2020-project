import React from "react";
import { Route, Switch, Redirect } from "react-router-native";

import Text from "./Text";
import AppBar from "./AppBar";

const Main = () => {
  return (
    <>
      <AppBar />
      <Text color="primary">Simple text</Text>
      <Text style={{ paddingBottom: 10 }}>Text with custom style</Text>
      <Text fontWeight="bold" fontSize="subheading">
        Bold subheading
      </Text>
      <Text color="textSecondary">Text with secondary color</Text>
      <Switch>
        <Route path="/" exact>
          <Text fontWeight="bold" fontSize="subheading">
            Bold subheading
          </Text>
        </Route>
        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default Main;
