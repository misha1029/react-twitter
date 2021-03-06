import { Avatar, CircularProgress } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { BackButton } from "../../components/BackButton";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import classNames from "classnames";
import Skeleton from "@material-ui/lab/Skeleton";
import { useHomeStyles } from "../Home/theme";
import "./User.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsTweetsLoading,
  selectTweetsItems,
} from "../../store/ducks/tweets/selectors";
import { Tweet } from "../../components/Tweet";
import { fetchTweets } from "../../store/ducks/tweets/actionCreators";
import { User } from "../../store/ducks/user/contracts/state";
import { AuthApi } from "../../services/api/authApi";
import { RouteComponentProps } from "react-router-dom";
import { Button, Hidden } from "@material-ui/core";

export const UserPage: React.FC<RouteComponentProps<{ id: string }>> = ({
  match,
}) => {
  const classes = useHomeStyles();
  const tweets = useSelector(selectTweetsItems);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsTweetsLoading);
  const [activeTab, setActiveTab] = React.useState<number>(0);
  const [userData, setUserData] = React.useState<User | undefined>();

  React.useEffect(() => {
    const userId = match.params.id;
    dispatch(fetchTweets());
    if (userId) {
      AuthApi.getUserInfo(userId).then(({ data }) => {
        setUserData(data);
      });
    }
  }, [dispatch]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Paper
      className={classNames(classes.tweetsWrapper, "user")}
      variant="outlined"
    >
      <Paper className={classes.tweetsHeader} variant="outlined">
        <BackButton />

        <div>
          <Typography variant="h6">Misha Bro</Typography>
          <Typography variant="caption" display="block" gutterBottom>
            {tweets.length} ??????????
          </Typography>
        </div>
      </Paper>

      <div className="user__header"></div>

      <div className="user__info">
        <div className="user__avatar">
          <Avatar />
          <div className="user__button">
            <Button
              
              color="primary"
              variant="outlined"
              fullWidth
            >
              <Hidden smDown>???????????????? ??????????????</Hidden>
            </Button>
          </div>
        </div>

        {!userData ? (
          <Skeleton variant="text" width={250} height={30} />
        ) : (
          <h2 className="user__info-fullname">{userData?.fullname}</h2>
        )}
        {!userData ? (
          <Skeleton variant="text" width={60} />
        ) : (
          <span className="user__info-username">@{userData?.username}</span>
        )}

        <p className="user__info-description">
          Frontend Developer / UI Designer / JavaScript / ReactJS ??? React
          Native, NodeJS
        </p>
        <ul className="user__info-details">
          <li>Kyiv, Ukraine</li>
          <li>
            <a className="link" href="https://misha.bro">
              misha.bro
            </a>
          </li>
          <li>
            <br />
          </li>
          <li>???????? ????????????????: 24 ???????????? 1995 ??.</li>
          <li>??????????????????????: ???????????? 2021 ??.</li>
        </ul>
      </div>
      <Tabs
        value={activeTab}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
      >
        <Tab label="??????????" />
        <Tab label="?????????? ?? ????????????" />
        <Tab label="??????????" />
        <Tab label="????????????????" />
      </Tabs>
      <div className="user__tweets">
        {isLoading ? (
          <div className={classes.tweetsCentred}>
            <CircularProgress />
          </div>
        ) : (
          tweets.map((tweet) => (
            <Tweet
              key={tweet._id}
              classes={classes}
              images={tweet.images}
              {...tweet}
            />
          ))
        )}
      </div>
    </Paper>
  );
};
