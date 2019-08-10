import Phaser from "phaser";
import backgroundImg from "./assets/coco1.jpg";

const docElement = document.documentElement;
const width = docElement.clientWidth;
const height = docElement.clientHeight;

const getRatio = (image, game) => {
  if (game.scale.isGameLandscape) return game.canvas.height / image.height;
  return game.canvas.width / image.width;
};

const config = {
  type: Phaser.AUTO,
  parent: "content",
  width: width,
  height: height,
  scene: {
    preload: preload,
    create: create
  }
};

const game = new Phaser.Game(config);
window.game= game;

function preload() {
  this.load.image("BACKGROUND_IMAGE", backgroundImg);
}

function create() {
  const logo = this.add.image(game.canvas.width/2, game.canvas.height/2, "BACKGROUND_IMAGE");
  game.scale.scaleMode = Phaser.Scale.RESIZE;
  game.scale.parentIsWindow = true;

  const ratio = getRatio(logo, game);
  logo.scale = ratio;
  console.log('world',game);
  // logo.x = game.world.centerX;
  // logo.y = game.world.centerY;

}
