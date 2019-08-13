import image1 from './images/levels/1.jpg'
import image2 from './images/levels/2.jpg'
import image3 from './images/levels/3.jpg'
import image4 from './images/levels/4.jpg'
import image5 from './images/levels/5.jpg'
import image6 from './images/levels/6.jpg'
import image7 from './images/levels/7.jpg'
import image8 from './images/levels/8.jpg'
import image9 from './images/levels/9.jpg'
import image10 from './images/levels/10.jpg'
import image11 from './images/levels/11.jpg'
import image12 from './images/levels/12.jpg'
import image13 from './images/levels/13.jpg'
import image14 from './images/levels/14.jpg'
import image15 from './images/levels/15.jpg'
import image16 from './images/levels/16.jpg'
import image17 from './images/levels/17.jpg'
import image18 from './images/levels/18.jpg'

const aLevel = (id, image, cocoLeft, cocoTop, cocoRight, cocoBottom) =>
  ({ id, image, cocoLeft, cocoTop, cocoRight, cocoBottom });

const LEVELS = [
  aLevel(1, image1, 79, 61, 81, 64),
  aLevel(2, image2, 31.5, 78, 34, 80),
  aLevel(3, image3, 75.5, 77.8, 86, 88.8),
  aLevel(4, image4, 19, 40, 23, 50),
  aLevel(5, image5, 27, 66, 30, 70),
  aLevel(6, image6, 55, 51, 57, 54),
  aLevel(7, image7, 79, 82, 85, 87),
  aLevel(8, image8, 81, 65, 84, 69),
  aLevel(9, image9, 63, 80, 65.5, 83),
  aLevel(10, image10, 21, 74, 24.2, 77),
  aLevel(11, image11, 69, 58, 72.2, 60.5),
  aLevel(12, image12, 29, 46, 32.2, 50),
  aLevel(13, image13, 13, 72, 18, 75),
  aLevel(14, image14, 14, 71, 17, 74),
  aLevel(15, image15, 14, 90, 17, 95),
  aLevel(16, image16, 68, 35, 72, 40),
  aLevel(17, image17, 62, 75, 65, 80),
  aLevel(18, image18, 52, 48, 57, 53),

];

export default LEVELS;
