import React from "react";
import { Avatar, colors, Typography } from "@material-ui/core";
import { useHomeStyles } from "../pages/Home/theme";
import ArrowBottomIcon from "@material-ui/icons/KeyboardArrowDown";
import Popover from "@material-ui/core/Popover";
import { selectUserData } from "../store/ducks/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { Menu, MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { signOut } from '../store/ducks/user/actionCreators';

interface UserSideProfileProps {
  classes: ReturnType<typeof useHomeStyles>;
}

export const UserSideProfile: React.FC<UserSideProfileProps> = ({
  classes,
}: UserSideProfileProps) => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpenPopup = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopup = (): void => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    window.localStorage.removeItem('token');
    dispatch(signOut());
  };

  if (!userData) {
    return null;
  }

  return (
    <>
      <div onClick={handleOpenPopup} className={classes.sideProfile}>
        <Avatar />
        <div className={classes.sideProfileInfo}>
          <b>{userData.fullname}</b>
          <Typography style={{ color: colors.grey[500] }}>@{userData.username}</Typography>
        </div>
        <ArrowBottomIcon />
      </div>
      <Menu
        classes={{
          paper: classes.profileMenu,
        }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClosePopup}
        keepMounted>
        <Link to={`/user/${userData._id}`}>
          <MenuItem onClick={handleClosePopup}>Мой профиль</MenuItem>
        </Link>
        <MenuItem onClick={handleSignOut}>Выйти</MenuItem>
      </Menu>
    </>
  );
};

