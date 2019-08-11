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
    const image = this.addImage();
    this.allowZoomAndMove(image);
    this.listenClicks(image);
  }

  addImage() {
    const logo = this.add.image(this.game.canvas.width/2, this.game.canvas.height/2, "BACKGROUND_IMAGE");
    logo.name = "backgroundImage"
    this.game.scale.scaleMode = Phaser.Scale.RESIZE;
    this.game.scale.parentIsWindow = true;

    const ratio = getRatio(logo, this.game);
    logo.scale = ratio;
    return logo;
  }

  allowZoomAndMove(image) {
    const pinch = this.rexGestures.add.pinch({
      enable: true,
      bounds: undefined,
      threshold: 0,
    });
    this.addMoveEvent(image, pinch);
    this.addZoomEvent(image, pinch);
  }

  addMoveEvent(image, pinch) {
    pinch.on('drag1', function(pinch) {
      image.x += pinch.drag1Vector.x;
      image.y += pinch.drag1Vector.y;
    }, this);
  }

  addZoomEvent(image, pinch) {
    pinch.on('pinch', function(pinch) {
      image.scale *= pinch.scaleFactor;
    }, this);

  }

  listenClicks(image) {
    const tap = this.rexGestures.add.tap(image, {
      enable: true,

      time: 250,
      tapInterval: 200,
      threshold: 9,
      tapOffset: 10,

      taps: undefined,
      minTaps: undefined,
      maxTaps: undefined,
    });
    tap.on('tap', function(tapEvent) {
      const imageLeft = image.x - image.displayWidth*image.originX;
      const imageTop = image.y - image.displayHeight*image.originY;

      const xPercent = (tapEvent.x - imageLeft)/image.displayWidth*100;
      const yPercent = (tapEvent.y - imageTop)/image.displayHeight*100;
      console.log('x-y',xPercent, yPercent );
    }, this);
  }
}
