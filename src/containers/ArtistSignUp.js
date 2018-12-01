import React, { Component } from "react";
import {
    HelpBlock,
    FormGroup,
    FormControl,
    ControlLabel
} from "react-bootstrap";
import { Auth } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";
import "./ArtistSignUp.css";

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
            console.log(e);
            alert(e.message);
        }

        this.setState({ isLoading: false });
    };

    /*

    */

    handleConfirmationSubmit = async event => {
        event.preventDefault();

        this.setState({ isLoading: true });

        try {
            await Auth.confirmSignUp(
                this.state.name,
                this.state.confirmationCode
            );
            console.log("here");
            await Auth.signIn(this.state.name, this.state.password);
            console.log("here");
            this.props.userHasAuthenticated(true);
            console.log("here");
            await Auth.currentAuthenticatedUser().then(user => {
                this.setState({ sub: user.attributes.sub });
            });
            console.log("here");
            const uploadFile = {
                key: this.state.sub,
                role: "artist",
                instragram: "instagramFamous"
            };
            console.log("here");
            await fetch(
                "https://b4l37v57w1.execute-api.us-east-1.amazonaws.com/prod/submit-request",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "text/plain"
                    },
                    mode: "no-cors",
                    body: JSON.stringify(uploadFile)
                }
            )
                .then(result => console.log(result))
                .catch(err => console.log(err));
            console.log("here");
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
                    <ControlLabel>Name</ControlLabel>
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
