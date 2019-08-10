import Phaser from "phaser";
import GesturesPlugin from './plugins/gestures-plugin.js';
import FindCoco from './scenes/find-coco.js';

const docElement = document.documentElement;
const width = docElement.clientWidth;
const height = docElement.clientHeight;

const config = {
  type: Phaser.AUTO,
  parent: "content",
  width: width,
  height: height,
  scene: [ FindCoco ],
  plugins: {
    scene: [{
      key: 'rexGestures',
      plugin: GesturesPlugin,
      mapping: 'rexGestures'
    }]
  }
};

const game = new Phaser.Game(config);
window.game= game;

function preload() {
}

function create() {

}
