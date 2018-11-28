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

import { LinkContainer } from "react-router-bootstrap";

const styles = {
    card: {
        maxWidth: 500
    },
    media: {
        height: 200,
        width: 200
    }
};

function MediaCard(props) {
    const { classes } = props;

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={props.src}
                    title={props.title}
                    style={styles.media}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.title}
                    </Typography>
                    <Typography component="p">{props.description}</Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <LinkContainer to="/ViewArt" information="info">
                    <Button size="small" color="primary">
                        VIEW
                    </Button>
                </LinkContainer>
                <LinkContainer to="/SubmitArt" info="hello">
                    <Button size="small" color="primary">
                        SUBMIT THIS PIECE
                    </Button>
                </LinkContainer>
            </CardActions>
        </Card>
    );
}

MediaCard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MediaCard);
