import React from 'react';
import { Container, Grid, InputAdornment, Paper, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import PersonAddIcon from '@material-ui/icons/PersonAddOutlined';
import ListItem from '@material-ui/core/ListItem/ListItem';
import Divider from '@material-ui/core/Divider/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar/Avatar';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import List from '@material-ui/core/List/List';
import Button from '@material-ui/core/Button/Button';
import { SideMenu } from '../components/SideMenu';
import { SearchTextField } from '../components/SearchTextField';
import { useDispatch } from 'react-redux';
import { fetchTweets } from '../store/ducks/tweets/actionCreators';
import { Tags } from '../components/Tags';
import { fetchTags } from '../store/ducks/tags/actionCreators';
import { useHomeStyles } from './Home/theme';
import { Users } from '../components/Users';

interface Layout {
  children: React.ReactNode;
}

export const Layout: React.FC<Layout> = ({ children }): React.ReactElement => {
  const classes = useHomeStyles();

  return (
    <Container className={classes.wrapper} maxWidth="lg">
      <Grid container spacing={3}>
        <Grid sm={1} md={3} item>
          <SideMenu classes={classes} />
        </Grid>
        <Grid sm={8} md={6} item>
          {children}
        </Grid>
        <Grid sm={3} md={3} item>
          <div className={classes.rightSide}>
            <SearchTextField
              variant="outlined"
              placeholder="Поиск по Твиттеру"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
            <Tags classes={classes} />
            <Users/>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};
