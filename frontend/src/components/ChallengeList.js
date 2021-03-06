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
import useActiveOwnChallenges from "../hooks/useOwnChallenges";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ChallengeList = ({ username }) => {
  const classes = useStyles();
  const challenges = useChallenges();
  const ownChallenges = useActiveOwnChallenges();
  return (
    <div>
      <p>
        Logged in as <b>{username}</b>
      </p>
      {ownChallenges && ownChallenges.length > 0 && (
        <div>
          <h2>Ongoing Challenges</h2>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="own challenges table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Name</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ownChallenges.map((ownChallenge) => (
                  <TableRow key={ownChallenge.id}>
                    <TableCell component="th" scope="row">
                      <Link to={`challenges/${ownChallenge.challenge.id}`}>
                        {ownChallenge.challenge.name}
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

      <h2>All Challenges</h2>
      <div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="all challenges table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Name</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {challenges &&
                challenges.map((challenge) => (
                  <TableRow key={challenge.id}>
                    <TableCell component="th" scope="row">
                      <Link to={`challenges/${challenge.id}`}>
                        {challenge.name}
                      </Link>
                    </TableCell>
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
