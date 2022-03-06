interface Image {
  name: string;
  image: any;
}

export const images: Array<Image> = [
  {
    name: 'background1.jpg',
    image: require('../assets/images/background1.jpg'),
  },
  {
    name: 'background2.jpg',
    image: require('../assets/images/background2.jpg'),
  },
  {
    name: 'background3.jpg',
    image: require('../assets/images/background3.jpg'),
  },
  {
    name: 'background4.jpg',
    image: require('../assets/images/background4.jpg'),
  },
  {
    name: 'background5.jpg',
    image: require('../assets/images/background5.jpg'),
  },
  {
    name: 'background6.jpg',
    image: require('../assets/images/background6.jpg'),
  },
  {
    name: 'background7.jpg',
    image: require('../assets/images/background7.jpg'),
  },
  {
    name: 'background8.jpg',
    image: require('../assets/images/background8.jpg'),
  },
  {
    name: 'background9.jpg',
    image: require('../assets/images/background9.jpg'),
  },
  {
    name: 'background10.jpg',
    image: require('../assets/images/background10.jpg'),
  },
];

export const getImage = (name: string) => {
  const found = images.find(e => e.name === name);
  return found ? found.image : null;
};
