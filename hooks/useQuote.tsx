import axios from 'axios';
import {useEffect, useRef, useState} from 'react';
import {Animated} from 'react-native';
import config from '../config';
import {QuoteResponse} from '../model/QuoteResponse';
import {VerseResponse} from '../model/VerseResponse';

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

const firstVerse = {
  nikaya: 'Khuddaka',
  book: 'Dhammapada',
  bookCode: 'dhp',
  title: 'Yamakavagga: Pairs',
  chapterNumber: 1,
  author: 'Acharya Buddharakkhita',
  verses: [
    {
      verseNumber: 1,
      text: 'Mind precedes all mental states. Mind is their chief; they are all mind-wrought. If with an impure mind a person speaks or acts suffering follows him like the wheel that follows the foot of the ox.',
    },
  ],
  citation:
    'Yamakavagga: Pairs (dhp 1), translated from the Pali by Acharya Buddharakkhita. Access to Insight (https://www.accesstoinsight.org/)',
  source: 'https://www.accesstoinsight.org/tipitaka/kn/dhp/dhp.01.budd.html',
} as VerseResponse;

const useQuote = () => {
  const bookCode = 'dhp';

  const startQuote = new QuoteResponse();
  startQuote.fromVerse(firstVerse);

  const [quote, setQuote] = useState<QuoteResponse>(startQuote);
  const [mode, setMode] = useState<Mode>(Mode.Start);
  const fadeAnim = useRef(new Animated.Value(1)).current;

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
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: config.interval,
        useNativeDriver: true,
      }).start();
    };

    const fadeOut = () => {
      fadeAnim.setValue(1);
      Animated.timing(fadeAnim, {
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
  }, [fadeAnim, mode]);

  return {quote, nextQuote, previousQuote, fadeAnim, setMode};
};

export default useQuote;
