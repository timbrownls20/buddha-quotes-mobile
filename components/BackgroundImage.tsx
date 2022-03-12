import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';

const BackgroundImage = ({
  children,
  imageNumber,
}: {
  children: React.ReactNode;
  imageNumber: number;
}) => {
  const backgroundImage = require(`background${imageNumber}.jpg`);

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
