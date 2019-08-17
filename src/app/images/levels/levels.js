import image1 from './1.jpg'
import image2 from './2.jpg'
import image3 from './3.jpg'
import image4 from './4.jpg'
import image5 from './5.jpg'
import image6 from './6.jpg'
import image7 from './7.jpg'
import image8 from './8.jpg'
import image9 from './9.jpg'
import image10 from './10.jpg'
import image11 from './11.jpg'
import image12 from './12.jpg'
import image14 from './14.jpg'
import image15 from './15.jpg'
import image16 from './16.jpg'
import image17 from './17.jpg'
import image18 from './18.jpg'

const aLevel = (id, image, cocoLeft, cocoTop, cocoRight, cocoBottom, description) =>
  ({ id, image, cocoLeft, cocoTop, cocoRight, cocoBottom, description });


const LEVELS = [
  aLevel(1, image1, 78, 60, 82, 65, 'Claustro de la abadía de Mont Saint-Michel'),
  aLevel(2, image2, 31.5, 78, 34, 80, 'Casas de hormigón en Le Havre'),
  aLevel(3, image3, 75.5, 77.8, 86, 88.8, 'Abadía Jumieges, cerca de Rouen'),

];

export default LEVELS;
