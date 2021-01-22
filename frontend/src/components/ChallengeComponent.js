import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useApolloClient, useMutation } from "@apollo/client";
import ActiveChallengeComponent from "./ActiveChallengeComponent";
import { CREATE_OWN_CHALLENGE } from "../graphql/mutations";
import { ALL_CHALLENGES } from "../graphql/queries";
import dayjs from "dayjs";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(2),
    flexGrow: 1,
    marginBottom: 1,
  },
}));

const ChallengeComponent = ({ challenge, user }) => {
  const startDate = dayjs().format("DD.MM.YYYY");
  const endDate = dayjs().add(30, "day").format("DD.MM.YYYY");
  const classes = useStyles();
  const client = useApolloClient();
  const [description, setDescription] = useState("testing... "); // TODO: implement an input
  const [createChallenge] = useMutation(CREATE_OWN_CHALLENGE, {
    refetchQueries: [{ query: ALL_CHALLENGES }],
    onError: (error) => {
      console.log("error: ", error);
      //  setError(error.toString())
    },
  });

  const startChallenge = () => {
    alert("wheee");
    return createChallenge({
      variables: {
        challengeID: challenge.id,
        userID: user.id,
        startDate: startDate,
        endDate: endDate,
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
        <ActiveChallengeComponent challenge={challenge} />
      ) : (
        <Button variant="outlined" color="primary" onClick={startChallenge}>
          Start the challenge!
        </Button>
      )}
    </div>
  );
};

export default ChallengeComponent;
