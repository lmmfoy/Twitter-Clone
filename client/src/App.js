import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import Sidebar from "./Sidebar";
import HomeFeed from "./HomeFeed";
import Notifications from "./Notifications";
import Bookmarks from "./Bookmarks";
import TweetDetails from "./TweetDetails";
import Profile from "./Profile";
import styled from "styled-components";

const App = () => {
  return (
    <StyledDiv>
      <Router>
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <HomeFeed />
          </Route>
          <Route path="/notifications">
            <Notifications />
          </Route>
          <Route path="/bookmarks">
            <Bookmarks />
          </Route>
          <Route path="/tweet/:tweetId">
            <TweetDetails />
          </Route>
          <Route path="/:profileId">
            <Profile />
          </Route>
        </Switch>
      </Router>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  display: flex;
`;

export default App;
