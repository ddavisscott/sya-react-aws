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
                <h2><strong>Title: </strong>{this.props.artTitle}</h2>
                <h2><strong>Description: </strong>{this.props.descript}</h2>
                <LinkContainer color = "secondary" to="/Dashboard">
                    <Button size = "medium" variant = "outlined">Back</Button>
                </LinkContainer>
                <br></br>
                <img src={this.props.url} alt={this.props.artTitle} height = {600}/>
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