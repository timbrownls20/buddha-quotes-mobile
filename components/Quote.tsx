import React from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import QuoteText from './QuoteText';
import useQuote, {Mode} from '../hooks/useQuote';
import Citation from './Citation';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import {Swipe} from '../services/Swipe';

const Quote = () => {
  const {quote, nextQuote, previousQuote, opacity, setMode} = useQuote();
  const gesture = Gesture.Pan()
    .onStart(() => {
      console.log('pan start');
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
      }
    });

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
    <GestureDetector gesture={gesture}>
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
  );
};

export default Quote;
