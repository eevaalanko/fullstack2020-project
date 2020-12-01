import React from "react";
import { useQuery } from "@apollo/client";
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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const createData = (id, name, description, duration) => {
  return { id, name, description, duration };
};

// TODO: Get data from database
const rows = [
  createData(1, "The Plank Challenge", "...link to challenge", 30),
  createData(2, "The Yoga Challenge", "...link to challenge", 30),
  createData(3, "The Push up Challenge", "...link to challenge", 30),
  createData(4, "The MindFullness Challenge", "...link to challenge", 30),
  createData(5, "Your Custom Challenge", "...link to challenge", 30),
];

const columns = [
  { field: "name", headerName: "Name", width: 200 },
  { field: "description", headerName: "Description", width: 300 },
  {
    field: "duration",
    headerName: "Duration",
    type: "number",
    width: 90,
  },
];

const ChallengeList = ({ username }) => {
  const classes = useStyles();
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
                  <b>Duration</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    <Link to="/">{row.name}</Link>
                  </TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right">{row.duration}</TableCell>
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
