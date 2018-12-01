import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "@material-ui/core";
import { connect } from 'react-redux';


class ViewArt extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Home">
                <h1>Art goes here</h1>
                <img src={this.props.url} alt={this.props.artTitle}/>
                <h2>{this.props.artTitle}</h2>
                <h2>{this.props.descript}</h2>
                <LinkContainer to="/Dashboard">
                    <Button>Back</Button>
                </LinkContainer>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    artistName: state.viewArtReducer.artistName,
    artTitle:   state.viewArtReducer.artTitle,
    url:        state.viewArtReducer.url,
    descript:   state.viewArtReducer.descript,
})

export default connect(mapStateToProps)(ViewArt);