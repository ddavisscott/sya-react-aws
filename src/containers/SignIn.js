import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./SignIn.css";
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 500,
    height: 300,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

export default class Login extends Component {

    state = {
      isLoading: false,
      username: "",
      password: ""
    };
 

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }


  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    try {
      await Auth.signIn(this.state.username, this.state.password);
      this.props.userHasAuthenticated(true);
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  };


  render() {
    return (
      <div className="SignIn">
        <form className={styles.container} style={styles.container} onSubmit={this.handleSubmit}>
          <TextField
              required
              id="standard-required"
              label="username"
              fullWidth
              className={styles.textField}
              onChange={this.handleChange("username")}
              value={this.state.username}
              style={{fontSize: 50}}
            />
            <hr/>
          <TextField
              required
              id="standard-required"
              label="password"
              fullWidth
              className={styles.textField}
              type="password"
              onChange={this.handleChange("password")}
              value={this.state.password}
          />
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Sign In"
            loadingText="Logging in…"
          />
        </form>
      </div>
    );
  }
}
