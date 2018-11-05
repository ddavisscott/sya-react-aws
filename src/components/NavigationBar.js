import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import "../main.css";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

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

class NavigationBar extends React.Component {
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
              </section>
            </MuiThemeProvider>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(theme)(NavigationBar);
