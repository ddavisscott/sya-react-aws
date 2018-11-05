import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#FFFFFF" },
    secondary: { main: "#FF8F00", contrastText: "#FFFFFF" }
  },
  button: {
    margin: 600
  },
  typography: {
    fontFamily: ["Roboto"]
  }
});

class UploadPage extends React.Component {
  render() {
    return (
      <div className="page" style={{ padding: 40 }}>
        {this.props.name}
        <Typography variant="h3" component="h3" gutterBottom>
          Great, Let's Get Started
        </Typography>
        <Typography variant="h5" gutterBottom>
          Blogs and labels typically reply within hours.
        </Typography>
        <Typography component="p" gutterBottom>
          If a blog decides that they like your piece, they'll let you know when
          and how they plan to share it. You'll be able to chat with them, and
          share any information you think they might need for their coverage.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Let's Upload your art Piece!
        </Typography>
        <Divider />
        <MuiThemeProvider theme={theme}>
          <Grid container spacing={20}>
            <Grid>
              <Button variant="contained" color="secondary">
                Upload Your Art
              </Button>
            </Grid>
            <Grid>
              <Button disabled variant="contained" color="Primary">
                Next
              </Button>
            </Grid>
          </Grid>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withStyles(theme)(UploadPage);
