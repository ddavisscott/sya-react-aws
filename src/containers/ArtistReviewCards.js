import React, { useImperativeMethods } from "react";
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
import {Axios} from 'axios';


const styles = {
    card: {
        maxWidth: 500,
    },
    media: {
        height: 500,
        width: 500
    }
};

function getBusinessInfo(info) {
    let array = [];
    try {
        Axios.get(
            "https://kdmro1ide5.execute-api.us-east-1.amazonaws.com/prod/?key=" + this.state.mySub
        )
        .then(result => array = result.data.Items)
        .catch(err => console.log(err));

    } catch (e) {
        alert(e);
    }

    return array;
}


function AristReviewCards(props) {

    const { classes } = props;

    //const businessInfo = this.getBusinessInfo(props.business)

    return (
        <div>
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={props.url}
                    title={props.artTitle}
                    style={styles.media}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" align="left">
                        Title: {props.artTitle}
                    </Typography>
                </CardContent>
                <CardContent style={{flex: 1, flexWrap: 'wrap', maxWidth: 500,}}>
                    <Typography gutterBottom variant="h5" component="h2" align="left"> 
                        Description: {props.descript}
                    </Typography>
                    {props.replied?  
                        <Typography gutterBottom variant="h5" component="h2" align="left">
                            Reply: {props.reply}
                        </Typography>: null
                     }
                </CardContent>
            </CardActionArea>
        </Card>
        </div>
    );
}


export default (withStyles(styles))(AristReviewCards);