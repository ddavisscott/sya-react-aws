import React, { Component } from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import "./AboutUs.css";
import { Button } from "@material-ui/core";

export default class AboutUs extends Component {
  render() {
    return (
        <div>
            {<img
                  src= "https://i.imgur.com/qJaG6pe.jpg"
                  alt=""
                  height="400"
                  width="1100"
            />}
            <div className="mainHead">
                <h1>About Us </h1>
                <br></br>
                <p>
                    <strong>ShareYourselfArtists.com</strong> connects visual artists to the art pages and sites that are making internet artists famous all around the world. <strong>Share Yourself Artists</strong> makes the submission process simple and fun! We have helped hundreds of artists get recognition for their artwork. We are also the only submission platform that helps art pages earn money for maintaining their blog. By using our site, you are supporting the online arts industry!
                </p>
                <br></br>
            </div>

            <div className="people">
                <h1><strong>Nick McElmurry</strong></h1>
                    <br></br>
                    <p>
                        <em>(Founder/Chief Executive Officer)</em>
                        <br></br>
                        Nick's business and marketing expertise derive from both his work experiences and his personal endeavors. He has worked as a marketing executive for companies including, but not limited to, Jamba Juice, Sunpower, and State Farm. Though his specialty is social media and internet marketing, for he has accumulated over 100,000 followers across his personal project pages, Nick also has experience throwing and organizing events. <a href="https://battleofthebaybands.com">He founded Battle of The Bay (Bands) in 2018</a>, a competition including over 30 bands from 5 different cities. He also has a soft spot for the arts industry. He is a musician in many different bands, but is most known for his band <a href = "https://soundcloud.com/water-color-weekend">Water Color Weekend.</a>
                    </p>
        
                <h1><strong>Scott Davis</strong></h1>
                    <br></br>
                    <p>
                        <em>(Software Engineer)</em>
                        <br></br>
                        Scott handles much of our development work and other stuff. As our Chief Creative/Developer, he's responsible for the overall work product of the company, overseeing our Design & Development. In the rare event that he's not working, he spends as much time as possible with his wife and his daughter. While he does occasionally get some sleep, it's usually when he passes out in his chair while working through the middle of the night.
                    </p>
            </div>
        </div>
    );
  }
}