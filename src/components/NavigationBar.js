import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import "../main.css";
import { Auth } from 'aws-amplify';

const theme = createMuiTheme({
  palette: {
    primary: { main: "#000000" },
    secondary: { main: "#FF8F00", contrastText: "#FFFFFF" }
  },
  button: {
    margin: 100,
    font: "Roboto"
  },
  rightToolbar: {
    marginRight: -12,
    marginLeft: "auto"
  }
});

Auth.currentAuthenticatedUser()
    .then(user => console.log(user))
    .catch(err => console.log(err));


class NavigationBar extends React.Component {

  signOut = () => {
    Auth.signOut()
    .then(data => console.log(data), window.location.reload(true))
    .catch(err => console.log(err));
  }
  render() {
    return (
      <div>
        {this.props.name}

        <AppBar
          title={<img src="https://i.imgur.com/5vIKxfR.png" />}
          position="static"
          color="default"
        >
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            {
              <img
                src="https://i.imgur.com/5vIKxfR.png"
                alt=""
                height="40"
                width="40"
              />
            }
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
                <Button className="rightToolBar" color="primary">
                  Submit Your Work
                </Button>
                <Button onClick={this.signOut}>
                  Sign Out
                </Button> 
              </section>
            </MuiThemeProvider>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(theme)(NavigationBar);
