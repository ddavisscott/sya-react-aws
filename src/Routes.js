import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import SignIn from "./containers/SignIn";
import ArtistSignUp from "./containers/ArtistSignUp";
import UploadPage from "./containers/UploadPage";
import ArtInfo from "./containers/ArtInfo";
import NotFound from "./containers/NotFound";
import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import Dashboard from "./containers/Dashboard";
import AboutUs from "./containers/AboutUs";
import ViewArt from "./containers/ViewArt";
import BusinessSignUp from "./containers/BusinessSignUp";
import SendToBusiness from "./containers/SendToBusiness";

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <AppliedRoute path="/Home" exact component={Home} props={childProps} />
    <AppliedRoute path="/AboutUs" exact component={AboutUs} props={childProps} />
    <UnauthenticatedRoute path="/SignIn" exact component={SignIn} props={childProps} />
    <UnauthenticatedRoute path="/ArtistSignUp" exact component={ArtistSignUp} props={childProps} />
    <UnauthenticatedRoute path="/BusinessSignUp" exact component={BusinessSignUp} props={childProps} />
    <AuthenticatedRoute path="/UploadPage" exact component={UploadPage} props={childProps} />
    <AuthenticatedRoute path="/ArtInfo" exact component={ArtInfo} props={childProps} />
    <AuthenticatedRoute path="/ViewArt" exact component={ViewArt} props={childProps} />
    <AuthenticatedRoute path="/Dashboard" exact component={Dashboard} props={childProps} />
    <AuthenticatedRoute path="/BusinessChoice" exact component={SendToBusiness} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;