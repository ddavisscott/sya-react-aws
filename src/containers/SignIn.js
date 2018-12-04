import React, { Component } from "react";
import { Auth } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";
import "./SignIn.css";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

// Styles for this SignIn component
const styles = theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 500,
        height: 300
    },
    dense: {
        marginTop: 19
    },
    menu: {
        width: 200
    }
});

/*
 * The Login component signs in users using amazon cognito. Login checks if
 * the username and the password and attempts to sign in the user. If the
 * username and password return a valid user the user is signed in.
 */
export default class Login extends Component {

    // State for the componenet includes a username and password along
    // with a boolean 'isLoading' to check for the submit button.
    state = {
        isLoading: false,
        username: "",
        password: ""
    };

    // validateForm checks if the username and password are not empty before 
    // allowing the user to submit their information.
    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    // handleChange takes in a name as a parameter that describes the name 
    // of the state and sets it the given value from the target
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    // handleSubmit is the function that signs the user into the AWS server
    // using cognito. If the user does not exit, Auth.signIn throws an error
    // that will be alerted to the user.
    handleSubmit = async event => {
        event.preventDefault();               // Prevents the page from reloading
        this.setState({ isLoading: true });   // Sets the button to loading

        try {
            // Sends the username and password form the state and try to sign 
            // the user in.
            await Auth.signIn(this.state.username, this.state.password);

            // If the user signs in then set isAuthenticated is true through
            // the function
            this.props.userHasAuthenticated(true);
        } catch (e) {
            alert(e.message);
            this.setState({ isLoading: false });
        }
    };

    /**
     * Render the html which contains the form for the user to sign in. The 
     * input fields include the username and password. The LoaderButton is
     * used attempt to sign the user in.
     */
    render() {
        return (
            <div className="SignIn">
                <form
                    className={styles.container}
                    style={styles.container}
                    onSubmit={this.handleSubmit}
                >
                    <Grid container spacing={24}>
                        <Grid item xs={12} align="center">
                            <TextField
                                required
                                id="standard-required"
                                label="username"
                                className={styles.textField}
                                fullWidth
                                onChange={this.handleChange("username")}
                                value={this.state.username}
                            />
                        </Grid>
                        <Grid item xs={12} align="center">
                            <TextField
                                required
                                id="standard-required"
                                label="password"
                                className={styles.textField}
                                fullWidth
                                type="password"
                                onChange={this.handleChange("password")}
                                value={this.state.password}
                            />
                        </Grid>

                        <Grid item xs={12} align="center">
                            <LoaderButton
                                block
                                bsSize="large"
                                disabled={!this.validateForm()}
                                type="submit"
                                isLoading={this.state.isLoading}
                                text="Sign In"
                                loadingText="Logging in…"
                            />
                        </Grid>
                    </Grid>
                </form>
            </div>
        );
    }
}
