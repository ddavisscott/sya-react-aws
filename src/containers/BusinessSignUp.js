import React, { Component } from "react";
import { Auth } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";
import TextField from "@material-ui/core/TextField";
import "./BusinessSignUp.css";

export default class BusinessSignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
      newUser: null
    };
  }

  validateForm() {
    return (
      this.state.name.length > 0 &&
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password.length > 0
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
            "custom:role": "business"
          }
        });

        this.setState({
          newUser
        });
      }
    } catch (e) {
      alert(
        "Username must not have any spaces. Password must be greater than six characters long and have at least one upper case letter and one special symbol."
      );
      console.log(e);
      this.setState({ isLoading: false });
    }

    this.setState({ isLoading: false });
  };

  handleConfirmationSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await Auth.confirmSignUp(
        this.state.name,
        this.state.confirmationCode
      ).catch(err => console.log(err.message));

      await Auth.signIn(this.state.name, this.state.password).catch(err =>
        console.log(err.message)
      );

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
          label="Business Name"
          fullWidth
          className="name"
          onChange={this.handleChange("name")}
          value={this.state.name}
        />
        <TextField
          required
          id="standard-required"
          label="Email"
          fullWidth
          className="email"
          onChange={this.handleChange("email")}
          value={this.state.email}
        />
        <TextField
          required
          id="standard-required"
          label="Password"
          fullWidth
          className="password"
          onChange={this.handleChange("password")}
          value={this.state.password}
          type="password"
        />
        <TextField
          required
          id="standard-required"
          label="Confirm Password"
          fullWidth
          className="confirmPassword"
          onChange={this.handleChange("confirmPassword")}
          value={this.state.confirmPassword}
          type="password"
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
      <div className="BusinessSignUp">
        {this.state.newUser === null
          ? this.renderForm()
          : this.renderConfirmationForm()}
      </div>
    );
  }
}
