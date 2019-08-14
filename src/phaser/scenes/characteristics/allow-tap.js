const TAP_CONFIG = {
  enable: true,

  time: 250,
  tapInterval: 200,
  threshold: 9,
  tapOffset: 10,

  taps: undefined,
  minTaps: undefined,
  maxTaps: undefined,
};

const getClickPercent = (image, tapEvent) => {
  const imageLeft = image.x - image.displayWidth * image.originX;
  const imageTop = image.y - image.displayHeight * image.originY;

  const xPercent = (tapEvent.x - imageLeft) / image.displayWidth * 100;
  const yPercent = (tapEvent.y - imageTop) / image.displayHeight * 100;
  return { xPercent, yPercent };
};

const getTap = (scene, image) => scene.rexGestures.add.tap(image, TAP_CONFIG);

const calculateTapPercent = (image, callback) => tapEvent =>
  callback(getClickPercent(image, tapEvent));

export const allowTap = (image, scene, callback) => {
  const tap = getTap(scene, image);
  tap.on('tap',
    calculateTapPercent(image, callback),
    scene);
};
