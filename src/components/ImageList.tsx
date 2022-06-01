import { IconButton } from '@material-ui/core';
import React from 'react';
import { ImageObj } from './AddTweetForm';
import ClearIcon from '@material-ui/icons/Clear';
import { useHomeStyles } from '../pages/Home/theme';

interface ImageListProps {
  images: string[];
  classes: ReturnType<typeof useHomeStyles>;
  removeImage?: (url: string) => void;
}

export const ImageList: React.FC<ImageListProps> = ({ classes, images, removeImage }) => {
  if (!images.length) {
    return null;
  }

  return (
    <div className={classes.imagesList}>
      {images.map((url) => (
        <div className={classes.imagesListItem}>
          {removeImage && (
            <IconButton
              className={classes.imagesListItemRemove}
              onClick={(): void => removeImage(url)}>
              <ClearIcon style={{ fontSize: 15 }} />
            </IconButton>
          )}
          <img key={url} src={url} />
        </div>
      ))}
    </div>
  );
};

