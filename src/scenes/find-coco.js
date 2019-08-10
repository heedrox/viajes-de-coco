import Phaser from "phaser";
import backgroundImg from "../assets/coco1.jpg";

const getRatio = (image, game) => {
  if (game.scale.isGameLandscape) return game.canvas.height / image.height;
  return game.canvas.width / image.width;
};


export default class FindCoco extends Phaser.Scene {

  preload() {
    this.load.image("BACKGROUND_IMAGE", backgroundImg);
  }

  create() {
    const logo = this.add.image(game.canvas.width/2, game.canvas.height/2, "BACKGROUND_IMAGE");
    game.scale.scaleMode = Phaser.Scale.RESIZE;
    game.scale.parentIsWindow = true;

    const ratio = getRatio(logo, game);
    logo.scale = ratio;
    console.log('world',game);
    // logo.x = game.world.centerX;
    // logo.y = game.world.centerY;

    console.log('rex', this.scene.rexGestures);
    /*const pinch = game.scene.rexGestures.add.pinch({
      enable: true,
      bounds: undefined,
      threshold: 0,
    });

    pinch.on('drag1', function(pinch) {
      // var drag1Vector = pinch.drag1Vector; // drag1Vector: {x, y}
      console.log('pinch drag1 detected', pinch);
    }, scope);

    pinch.on('pinch', function(pinch) {
      console.log('pinch drag 2 pointers detected', pinch);
      // var scaleFactor = pinch.scaleFactor;
      // gameObject.scaleX *= scaleFactor;
      // gameObject.scaleY *= scaleFactor;
    }, scope);*/
  }
}
