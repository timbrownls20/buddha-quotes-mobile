const images: Array<any> = [
  {
    name: 'background1.jpg',
    image: require('../assets/images/background1.jpg'),
  },
  {
    name: 'background2.jpg',
    image: require('../assets/images/background2.jpg'),
  },
];

export const getImage = (name: string) => {
  const found = images.find(e => e.name === name);
  return found ? found.image : null;
};
