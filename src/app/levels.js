import image1 from './images/levels/1.jpg'
import image2 from './images/levels/2.jpg'
import image3 from './images/levels/3.jpg'

const aLevel = (id, image, cocoLeft, cocoTop, cocoRight, cocoBottom) =>
  ({ id, image, cocoLeft, cocoTop, cocoRight, cocoBottom });

const LEVELS = [
  aLevel(1, image1, 79, 61, 81, 64),
  aLevel(2, image2, 31.5, 78, 34, 80),
  aLevel(3, image3, 75.5, 77.8, 86, 88.8),

];

export default LEVELS;
