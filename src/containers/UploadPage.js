import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
<<<<<<< HEAD:src/containers/UploadPage.js
import { LinkContainer } from "react-router-bootstrap";
=======
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
>>>>>>> e5763e987ed0468ecc77f7cff5d0378d83c18142:src/components/UploadPage.js

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
  constructor() {
    super();
    this.state = {
        file:null,
        name: '',
        description: '',
        fileNotSelected: true
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeDes = this.handleChangeDes.bind(this)
    this.BasicExample = this.BasicExample.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
}

BasicExample = () => {
}

handleOnClick = (event) => {
  return(
    <Route
        
        render={() => <Redirect to="/artInfo" />}
      />
  );

  
}

handleChange = (event) => {
    if ( event.target.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
            this.setState({image: e.target.result});
        };
        reader.readAsDataURL(event.target.files[0]);
        this.setState({fileNotSelected: false});
    }
    this.setState({file: event.target.files[0]})
}

handleChangeName = (event) => {
    this.setState({name: event.target.value});
}

handleChangeDes = (event) => {
    this.setState({description: event.target.value})
}

handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.file == null) {
        alert("File Not Chosen")
    }
    else {     
    const file = this.state.file;
    Storage.put(this.state.name, file, {
        contentType: 'image',
        bucket:'myapp-20181030214040-deployment'
    })
    .then (result => console.log(result))
    .catch(err => console.log(err));
    }
}


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
              <form onSubmit = {this.handleSubmit}>
              <Button variant="contained" color="secondary">
                <input
                  type = 'file' 
                  onChange = {this.handleChange} 
                  accept = "image/*"
                />
                Upload Your Art
              </Button>
              </form>
            </Grid>
            <Grid>
            <LinkContainer to="/ArtInfo">
               <Button disabled={this.state.fileNotSelected} variant="contained" color="Primary">
                Next
              </Button>
            </LinkContainer>
            </Grid>
          </Grid>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withStyles(theme)(UploadPage);
