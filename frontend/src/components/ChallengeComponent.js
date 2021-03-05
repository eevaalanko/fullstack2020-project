import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation } from "@apollo/client";
import ActiveChallengeComponent from "./ActiveChallengeComponent";
import { CREATE_OWN_CHALLENGE, STOP_OWN_CHALLENGE } from "../graphql/mutations";
import { ALL_CHALLENGES, ACTIVE_OWN_CHALLENGES } from "../graphql/queries";
import dayjs from "dayjs";
import CompletedChallengeComponent from "./CompletedChallengeComponent";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(2),
    flexGrow: 1,
    marginBottom: 1,
  },
}));

const ChallengeComponent = ({ challenge, user }) => {
  const today = dayjs();
  const endDate = dayjs().add(challenge.duration, "day");
  const classes = useStyles();
  const [stopChallenge] = useMutation(STOP_OWN_CHALLENGE, {
    refetchQueries: [{ query: ACTIVE_OWN_CHALLENGES }],
    onError: (error) => {
      console.log("error: ", error);
    },
  });
  const activeChallenge = challenge.ownChallenges.find((c) => c.active);
  const checkDate = () => {
    if (activeChallenge && today > endDate) {
      return stopChallenge({
        variables: {
          challengeID: activeChallenge.id,
        },
      });
    }
  };
  checkDate();
  const passiveChallenge =
    challenge.ownChallenges.length > 0 &&
    !activeChallenge &&
    challenge.ownChallenges[challenge.ownChallenges.length - 1];
  const [description, setDescription] = useState("testing... "); // TODO: implement an input
  const [createChallenge] = useMutation(CREATE_OWN_CHALLENGE, {
    refetchQueries: [{ query: ALL_CHALLENGES }],
    onError: (error) => {
      console.log("error: ", error);
      //  setError(error.toString())
    },
  });

  const startChallenge = () => {
    return createChallenge({
      variables: {
        challengeID: challenge.id,
        userID: user.id,
        startDate: today.format("YYYY-MM-DD"),
        endDate: endDate.format("YYYY-MM-DD"),
        description: description,
      },
    });
  };

  return (
    <div className={classes.root}>
      <h1>{challenge.name}</h1>
      <p>{challenge.description}</p>
      <p>
        <a href={challenge.link} target="_blank">
          {challenge.link}
        </a>
      </p>
      <p>Challenge duration: {challenge.duration} days</p>
      {activeChallenge ? (
        <ActiveChallengeComponent challenge={activeChallenge} />
      ) : (
        <div>
          {passiveChallenge && (
            <CompletedChallengeComponent challenge={passiveChallenge} />
          )}
          <br />
          <Button variant="outlined" color="primary" onClick={startChallenge}>
            {passiveChallenge
              ? "Restart the challenge!"
              : "Start the challenge!"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChallengeComponent;
