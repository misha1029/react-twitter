import { IconButton } from '@material-ui/core';
import React from 'react';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import EmojiIcon from "@material-ui/icons/SentimentSatisfiedOutlined";

import { ImageObj } from './AddTweetForm';
import { ImageList } from './ImageList';
import { useHomeStyles } from '../pages/Home/theme';

interface UploadImageProps {
  images: ImageObj[];
  onChangeImages: (callback: (prev: ImageObj[]) => ImageObj[]) => void;
}

export const UploadImages: React.FC<UploadImageProps> = ({ images, onChangeImages }) => {
  const classes = useHomeStyles();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleClickImage = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const removeImage = (url: string) => {
    onChangeImages((prev) => prev.filter((obj) => obj.blobUrl !== url));
  };

  const handleChangeFileInput = React.useCallback((event: Event) => {
    if (event.target) {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        const fileObj = new Blob([file]);
        onChangeImages((prev) => [
          ...prev,
          {
            blobUrl: URL.createObjectURL(fileObj),
            file,
          },
        ]);
      }
    }
  }, []);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addEventListener('change', handleChangeFileInput);
    }
    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener('change', handleChangeFileInput);
      }
    };
  }, []);

  return (
    <div>
      <ImageList
        images={images.map((obj) => obj.blobUrl)}
        classes={classes}
        removeImage={removeImage}
      />
      <IconButton onClick={handleClickImage} color="primary">
        <ImageOutlinedIcon style={{ fontSize: 26 }} />
      </IconButton>
      <IconButton color="primary">
        <EmojiIcon style={{ fontSize: 26 }} />
        </IconButton>
      <input ref={inputRef} type="file" id="upload-input" hidden />
    </div>
  );
};
