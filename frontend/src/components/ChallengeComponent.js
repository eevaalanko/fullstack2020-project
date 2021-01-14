import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useApolloClient, useMutation } from "@apollo/client";
import ActiveChallengeComponent from "./ActiveChallengeComponent";
import { CREATE_OWN_CHALLENGE } from "../graphql/mutations";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(2),
    flexGrow: 1,
    marginBottom: 1,
  },
}));

const ChallengeComponent = ({ challenge, user }) => {
  const classes = useStyles();
  const client = useApolloClient();
  const [description, setDescription] = useState("testing... ");  // TODO: implement an input
  const [createChallenge] = useMutation(CREATE_OWN_CHALLENGE);
  const startChallenge = () => {
    alert("wheee");
    return createChallenge({
      variables: {
        challengeID: challenge.id,
        userID: user.id,
        startDate: "01-01-2021",  // TODO: use date now
        endDate: "01-02-2121",
        description: description,
      },
    });
  };

  return (
    <div className={classes.root}>
      <h1>{challenge.name}</h1>
      <p>{challenge.description}</p>
      <p>
        <a href={challenge.link}>{challenge.link}</a>
      </p>
      <p>Challenge duration: {challenge.duration} days</p>
      {challenge.active ? (
        <p>
          <ActiveChallengeComponent />
        </p>
      ) : (
        <Button variant="outlined" color="primary" onClick={startChallenge}>
          Start the challenge!
        </Button>
      )}
    </div>
  );
};

export default ChallengeComponent;
