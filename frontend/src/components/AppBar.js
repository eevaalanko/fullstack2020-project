import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  MenuItem,
  Menu,
  Toolbar,
  IconButton,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const AppBarComponent = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const user = null; // TODO

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleClick}
            aria-controls="simple-menu"
            aria-haspopup="true"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Link to="/">About</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              {user ? (
                <Link to="/logout">Logout</Link>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </MenuItem>
          </Menu>
        <Typography variant="h6"  className={classes.title}>Your Challenge App</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AppBarComponent;
