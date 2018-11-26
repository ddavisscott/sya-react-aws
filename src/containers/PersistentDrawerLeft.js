import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Account from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import Button from "@material-ui/core/Button";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { MuiThemeProvider } from "@material-ui/core/styles";
import "../main.css";
import { Auth } from "aws-amplify";

Auth.currentAuthenticatedUser()
  .then(user => console.log(user))
  .catch(err => console.log(err));

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    //marginLeft: 12,
    //marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  rightToolbar: {
    marginLeft: "auto",
    marginRight: -12
  }
});

class PersistentDrawerLeft extends React.Component {
  signOut = () => {
    Auth.signOut()
      .then(data => console.log(data), window.location.reload(true))
      .catch(err => console.log(err));
  };

  state = {
    open: false,
    dashboardClicked: false,
    currentRouter: ""
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          color="white"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Menu"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="Button"
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              {
                <img
                  src="https://i.imgur.com/5vIKxfR.png"
                  alt=""
                  height="40"
                  width="40"
                />
              }
            </IconButton>
            <MuiThemeProvider theme={theme}>
              <p
                className="title"
                fontFamily="Covered By Your Grace"
                variant="title"
                color="primary"
              >
                Share Yourself Artists
              </p>
              <section>
                <Button color="secondary">Freebie Credits: 0</Button>
                <Button color="primary">
                  Submit Your Work
                </Button>
                <Button style={{alignItems: 'flex-end'}} onClick={this.signOut}>Sign Out</Button>
              </section>
            </MuiThemeProvider>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <Divider />
          <List>
            <ListItem button onClick={this.handleDrawerClose} key="Dashboard">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>

            <ListItem button onClick={this.handleDrawerClose} key="My Account">
              <ListItemIcon>
                {" "}
                <Account />{" "}
              </ListItemIcon>
              <ListItemText primary="My Account" />
            </ListItem>

            <ListItem button onClick={this.handleDrawerClose} key="Reviews">
              <ListItemIcon>
                {" "}
                <MailIcon />{" "}
              </ListItemIcon>
              <ListItemText primary="Reviews" />
            </ListItem>
          </List>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
        </main>
      </div>
    );
  }
}

PersistentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(PersistentDrawerLeft);
