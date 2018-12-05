import React, { Component } from "react";
import { Auth } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";
import "./ArtistSignUp.css";
import TextField from "@material-ui/core/TextField";
/*
 * The ArtistSignUp component allows a new user to create new user that
 * is an artist. The fields to input include a username, email, password,
 * and a password confirmation. Once those fields are entered, an email
 * will be sent to the specified email that contains a confirmation code.
 * A new input field will request the confirmation to confirm an artist sign
 * in.
 */

export default class ArtistSignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
      newUser: null,
    };
  }

  validateForm() {
    return (
      this.state.name.length > 0 &&
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.confirmPassword.length > 0
    );
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
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
      if (this.state.password !== this.state.confirmPassword) {
        alert("Passwords must match. Please try again.");
        this.setState({ password: "" });
        this.setState({ confirmPassword: "" });
      } else {
        const newUser = await Auth.signUp({
          username: this.state.name,
          password: this.state.password,
          attributes: {
            email: this.state.email,
            "custom:role": "artist"
          }
        });

        this.setState({
          newUser
        });
      }
    } catch (e) {
      if (e.message === 'User already exists') {
        alert(e.message);
      } else {
        alert(
          "Username must not have any spaces. Password must be greater than six characters long and have at least one upper case letter and one special symbol."
        );
      }
    }

    this.setState({ isLoading: false });
  };

  handleConfirmationSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      // Try to confirm sign up
      await Auth.confirmSignUp(
        this.state.name,
        this.state.confirmationCode
      ).catch(err => {
        console.log(err);
      });

      // Try to sign the artist in
      await Auth.signIn(this.state.name, this.state.password).catch(err => {
        console.log(err);
      });

      // Pass the boolean true to the prop authenticadedUser
      this.props.userHasAuthenticated(true);

      this.props.history.push("/");
    } catch (e) {
      console.log(e.message);
      this.setState({ isLoading: false });
    }
  };

  renderConfirmationForm() {
    return (
      <form onSubmit={this.handleConfirmationSubmit}>
        <TextField
          required
          id="standard-required"
          label="Confirmation Code"
          fullWidth
          className="confirmationCode"
          onChange={this.handleChange("confirmationCode")}
          value={this.state.confirmationCode}
        />
        <LoaderButton
          block
          bsSize="large"
          disabled={!this.validateConfirmationForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Verify"
          loadingText="Verifying…"
        />
      </form>
    );
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          required
          id="standard-required"
          label="Username"
          className="name"
          onChange={this.handleChange("name")}
          value={this.state.name}
          fullWidth
        />
        <TextField
          required
          id="standard-required"
          label="Email"
          className="email"
          type="email"
          onChange={this.handleChange("email")}
          value={this.state.email}
          fullWidth
        />
        <TextField
          required
          id="standard-required"
          label="Password"
          className="password"
          type="password"
          onChange={this.handleChange("password")}
          value={this.state.password}
          fullWidth
        />
        <TextField
          required
          id="standard-required"
          label="Confirm Password"
          className="confirmPassword"
          type="password"
          onChange={this.handleChange("confirmPassword")}
          value={this.state.confirmPassword}
          fullWidth
        />
        <LoaderButton
          block
          bsSize="large"
          disabled={!this.validateForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Sign Up"
          loadingText="Signing up…"
        />
      </form>
    );
  }

  render() {
    return (
      <div className="ArtistSignUp">
        {this.state.newUser === null
          ? this.renderForm()
          : this.renderConfirmationForm()}
      </div>
    );
  }
}
