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
} from "@material-ui/core";
import { Link } from "react-router-dom";
import useChallenges from "../hooks/useChallenges";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ChallengeList = ({ username }) => {
  const classes = useStyles();
  const challenges = useChallenges();
  console.log("challenges: ", challenges);
  return (
    <div>
      <p>
        Logged in as <b>{username}</b>
      </p>
      <h2>Challenges</h2>
      <div style={{ height: 400, width: "100%" }}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Name</b>
                </TableCell>
                <TableCell align="right">
                  <b>Description</b>
                </TableCell>
                <TableCell align="right">
                  <b>Duration (days)</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {challenges &&
                challenges.map((challenge) => (
                  <TableRow key={challenge.id}>
                    <TableCell component="th" scope="row">
                      <Link to={`challenges/${challenge.id}`}>{challenge.name}</Link>
                    </TableCell>
                    <TableCell align="right">{challenge.description}</TableCell>
                    <TableCell align="right">{challenge.duration}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ChallengeList;
