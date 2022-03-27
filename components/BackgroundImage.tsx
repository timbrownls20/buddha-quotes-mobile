import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {BackgroundImageStyle} from '../assets/Styles';
import {BackgroundImage as BackgroundImageService} from '../services/BackgroundImage';

const styles = StyleSheet.create(BackgroundImageStyle);

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

export default BackgroundImage;
