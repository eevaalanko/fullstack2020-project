import React, { useState } from "react";
import { makeStyles, Icon } from "@material-ui/core";
import { Calendar } from "react-calendar";
import { Check, Close } from "@material-ui/icons";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";

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
  const [value, setValue] = useState(new Date());
  const [checked, setChecked] = useState(false);

  console.log("calendar value: ", value);

  console.log("act challll:    ", challenge);
  console.log("end date:    ", new Date(challenge.endDate));
  console.log("start date:    ", new Date(challenge.startDate));

  console.log("checked: ", checked);

  const openCalendar = (value) => {
    console.log("value", value);
    setValue(value);
    setChecked(!checked);
  };

  return (
    <div>
      <p>Started: {dayjs(challenge.startDate).format("DD.MM.YYYY")}</p>
      <p>Ending: {dayjs(challenge.endDate).format("DD.MM.YYYY")}</p>
      <p>Click day on calendar to mark as done.</p>
      <Calendar
        onChange={openCalendar}
        value={value}
        minDate={new Date(challenge.startDate)}
        maxDate={new Date(challenge.endDate)}
        allowPartialRange={true}
        tileContent={
          checked ? (
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
