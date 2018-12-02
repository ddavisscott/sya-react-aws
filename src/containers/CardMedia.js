import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { connect } from 'react-redux';
import { LinkContainer } from "react-router-bootstrap";
import { requestReviewAction } from "../actions/requestReviewAction";
import { viewArtAction } from "../actions/viewArtAction";

const styles = {
    card: {
        maxWidth: 500,
    },
    media: {
        height: 300,
        width: 300
    }
};


function MediaCard(props) {
    const handleReviewSubmit =  event => {
        props.rra(
            props.date,
            props.sourceKey,
            props.artistName, 
            props.artTitle, 
            props.url,
            props.descript,
            props.userSub 
        );

    };

    const handleViewSubmit =  event => {
        props.viewArt(
            props.artistName, 
            props.artTitle, 
            props.url,
            props.descript,
        );

    };
    const { classes } = props;

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={props.url}
                    title={props.artTitle}
                    style={styles.media}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.artTitle}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions style={{align: "center"}}>
                <LinkContainer to="/ViewArt">
                    <Button size="small" color="primary" onClick={handleViewSubmit}>
                        VIEW
                    </Button>
                </LinkContainer>
                < LinkContainer to="/BusinessChoice" >
                    <Button size="small" color="primary" onClick={handleReviewSubmit}>
                        SUBMIT THIS PIECE
                    </Button>
                </ LinkContainer>
            </CardActions>
        </Card>
    );
}

MediaCard.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapDispatchToProps = {
    rra:     requestReviewAction,
    viewArt: viewArtAction,  
}

export default connect( null ,mapDispatchToProps )(withStyles(styles)(MediaCard));