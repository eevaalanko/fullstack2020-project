import { Grid, Typography } from "@material-ui/core";
import React from "react";
import challengeAppImage from "../challengeApp.png";

const DescriptionComponent = () => (
  <div>
    <Grid container justify="center" alignItems="center">
      <Grid item xs={12}>
        <Typography variant="subtitle2" gutterBottom align="center">
          This app is for keeping score of your monthly sport challenges and
          sharing your accomplishments with your friends.
        </Typography>
      </Grid>
        <img src={challengeAppImage} height="200" alt="Challenge app" />
    </Grid>
  </div>
);

export default DescriptionComponent;
