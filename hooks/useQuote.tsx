import axios from 'axios';
import {useCallback, useEffect, useRef, useState} from 'react';
import {Animated} from 'react-native';
import config from '../config';
import {QuoteResponse} from '../model/QuoteResponse';
import {VerseResponse} from '../model/VerseResponse';
import {firstVerse} from '../data/dhp';
import {Mode, Phase} from '../enums';

const useQuote = () => {
  const bookCode = 'dhp';

  const startQuote = new QuoteResponse();
  startQuote.fromVerse(firstVerse);

  const [quote, setQuote] = useState<QuoteResponse>(startQuote);
  const [mode, setMode] = useState<Mode>(Mode.Start);
  const opacity = useRef(new Animated.Value(1)).current;

  const nextQuote = () => {
    const url = `${config.api}/sutta/next/${bookCode}/${quote?.verseNumber}`;
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

  const fadeIn = useCallback(() => {
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: config.interval,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  const fadeOut = useCallback(() => {
    opacity.setValue(1);
    Animated.timing(opacity, {
      toValue: 0,
      duration: config.interval,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  useEffect(() => {
    let phase: number = Phase.GetQuote as number;
    const startCount: number =
      mode === Mode.Start ? Phase.ShowQuoteStart : Phase.ShowQuoteFinish;
    let count: number = startCount;
    let handler: NodeJS.Timer | null = null;

    console.log(`useEffect, mode ${mode}`);

    const quoteCycle = () => {
      phase = (count % 10) + 1;

      console.log(`count ${count} phase ${phase}`);

      if (phase === Phase.GetQuote) {
        getQuote();
      } else if (phase === Phase.ShowQuoteStart) {
        fadeIn();
      } else if (phase === Phase.HideQuote) {
        fadeOut();
      }

      count = count + 1;
    };

    if (mode === Mode.Start || mode === Mode.Restart) {
      handler = setInterval(quoteCycle, config.interval);
    }

    return () => clearInterval(handler!);
  }, [opacity, mode, fadeIn, fadeOut]);

  return {quote, nextQuote, previousQuote, opacity, setMode, mode};
};

export default useQuote;
