import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(2),
    flexGrow: 1,
    marginBottom: 1,
  },
}));

const ChallengeComponent = ({ challenge }) => {
  const classes = useStyles();
  const startChallenge = () => {
    alert("wheee");
  };
  return (
    <div className={classes.root}>
      <h1>{challenge.name}</h1>
      <p>{challenge.description}</p>
        <p><a href={challenge.link}>{challenge.link}</a></p>
      <p>Challenge duration: {challenge.duration} days</p>
      {challenge.startDate ? (
        <p>Start date: {challenge.startDate}</p>
      ) : (
        <Button variant="outlined" color="primary" onClick={startChallenge}>
          Start the challenge!
        </Button>
      )}
    </div>
  );
};

export default ChallengeComponent;
