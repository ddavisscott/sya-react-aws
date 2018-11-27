import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import "./SendToBusiness.css";
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


export default class SendToBusiness extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };

    this.tileData = [
        {
            img: 'placeholder',
            name: 'SYA Official',
            joinDate: 'April 20, 2018',
            author: 'author',
            cols: 1,
            about: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis teneturunde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquamdignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.",
            theGood: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis teneturunde suscipit, quam beatae rerum inventore consectetur,",
            addNotes: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur",

        },
        {
            img: 'placeholder2',
            name: 'BigInstagram Page',
            joinDate: 'March 18, 2018',
            author: 'author2',
            cols: 1, 
        },
        {
            img: 'placeholder',
            name: 'Dank Foodie Pics',
            joinDate: 'August 12, 2018',
            author: 'author',
            cols: 1,
        },
        {
            img: 'placeholder2',
            name: 'Best Memes of Instagram',
            joinDate: 'January 3, 2017',
            author: 'author2',
            cols: 1, 
        },
        {
            img: 'placeholder',
            name: '#noodleWorship',
            joinDate: 'April 19, 2018',
            author: 'author',
            cols: 1,
        },
        {
            img: 'placeholder2',
            name: 'Fruit of the Spoon',
            joinDate: 'April 21, 2018',
            author: 'author2',
            cols: 1, 
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
            <div className="Header">
                <h1>Business's</h1>
            </div>
            <div className ="Cards">
                <Grid cellHeight={160} justify={'center'} spacing={Number(16)} cols={1}>
                    {this.tileData.map(tileData => (
                        <BusinessCardMedia
                        title={tileData.name}
                        subheader = {"Joined: " + tileData.joinDate}
                        about = {tileData.about}
                        theGood = {tileData.theGood}
                        addNotes = {tileData.addNotes}
                        src={this.tileData.img}
                      />
                    ))}
                </Grid>
            </div>
        </div>
    );
  }
}