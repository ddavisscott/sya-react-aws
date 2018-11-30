import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "@material-ui/core";

export default class ViewArt extends Component {
    constructor(props) {
        super(props);

        this.state = {
            art: null,
            artTitle: "title",
            artDescript: "description"
        };
    }

    render() {
        return (
            <div className="Home">
                <h1>Art goes here{this.state.art}</h1>
                <h2>{this.state.artTitle}</h2>
                <h2>{this.state.artDescript}</h2>
                <LinkContainer to="/Dashboard">
                    <Button>Back</Button>
                </LinkContainer>
            </div>
        );
    }
}
