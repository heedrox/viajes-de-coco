import image1 from './images/1.jpg'

const aLevel = (id, image, cocoLeft, cocoTop, cocoRight, cocoBottom) =>
  ({ id, image, cocoLeft, cocoTop, cocoRight, cocoBottom });

const LEVELS = [
  aLevel(1, image1, 79, 61, 81, 64),
];

export default LEVELS;
