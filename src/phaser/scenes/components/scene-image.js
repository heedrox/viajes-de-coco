import { allowZoomAndMove } from '../characteristics/allow-zoom-move';
import FullScreenImage from './full-screen-image';

const IMAGE_NAME = "backgroundImage";

export default class SceneImage extends FullScreenImage {
  constructor(scene, levelData) {
    super(scene, levelData.image, 0, IMAGE_NAME)
    this.scene = scene;
  }


  create() {
    super.create();
    allowZoomAndMove(this.image, this.scene);
  }

}
