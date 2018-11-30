import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "@material-ui/core";
import { connect } from 'react-redux';

class ViewArt extends Component {
    constructor(props) {
        super(props);

        this.state = {
            art: null,
            artTitle: "",
            artDescript: "",
        };

        try {
            const imageInfo = JSON.parse(this.props.image);

            this.setState({art: imageInfo.url});
            this.setState({artTitle: imageInfo.artTitle});
            this.setState({artDescript: imageInfo.description});
        } catch(err) {
            console.log(err.message);
        }

    }

    render() {
        return (
            <div className="Home">
                <h1>Art goes here</h1>
                <img src={this.state.art} alt={this.state.artTitle}/>
                <h2>{this.state.artTitle}</h2>
                <h2>{this.state.artDescript}</h2>
                <LinkContainer to="/Dashboard">
                    <Button>Back</Button>
                </LinkContainer>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    image:state.imageReducer.image
  })

export default connect (mapStateToProps)(ViewArt);