import {useState} from 'react';
import {BackgroundImage} from '../services/BackgroundImage';

export const useBackground = () => {
  const maxImageNumber = BackgroundImage.NumberOfImages;

  const [imageNumber, setImageNumber] = useState(1);

  const nextImage = () => {
    if (imageNumber === maxImageNumber) {
      setImageNumber(1);
    } else {
      setImageNumber(imageNumber + 1);
    }
  };

  const previousImage = () => {
    if (imageNumber === 1) {
      setImageNumber(maxImageNumber);
    } else {
      setImageNumber(imageNumber - 1);
    }
  };

  return {imageNumber, nextImage, previousImage};
};
