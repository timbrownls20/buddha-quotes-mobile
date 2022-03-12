import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {BackgroundImage as BackgroundImageService} from '../services/BackgroundImage';

const BackgroundImage = ({
  children,
  imageNumber,
}: {
  children: React.ReactNode;
  imageNumber: number;
}) => {
  const imageName = `background${imageNumber}.jpg`;
  const backgroundImage = BackgroundImageService.GetImage(imageName);

  return (
    <ImageBackground source={backgroundImage} style={styles.container}>
      {children}
    </ImageBackground>
  );
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default BackgroundImage;
