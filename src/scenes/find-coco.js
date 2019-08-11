import Phaser from "phaser";
import backgroundImg from "../assets/coco1.jpg";

const getRatio = (image, game) => {
  if (game.scale.isGameLandscape) return game.canvas.height / image.height;
  return game.canvas.width / image.width;
};


export default class FindCoco extends Phaser.Scene {

  constructor() {
    super("findCoco");
  }

  preload() {
    this.load.image("BACKGROUND_IMAGE", backgroundImg);
  }

  create() {
    const logo = this.add.image(this.game.canvas.width/2, this.game.canvas.height/2, "BACKGROUND_IMAGE");
    logo.name = "backgroundImage"
    this.game.scale.scaleMode = Phaser.Scale.RESIZE;
    this.game.scale.parentIsWindow = true;

    const ratio = getRatio(logo, this.game);
    logo.scale = ratio;
    console.log('world', this.game);

    console.log('rex', this.rexGestures);
    const pinch = this.rexGestures.add.pinch({
      enable: true,
      bounds: undefined,
      threshold: 0,
    });

    pinch.on('drag1', function(pinch) {
      // var drag1Vector = pinch.drag1Vector; // drag1Vector: {x, y}
      console.log('pinch drag1 detected', pinch.drag1Vector);
      logo.x += pinch.drag1Vector.x;
      logo.y += pinch.drag1Vector.y;
    }, this);

    pinch.on('pinch', function(pinch) {
      console.log('pinch drag 2 pointers detected', pinch);

      var scaleFactor = pinch.scaleFactor;
      logo.scale *= scaleFactor;
    }, this);
  }
}
