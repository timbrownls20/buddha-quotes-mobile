import React from 'react';
import {StyleSheet, View, Animated} from 'react-native';

import Citation from './Citation';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import {Swipe} from '../services/Swipe';
import BackgroundImage from './BackgroundImage';
import QuoteText from './QuoteText';
import useQuote, {Mode} from '../hooks/useQuote';
import {useBackground} from '../hooks/useBackground';
import ReactNativeHapticFeedback, {
  HapticFeedbackTypes,
} from 'react-native-haptic-feedback';
import {HapticOptions, HapticTriggerType} from '../services/Haptics';

const Quote = () => {
  const {quote, nextQuote, previousQuote, opacity, setMode, mode} = useQuote();
  const {imageNumber, nextImage, previousImage} = useBackground();

  const panGesture = Gesture.Pan()
    .onStart(() => {
      setMode(Mode.Stop);
      opacity.setValue(1);
    })
    .onEnd(e => {
      const swipe = new Swipe(e);
      console.log(swipe.toString());

      if (swipe.isLeft) {
        nextQuote();
      } else if (swipe.isRight) {
        previousQuote();
      } else if (swipe.isDown) {
        nextImage();
      } else if (swipe.isUp) {
        previousImage();
      }
    });

  const touchGesture = Gesture.Tap().onEnd(() => {
    console.log('tap');

    ReactNativeHapticFeedback.trigger(
      HapticTriggerType as HapticFeedbackTypes,
      HapticOptions,
    );

    setMode(mode === Mode.Start ? Mode.Stop : Mode.Start);
  });

  const composed = Gesture.Exclusive(panGesture, touchGesture);

  const styles = StyleSheet.create({
    topContainer: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'rgba(52, 52, 52, 0)',
      flex: 1,
    },
    quoteContainer: {
      padding: 15,
      backgroundColor: 'rgba(52, 52, 52, 0.2)',
      borderRadius: 5,
      maxWidth: '90%',
    },
  });

  return (
    <BackgroundImage imageNumber={imageNumber}>
      <GestureDetector gesture={composed}>
        <View style={{...styles.topContainer}}>
          <View />
          <Animated.View style={{...styles.quoteContainer, opacity: opacity}}>
            <QuoteText text={quote?.text} />
          </Animated.View>
          <Animated.View style={{opacity: opacity}}>
            <Citation quote={quote} />
          </Animated.View>
        </View>
      </GestureDetector>
    </BackgroundImage>
  );
};

export default Quote;
