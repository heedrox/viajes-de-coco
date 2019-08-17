import { allowZoomAndMove } from '../../common/characteristics/allow-zoom-move';
import FullScreenImage from '../../common/components/full-screen-image';

export default class SceneImage extends FullScreenImage {
  constructor(scene, levelData) {
    const imageName = `background-image-${levelData.id}`;
    super(scene, levelData.image, 0, imageName, imageName);
    this.scene = scene;
  }


  create() {
    super.create();
    allowZoomAndMove(this.image, this.scene);
  }

}
