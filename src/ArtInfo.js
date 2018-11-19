import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import orange from '@material-ui/core/colors/orange';
const styles = theme => ({
  container: {
    display: 'grid',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  cssLabel: {
    '&$cssFocused': {
      color: orange[500],
    },
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: orange[500],
    },
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: orange[500],
    },
  },
  notchedOutline: {},
  bootstrapRoot: {
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  bootstrapInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 24,
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
});


class ArtistSignUp extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPass:'',
    instagram: ''
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.password === this.state.confirmPass) {
      console.log("same pass");
    }
    console.log(this.state);

    this.setState({
      artist_name: '',
      title: '',
      descript: '',
    })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render(){
    const { classes } = this.props;
    
    return (
      <div className={classes.container}>
        <title>Art Info</title>
        <FormControl className={classes.margin}>
          <InputLabel
            htmlFor="artist_name"
            classes={{
              root: classes.cssLabel,
              focused: classes.cssFocused,
            }}
          >
          Artist Name*
          </InputLabel>
          <Input
            id="artist_name"
            label="Artist_name"
            value={this.state.name}
            onChange={this.handleChange('artist_name')}
            classes={{
              underline: classes.cssUnderline,
            }}
          />
        </FormControl>
        <FormControl className={classes.margin}>
          <InputLabel
            htmlFor="title"
            classes={{
              root: classes.cssLabel,
              focused: classes.cssFocused,
            }}
          >
          Art Title*
          </InputLabel>
          <Input
            id="title"
            label="Title"
            value={this.state.name}
            onChange={this.handleChange('title')}
            classes={{
              underline: classes.cssUnderline,
            }}
          />
        </FormControl>
        <FormControl className={classes.margin}>
          <InputLabel
            htmlFor="descript"
            classes={{
              root: classes.cssLabel,
              focused: classes.cssFocused,
            }}
          >
          Please provide a description about the piece*
          </InputLabel>
          <Input
            id="descript"
            label="Descript"
            value={this.state.name}
            onChange={this.handleChange('descript')}
            classes={{
              underline: classes.cssUnderline,
            }}
          />
        </FormControl>
        <Button onClick={this.handleSubmit}>
          Back
        </Button>
        <Button onClick={this.handleSubmit}>
          SIGN UP
        </Button>
      </div>
    )
  }
}

ArtistSignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ArtistSignUp);