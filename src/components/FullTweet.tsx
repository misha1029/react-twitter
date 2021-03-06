import { CircularProgress } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useHomeStyles } from "../pages/Home/theme";
import {
  fetchTweetData,
  setTweetData,
} from "../store/ducks/tweet/actionCreators";
import {
  selectIsTweetLoading,
  selectTweetData,
} from "../store/ducks/tweet/selectors";
import { Avatar, IconButton, Paper, Typography } from "@material-ui/core";
import classNames from "classnames";
import CommentIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import RepostIcon from "@material-ui/icons/RepeatOutlined";
import LikeIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ShareIcon from "@material-ui/icons/ReplyOutlined";
import format from 'date-fns/format'
import { ImageList } from "./ImageList";
import mediumZoom from "medium-zoom";

export const FullTweet: React.FC = (): React.ReactElement | null => {
  const classes = useHomeStyles();
  const dispatch = useDispatch();
  const tweetData = useSelector(selectTweetData);
  const isLoading = useSelector(selectIsTweetLoading);
  const params: { id?: string } = useParams();
  const id = params.id;

  React.useEffect(() => {
    if (id) {
      dispatch(fetchTweetData(id));
    }

    return () => {
      dispatch(setTweetData(undefined));
    };
  }, [dispatch, id]);

  React.useEffect(() => {
    if (!isLoading) {
      mediumZoom('.tweet-images img');
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className={classes.tweetsCentred}>
        <CircularProgress />
      </div>
    );
  }

  if (tweetData) {
    return (
      <Paper className={classes.fullTweet}>
        <div className={classNames(classes.tweetsHeaderUser)}>
          <Avatar
            className={classes.tweetAvatar}
            alt={`Аватарка пользователя ${tweetData.user.fullname}`}
            /* src={tweetData.user.avatarUrl} */
          />
          <Typography>
            <Link to = {`/user/${tweetData.user._id}`}><b>{tweetData.user.fullname}</b>&nbsp;</Link>
            <div>
              <span className={classes.tweetUserName}>
                @{tweetData.user.username}
              </span>
              &nbsp;
              <span className={classes.tweetUserName}>·</span>&nbsp;
              <span className={classes.tweetUserName}>1 ч</span>
            </div>
          </Typography>
        </div>
        <Typography
          className={classes.fullTweetText}
          variant="body1"
          gutterBottom
        >
          {tweetData.text}
          <div className="tweet-images">
              {tweetData.images && <ImageList classes={classes} images={tweetData.images} />}
            </div>
        </Typography>
        <div className={classes.infoTweet}>
          <div className={classes.text}>Перевести твит</div>
          <div className={classes.info}>{format(new Date(tweetData.createdAt), 'H:mm')} - {format(new Date(tweetData.createdAt), 'dd MMM yyyy')} - Twitter for Android</div>
        </div>

        <div className={classes.FulltweetFooter}>
          <div>
            <IconButton>
              <CommentIcon style={{ fontSize: 20 }} />
            </IconButton>
            <span>1</span>
          </div>
          <div>
            <IconButton>
              <RepostIcon style={{ fontSize: 20 }} />
            </IconButton>
          </div>
          <div>
            <IconButton>
              <LikeIcon style={{ fontSize: 20 }} />
            </IconButton>
          </div>
          <div>
            <IconButton>
              <ShareIcon style={{ fontSize: 20 }} />
            </IconButton>
          </div>
        </div>
      </Paper>
    );
  }

  return null;
};
