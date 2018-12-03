import React, { Component } from "react";
import {HelpBlock, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Auth } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";
import "./ArtistSignUp.css";
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
            redirect: false,
            sub: null
        };
    }

    validateForm() {
        return (
            this.state.name.length > 0 &&
            this.state.email.length > 0 &&
            this.state.password.length > 0 &&
            this.state.password === this.state.confirmPassword
        );
    }

    validateConfirmationForm() {
        return this.state.confirmationCode.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = async event => {
        event.preventDefault();

        this.setState({ isLoading: true });

        try {
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
        } catch (e) {
            console.log(e.message);
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
                this.state.confirmationCode)
            .catch(err => { console.log(err) });

            // Try to sign the artist in
            await Auth.signIn(this.state.name, this.state.password)
            .catch(err => { console.log(err) });
            
            // Get the user sub and set the state
            await Auth.currentAuthenticatedUser().then(user => {
                console.log(user);
                this.setState({ sub: user.attributes.sub });
            })
            .catch(err => { console.log(err) });

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
                <FormGroup controlId="confirmationCode" bsSize="large">
                    <ControlLabel>Confirmation Code</ControlLabel>
                    <FormControl
                        autoFocus
                        type="tel"
                        value={this.state.confirmationCode}
                        onChange={this.handleChange}
                    />
                    <HelpBlock>Please check your email for the code.</HelpBlock>
                </FormGroup>
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
                <FormGroup controlId="name" bsSize="large">
                    <ControlLabel>Username</ControlLabel>
                    <FormControl
                        autoFocus
                        type="text"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup controlId="email" bsSize="large">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        value={this.state.password}
                        onChange={this.handleChange}
                        type="password"
                    />
                </FormGroup>
                <FormGroup controlId="confirmPassword" bsSize="large">
                    <ControlLabel>Confirm Password</ControlLabel>
                    <FormControl
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                        type="password"
                    />
                </FormGroup>
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
