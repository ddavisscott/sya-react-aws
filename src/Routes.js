import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import SignIn from "./containers/SignIn";
import ArtistSignUp from "./containers/ArtistSignUp";
import UploadImage from "./containers/UploadImage";
import UploadPage from "./containers/UploadPage";
import ArtInfo from "./containers/ArtInfo";
import NotFound from "./containers/NotFound";
import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import Dashboard from "./containers/Dashboard";

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <UnauthenticatedRoute path="/SignIn" exact component={SignIn} props={childProps} />
    <UnauthenticatedRoute path="/ArtistSignUp" exact component={ArtistSignUp} props={childProps} />
    <AuthenticatedRoute path="/UploadImage" exact component={UploadImage} props={childProps} />
    <AuthenticatedRoute path="/UploadPage" exact component={UploadPage} props={childProps} />
    <AuthenticatedRoute path="/ArtInfo" exact component={ArtInfo} props={childProps} />
    <AuthenticatedRoute path="/Dashboard" exact component={Dashboard} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;