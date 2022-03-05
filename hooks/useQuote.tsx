import axios from 'axios';
import {useEffect, useRef, useState} from 'react';
import {Animated} from 'react-native';
import config from '../config';
import {QuoteResponse} from '../model/QuoteResponse';
import {VerseResponse} from '../model/VerseResponse';
import {firstVerse} from '../data/dhp';

enum Phase {
  GetQuote = 1,
  ShowQuote = 2,
  HideQuote = 9,
}

export enum Mode {
  Start = 1,
  Stop = 2,
  Reset = 3,
}

const useQuote = () => {
  const bookCode = 'dhp';

  const startQuote = new QuoteResponse();
  startQuote.fromVerse(firstVerse);

  const [quote, setQuote] = useState<QuoteResponse>(startQuote);
  const [mode, setMode] = useState<Mode>(Mode.Start);
  const opacity = useRef(new Animated.Value(1)).current;

  const nextQuote = () => {
    const url = `${config.api}/sutta/next/${bookCode}/${quote?.verseNumber}`;
    console.log(url);
    axios
      .get<VerseResponse>(url)
      .then(response => {
        const nextQuoteResponse = new QuoteResponse().fromVerse(response.data);
        setQuote(nextQuoteResponse);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const previousQuote = () => {
    //.. previous quote missing in API so workaround until API is changed
    let verseBeforePrevious: number = quote?.verseNumber! - 2;
    if (verseBeforePrevious === 0) {
      verseBeforePrevious = 0;
    }

    const url = `${config.api}/sutta/next/${bookCode}/${verseBeforePrevious}`;
    axios
      .get<VerseResponse>(url)
      .then(response => {
        const nextQuoteResponse = new QuoteResponse().fromVerse(response.data);
        setQuote(nextQuoteResponse);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    const startCount = Phase.ShowQuote;

    const getQuote = () => {
      const url = `${config.api}/quote/${bookCode}`;
      axios
        .get<QuoteResponse>(url)
        .then(response => {
          setQuote(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    };

    const fadeIn = () => {
      opacity.setValue(0);
      Animated.timing(opacity, {
        toValue: 1,
        duration: config.interval,
        useNativeDriver: true,
      }).start();
    };

    const fadeOut = () => {
      opacity.setValue(1);
      Animated.timing(opacity, {
        toValue: 0,
        duration: config.interval,
        useNativeDriver: true,
      }).start();
    };

    const quoteCycle = () => {
      let phase = (count % 10) + 1;

      if (phase === Phase.GetQuote) {
        getQuote();
      } else if (phase === Phase.ShowQuote) {
        fadeIn();
      } else if (phase === Phase.HideQuote) {
        fadeOut();
      }

      count = count + 1;
    };

    let count: number = startCount;
    let handler: NodeJS.Timer | null = null;

    if (mode === Mode.Start) {
      handler = setInterval(quoteCycle, config.interval);
    } else if (mode === Mode.Stop) {
      clearInterval(handler!);
    }

    return () => clearInterval(handler!);
  }, [opacity, mode]);

  return {quote, nextQuote, previousQuote, opacity, setMode};
};

export default useQuote;
