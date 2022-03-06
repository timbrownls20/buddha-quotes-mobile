import {useState} from 'react';
import {images} from '../data/backgroundImages';

export const useBackground = () => {
  const maxImageNumber = images.length;

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
