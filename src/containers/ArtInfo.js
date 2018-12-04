import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "./ArtInfo.css";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";
import { Auth, Storage } from "aws-amplify";
import { Redirect } from "react-router";

import TextField from "@material-ui/core/TextField";

class ArtInfo extends Component {
    constructor(props) {
        const uuidv4 = require("uuid/v4");
        super(props);
        this.state = {
            artistName: "",
            artTitle: "",
            descript: "",
            imageKey: uuidv4(),
            userName: "",
            sub: "",
            token: "",
            redirect: false
        };

        Auth.currentAuthenticatedUser().then(user => {
            this.setState({ userName: user.username });
            this.setState({ sub: user.attributes.sub });
            this.setState({ token: user.signInUserSession.idToken.jwtToken });
        });
    }

    handleSubmit = async event => {
        event.preventDefault();
        if (this.props.image == null) {
            alert("File Not Chosen");
        } else {
            const uploadFile = {
                art_title: this.state.artTitle,
                sub: this.state.sub,
                artist_name: this.state.artistName,
                descript: this.state.descript,
                upload_date: new Date(),
                image_key: this.state.imageKey
            };

            await Storage.put(this.state.imageKey, this.props.image, {
                contentType: "image",
                bucket: "myapp-20181030214040-deployment"
            }).catch(err => console.log(err));

            await fetch(
                "https://ckz78jlmb1.execute-api.us-east-1.amazonaws.com/prod/upload-image",
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

            this.setState({ redirect: true });
        }
    };

    Redirectrender = () => {
        if (this.state.redirect) {
            return <Redirect to="/Dashboard" />;
        }
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    render() {
        return (
            <div className="ArtInfo">
                {this.Redirectrender()}
                <form onSubmit={this.handleSubmit}>
                    <h1 align="left">Art Info</h1>
                    <TextField
                        required
                        id="standard-required"
                        label="Artist Name"
                        fullWidth
                        className="artistName"
                        onChange={this.handleChange("artistName")}
                        value={this.state.artistName}
                    />
                    <TextField
                        required
                        id="standard-required"
                        label="Art Title"
                        fullWidth
                        className="artTitle"
                        onChange={this.handleChange("artTitle")}
                        value={this.state.artTitle}
                    />
                    <TextField
                        required
                        id="standard-required"
                        label="Please provide a description about the piece"
                        fullWidth
                        multiline
                        rowsMax={10}
                        className="descript"
                        onChange={this.handleChange("descript")}
                        value={this.state.descript}
                    />
                    <div align="right">
                        <LinkContainer to="/UploadPage">
                            <Button>Back</Button>
                        </LinkContainer>
                        <Button type="submit">Upload</Button>
                    </div>
                </form>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    image: state.imageReducer.image
});

export default connect(mapStateToProps)(ArtInfo);
