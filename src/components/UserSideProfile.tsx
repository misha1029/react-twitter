import React from 'react';
import { Avatar, colors, Typography } from '@material-ui/core';
import { useHomeStyles } from '../pages/Home/theme';
import ArrowBottomIcon from '@material-ui/icons/KeyboardArrowDown';
import Popover from '@material-ui/core/Popover';

interface UserSideProfileProps {
  classes: ReturnType<typeof useHomeStyles>;
}

export const UserSideProfile: React.FC<UserSideProfileProps> = ({
    classes,
  }: UserSideProfileProps): React.ReactElement => {

const [visiblePopup, setVisiblePopup] = React.useState<boolean>(false);
  const anchorRef = React.useRef<HTMLDivElement>();

  const handleOpenPopup = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    anchorRef.current = event.currentTarget;
    setVisiblePopup(true);
  };

  const handleClosePopup = (): void => {
    setVisiblePopup(false);
  };

  return (
<>
      <div onClick={handleOpenPopup} className={classes.sideProfile}>
        <Avatar src="" />

        <div className={classes.sideProfileInfo}>
          <b>Misha Best</b>
          <Typography style={{ color: colors.grey[500] }}>@mishabest</Typography>
        </div>
        <ArrowBottomIcon />
      </div>
      <Popover
        open={visiblePopup}
        onClose={handleClosePopup}
        anchorEl={anchorRef.current}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}>
        The content of the Popover.
      </Popover>
    </>

  );
};
