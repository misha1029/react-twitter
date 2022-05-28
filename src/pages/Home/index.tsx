import React from "react";
import {
  Container,
  Grid,
  InputAdornment,
  Paper,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/SearchOutlined";
import PersonAddIcon from "@material-ui/icons/PersonAddOutlined";
import CircularProgress from "@material-ui/core/CircularProgress";

import ListItem from "@material-ui/core/ListItem/ListItem";
import Divider from "@material-ui/core/Divider/Divider";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar/Avatar";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import List from "@material-ui/core/List/List";
import Button from "@material-ui/core/Button/Button";

import { AddTweetForm } from "../../components/AddTweetForm";
import { Tweet } from "../../components/Tweet";
import { SideMenu } from "../../components/SideMenu";
import { useHomeStyles } from "./theme";
import { SearchTextField } from "../../components/SearchTextField";
import { useDispatch, useSelector } from "react-redux";
import { fetchTweets } from "../../store/ducks/tweets/actionCreators";
import {
  selectIsTweetsLoading,
  selectTweetsItems,
} from "../../store/ducks/tweets/selectors";
import { fetchTags } from "../../store/ducks/tags/actionCreators";
import { Tags } from "../../components/Tags";
import { Route } from "react-router-dom";
import { BackButton } from "../../components/BackButton";
import { FullTweet} from "../../components/FullTweet";

export const Home = (): React.ReactElement => {
  const classes = useHomeStyles();
  const dispatch = useDispatch();
  const tweets = useSelector(selectTweetsItems);
  const isLoading = useSelector(selectIsTweetsLoading);

  React.useEffect(() => {
    dispatch(fetchTweets());
    dispatch(fetchTags());
  }, [dispatch]);
  
  return (
    <Paper className={classes.tweetsWrapper} variant="outlined">
      <Paper className={classes.tweetsHeader} variant="outlined">
        <Route path="/home/:any">
          <BackButton />
        </Route>

        <Route path={['/home', '/home/search']} exact>
          <Typography variant="h6">Твиты</Typography>
        </Route>

        <Route path="/home/tweet">
          <Typography variant="h6">Твитнуть</Typography>
        </Route>
      </Paper>

      <Route path={['/home', '/home/search']} exact>
        <Paper>
          <div className={classes.addForm}>
            <AddTweetForm classes={classes} />
          </div>
          <div className={classes.addFormBottomLine} />
        </Paper>
      </Route>

      <Route path="/home" exact>
        {isLoading ? (
          <div className={classes.tweetsCentred}>
            <CircularProgress />
          </div>
        ) : (
          tweets.map((tweet) => <Tweet key={tweet._id} classes={classes} {...tweet} />)
        )}
      </Route>

      <Route path="/home/tweet/:id" component={FullTweet} exact />
    </Paper>
  );
};

