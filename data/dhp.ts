import {VerseResponse} from '../model/VerseResponse';

export const firstVerse = {
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
