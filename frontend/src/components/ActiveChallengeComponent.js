import React from "react";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(2),
    flexGrow: 1,
    marginBottom: 1,
  },
}));

const ActiveChallengeComponent = ({ challenge }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <p>testing. this is an active challenge.</p>
    </div>
  );
};

export default ActiveChallengeComponent;
