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
    <div>
      <p>testing. this is an active challenge.</p>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="own challenges table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Day</b>
              </TableCell>
              <TableCell>
                <b>Date</b>
              </TableCell>
              <TableCell>
                <b>Done</b>
              </TableCell>
              <TableCell>
                <b>Time</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    1
                  </TableCell>
                  <TableCell component="th" scope="row">
                    1.1.2021
                  </TableCell>
                  <TableCell component="th" scope="row">
                    true
                  </TableCell>
                  <TableCell component="th" scope="row">
                    10 min
                  </TableCell>
                </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ActiveChallengeComponent;
