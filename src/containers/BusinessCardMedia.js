import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import { connect } from "react-redux";
import { requestBusinessAction } from "../actions/requestBusinessAction";
import { LinkContainer } from "react-router-bootstrap";

//Styling
const styles = theme => ({
  card: {
    width: "90%"
    //minWidth: 1000
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto",
    [theme.breakpoints.up("sm")]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  title: {
    textTransform: "capitalize",
    textAlign: "left"
  }
});

/*
  //This Function will provide all the formatting neccessary for buisness cards to
  //be displayed on the /BusinessChoice page
  //This function is called in SendToBusiness.js and displays multiple cards
  //using information from the database
  */
function BusinessMediaCard(props) {
  const handleSubmit = event => {
    //ibusinessName, ibusinessEmail,ibusinessID,
    //ibusinessSubheader,ibusinessTheGood,ibusinessIMG,ibusinessAddNotes
    props.rba(
      props.title,
      props.about,
      props.id,
      props.subheader,
      props.worthKnowing,
      props.img,
      props.addNotes
    );
  };

  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<Avatar src={props.img} className={classes.avatar} />}
        action={
          props.disabled ? null : (
            <LinkContainer to="/ConfirmReviewRequest" onClick={handleSubmit}>
              <IconButton color="secondary">
                <AddIcon />
              </IconButton>
            </LinkContainer>
          )
        }
        title={props.title}
        subheader={props.subheader}
      />
      <CardContent>
        <Typography component="h2" variant="h4" align="left" gutterBottom>
          About:
        </Typography>
        <Typography
          variant="p"
          align="left"
          children={props.about}
          gutterBottom
        />
        <Typography component="h2" variant="h4" align="left" gutterBottom>
          Worth Knowing:
        </Typography>
        <Typography
          variant="p"
          align="left"
          children={props.worthKnowing}
          gutterBottom
        />
        <Typography component="h2" variant="h4" align="left" gutterBottom>
          Additional Notes:
        </Typography>
        <Typography
          variant="p"
          align="left"
          children={props.addNotes}
          gutterBottom
        />
      </CardContent>
      <CardActions className={classes.actions} disableActionSpacing />
    </Card>
  );
}

BusinessMediaCard.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapDispatchToProps = {
  rba: requestBusinessAction
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(BusinessMediaCard));
