import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import BusinessCardMedia from './BusinessCardMedia';
import { connect } from "react-redux";
import Axios from "axios";


class SendToBusiness extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      info: []
    };

    //Debugging data for testing
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

  //Function gets business info and puts it into info[]
  async componentDidMount() {
    try {
        Axios.get(
            "https://pr4ezxqjkh.execute-api.us-east-1.amazonaws.com/prod/"
        )
            .then(result => this.setState({info: result.data.Items}))
            .catch(err => console.log(err));
    } catch (e) {
        alert(e);
    }
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
                    {this.state.info.map(tileData => (
                        <BusinessCardMedia
                        title={tileData.businessName}                           //Account name
                        img = {tileData.img}                                    //Avatar image
                        subheader = {"Joined: " + tileData.creationDate}        //Join date field
                        about = {tileData.businessEmail}                        //About section
                        worthKnowing = {tileData.worthKnowing}                  //Worth Knowing Section
                        addNotes = {tileData.addNotes}                          //Additional Notes section
                        id = {tileData.userID}
                        /*                       
                        date = {this.props.date}
                        sourceKey = {this.props.sourceKey}
                        artistName = {this.props.artistName}
                        artTitle = {this.props.artTitle}
                        url = {this.props.url}
                        descript = {this.props.descript}
                        userSub = {this.props.userSub}
                        */
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