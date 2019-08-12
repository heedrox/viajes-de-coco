import image1 from './images/1.jpg'
import image2 from './images/2.jpg'

const aLevel = (id, image, cocoLeft, cocoTop, cocoRight, cocoBottom) =>
  ({ id, image, cocoLeft, cocoTop, cocoRight, cocoBottom });

const LEVELS = [
  aLevel(1, image1, 79, 61, 81, 64),
  aLevel(2, image2, 31.5, 78, 34, 80),
];

export default LEVELS;
