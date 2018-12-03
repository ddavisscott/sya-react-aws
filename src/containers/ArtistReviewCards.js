import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const styles = {
    card: {
        maxWidth: 500,
    },
    media: {
        height: 500,
        width: 500
    }
};

function AristReviewCards(props) {

    const { classes } = props;

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
                    <strong>Title: </strong> {props.artTitle}
                    </Typography>
                </CardContent>
                <CardContent style={{flex: 1, flexWrap: 'wrap', maxWidth: 500,}}>
                    <Typography gutterBottom variant="h5" component="h2" align="left"> 
                        <strong>Artist Name:</strong> {props.artistName}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2" align="left"> 
                    <strong>Description:</strong> {props.descript}
                    </Typography>
                    {props.replied?  
                        <div>
                        <Typography gutterBottom variant="h5" component="h2" align="left">
                        <strong>Replied by: </strong>{props.businessName}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2" align="left">
                        <strong>Reply:</strong> {props.reply}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2" align="left">
                            <strong>{props.businessName}
                            {props.radios === "accepted"? " has agreed to post your artwork!" : " will not post your artwork."}
                            </strong>
                        </Typography>
                        </div> : null
                     }
                </CardContent>
            </CardActionArea>
        </Card>
        </div>
    );
}


export default (withStyles(styles))(AristReviewCards);