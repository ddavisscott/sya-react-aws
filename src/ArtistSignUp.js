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
      name: '',
      email: '',
      password: '',
      confirmPass:'',
      instagram: ''
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
        <FormControl className={classes.margin}>
          <InputLabel
            htmlFor="name"
            classes={{
              root: classes.cssLabel,
              focused: classes.cssFocused,
            }}
          >
          Name*
          </InputLabel>
          <Input
            id="name"
            label="Name"
            value={this.state.name}
            onChange={this.handleChange('name')}
            classes={{
              underline: classes.cssUnderline,
            }}
          />
        </FormControl>
        <FormControl className={classes.margin}>
          <InputLabel
            htmlFor="email"
            classes={{
              root: classes.cssLabel,
              focused: classes.cssFocused,
            }}
          >
          Email*
          </InputLabel>
          <Input
            id="email"
            label="Email"
            value={this.state.email}
            onChange={this.handleChange('email')}
            classes={{
              underline: classes.cssUnderline,
            }}
          />
        </FormControl>
        <FormControl className={classes.margin}>
          <InputLabel
            htmlFor="password"
            classes={{
              root: classes.cssLabel,
              focused: classes.cssFocused,
            }}
          >
          Password*
          </InputLabel>
          <Input
            id="password"
            type="password"
            label="Password"
            value={this.state.password}
            onChange={this.handleChange('password')}
            classes={{
              underline: classes.cssUnderline,
            }}
          />
        </FormControl>
        <FormControl className={classes.margin}>
          <InputLabel
            htmlFor="confirmPass"
            classes={{
              root: classes.cssLabel,
              focused: classes.cssFocused,
            }}
          >
          Confirm Password
          </InputLabel>
          <Input
            id="confirmPass"
            type="password"
            label="ConfirmPass"
            value={this.state.confirmPass}
            onChange={this.handleChange('confirmPass')}
            classes={{
              underline: classes.cssUnderline,
            }}
          />
        </FormControl>
        <FormControl className={classes.margin}>
          <InputLabel
            htmlFor="instagram"
            classes={{
              root: classes.cssLabel,
              focused: classes.cssFocused,
            }}
          >
          Instagram
          </InputLabel>
          <Input
            id="instagram"
            label="Instagram"
            value={this.state.instagram}
            onChange={this.handleChange('instagram')}
            classes={{
              underline: classes.cssUnderline,
            }}
          />
        </FormControl>
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