import React, { useState } from "react";
import { makeStyles, Icon } from "@material-ui/core";
import { Calendar } from "react-calendar";
import { Check, Close } from "@material-ui/icons";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import { useMutation } from "@apollo/client";
import { EDIT_OWN_CHALLENGE } from "../graphql/mutations";
import { ACTIVE_OWN_CHALLENGES } from "../graphql/queries";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(2),
    flexGrow: 1,
    marginBottom: 1,
  },
  checkedIcon: {
    fill: "green",
    fontSize: "1rem",
  },
  uncheckedIcon: {
    fill: "red",
    fontSize: "1rem",
  },
}));

const ActiveChallengeComponent = ({ challenge }) => {
  const classes = useStyles();
  const [value, setValue] = useState(null);
  const entries = challenge.entries;
  const [editChallenge] = useMutation(EDIT_OWN_CHALLENGE, {
    refetchQueries: [{ query: ACTIVE_OWN_CHALLENGES }],
    onError: (error) => {
      console.log("error: ", error);
      //  setError(error.toString())
    },
  });
  const setEntry = (e) => {
    setValue(e);
    return editChallenge({
      variables: {
        challengeID: challenge.id,
        entry: dayjs(e).format("YYYY-MM-DD"),
      },
    });
  };
  return (
    <div>
      <p>Started: {dayjs(challenge.startDate).format("DD.MM.YYYY")}</p>
      <p>Ending: {dayjs(challenge.endDate).format("DD.MM.YYYY")}</p>
      <p>Click day on calendar to mark as done.</p>
      <Calendar
        onChange={setEntry}
        value={value}
        minDate={new Date(challenge.startDate)}
        maxDate={new Date(challenge.endDate)}
        allowPartialRange={true}
        tileContent={({ date }) =>
          date < dayjs(challenge.startDate) ||
          date > dayjs(challenge.endDate) ? null : entries.includes(
              dayjs(date).format("YYYY-MM-DD")
            ) ? (
            <Check className={classes.checkedIcon} />
          ) : (
            <Close className={classes.uncheckedIcon} />
          )
        }
      />
    </div>
  );
};

export default ActiveChallengeComponent;
