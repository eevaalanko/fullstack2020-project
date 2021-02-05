import React from "react";
import { makeStyles } from "@material-ui/core";
import dayjs from "dayjs";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(2),
    flexGrow: 1,
    marginBottom: 1,
  },
}));

const CompletedChallengeComponent = ({ challenge }) => {
  const classes = useStyles();
  console.log("own chall: ", challenge);

  return (
    <div>
      <p>
        You finished the challenge{" "}
        {dayjs(challenge.endDate).format("DD.MM.YYYY")}!
      </p>
      Results:{challenge.entries.length} days done.
    </div>
  );
};

export default CompletedChallengeComponent;
