import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import CardMedia from "./CardMedia";
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import BusinessCardMedia from './BusinessCardMedia';
//import { connect } from "net";
import { connect } from "react-redux";


class SendToBusiness extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };

    this.tileData = [
        {
            img: "https://i.imgur.com/5vIKxfR.png",
            name: 'SYA Official',
            joinDate: 'April 20, 2018',
            cols: 1,
            about: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis teneturunde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquamdignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.",
            theGood: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis teneturunde suscipit, quam beatae rerum inventore consectetur,",
            addNotes: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur",

        },
        {
            img: "https://i.imgur.com/xOvnIwR.png",
            name: 'BigInstagram Page',
            joinDate: 'March 18, 2018',
            cols: 1, 
            about: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis teneturunde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquamdignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.",
            theGood: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis teneturunde suscipit, quam beatae rerum inventore consectetur,",
            addNotes: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur",

        },
        {
            img: "https://i.imgur.com/Nc9XyBq.jpg",
            name: 'Dank Foodie Pics',
            joinDate: 'August 12, 2018',
            cols: 1,
            about: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis teneturunde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquamdignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.",
            theGood: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis teneturunde suscipit, quam beatae rerum inventore consectetur,",
            addNotes: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur",

        },
        {
            img: "https://i.imgur.com/cj5aj2V.gif",
            name: 'Best Memes of Instagram',
            joinDate: 'January 3, 2017',
            cols: 1, 
            about: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis teneturunde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquamdignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.",
            theGood: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis teneturunde suscipit, quam beatae rerum inventore consectetur,",
            addNotes: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur",

        },
        {
            img: "https://i.imgur.com/Pi5eFC7.jpg",
            name: '#noodleWorship',
            joinDate: 'April 19, 2018',
            cols: 1,
            about: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis teneturunde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquamdignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.",
            theGood: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis teneturunde suscipit, quam beatae rerum inventore consectetur,",
            addNotes: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur",

        },
        {
            img: "https://i.imgur.com/cO5kvXi.jpg?1",
            name: 'Fruit of the Spoon',
            joinDate: 'April 21, 2018',
            cols: 1, 
            about: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis teneturunde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquamdignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.",
            theGood: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis teneturunde suscipit, quam beatae rerum inventore consectetur,",
            addNotes: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur",
        },
    ];
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }
    this.setState({ isLoading: false });
  }
  
    ImageGridList(props) {
        const { classes } = props;
    }

  render() {
    return (
        <div>
            <div>
                <h1>Share Yourself Business's</h1>
                <h2>Choose a business to send your art to!</h2>
            </div>
            <div>
                <Grid container cellHeight={160} justify="space-evenly" spacing={16} cols={1}>
                    {this.tileData.map(tileData => (
                        <BusinessCardMedia
                        title={tileData.name}                           //Account name
                        img = {tileData.img}                            //Avatar image
                        subheader = {"Joined: " + tileData.joinDate}    //Join date field
                        about = {tileData.about}                        //About section
                        theGood = {tileData.theGood}                    //The Good Section
                        addNotes = {tileData.addNotes}                  //Additional Notes section
                      />
                    ))}
                </Grid>
            </div>
        </div>
    );
  }
}
const mapStateToProps = state => ({
    date:state.requestReviewReducer.date,
    sourceKey:state.requestReviewReducer.sourceKey,
    artistName:state.requestReviewReducer.artistName,
    artTitle:state.requestReviewReducer.artTitle,
    url:state.requestReviewReducer.url,
    descript:state.requestReviewReducer.descript,
    userSub:state.requestReviewReducer.userSub
})

export default connect(mapStateToProps)(SendToBusiness);