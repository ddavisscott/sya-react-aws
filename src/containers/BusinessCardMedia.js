import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import AddIcon from '@material-ui/icons/Add';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const styles = theme => ({
  card: {
    width: 'auto',
    minWidth: 150
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  title: {
    textTransform: 'capitalize',
    textAlign: 'left'
  }
});

let state = { expanded: false };

  function BusinessMediaCard(props) {
    const { classes } = props;
    return (
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar 
                  src={props.img} className={classes.avatar}>
              </Avatar>
            }
            action={
              <IconButton color="secondary">
                <AddIcon />
              </IconButton>
            }
            title= {props.title}
            subheader= {props.subheader}
          />
          <CardContent>
            <Typography component="h2" variant="h4" align="left" gutterBottom>
              About:
            </Typography>
            <Typography variant="p" align="left" children={props.about} gutterBottom>
            
            </Typography>
            <Typography component="h2" variant="h4" align="left" gutterBottom>
              The Good:
            </Typography>
            <Typography variant="p" align="left" children={props.theGood} gutterBottom>
            
            </Typography>
            <Typography component="h2" variant="h4" align="left" gutterBottom>
              Additional Notes:
            </Typography>
            <Typography variant="p" align="left" children={props.addNotes} gutterBottom>
            
            </Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            
            
          </CardActions>
          
        </Card>
      );
  }


BusinessMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BusinessMediaCard);