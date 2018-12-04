import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";

/*
 * View art allows an artist to view a specific piece of art
 * from the artist dashboard. The title, artist name, and description
 * is listed. There is a back button that takes the artist back to
 * their artist dashboard.
 */
class ViewArt extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="Home" align="left">
                <h2>
                    <strong>Title: </strong>
                    {this.props.artTitle}
                </h2>
                <h2>
                    <strong>Artist: </strong>
                    {this.props.artistName}
                </h2>
                <h2>
                    <strong>Description: </strong>
                    {this.props.descript}
                </h2>
                <LinkContainer color="secondary" to="/Dashboard">
                    <Button size="medium" variant="outlined">
                        Back
                    </Button>
                </LinkContainer>
                <br />
                <img
                    src={this.props.url}
                    alt={this.props.artTitle}
                    height={"100%"}
                    width={"100%"}
                />
            </div>
        );
    }
}

// This puts the the art information into redux
const mapStateToProps = state => ({
    artistName: state.viewArtReducer.artistName,
    artTitle: state.viewArtReducer.artTitle,
    url: state.viewArtReducer.url,
    descript: state.viewArtReducer.descript
});

export default connect(mapStateToProps)(ViewArt);
