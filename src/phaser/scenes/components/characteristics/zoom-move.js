const PINCH_CONFIG = {
  enable: true,
  bounds: undefined,
  threshold: 0,
};

const addMoveEvent = (image, scene, pinch) => {
  pinch.on('drag1', function (pinch) {
    image.x += pinch.drag1Vector.x;
    image.y += pinch.drag1Vector.y;
  }, scene);
};

const addZoomEvent = (image, scene, pinch)  =>  {
  pinch.on('pinch', function (pinch) {
    image.scale *= pinch.scaleFactor;
  }, scene);
};

export const allowZoomAndMove = (image, scene) => {
  const pinch = scene.rexGestures.add.pinch(PINCH_CONFIG);
  addMoveEvent(image, scene, pinch);
  addZoomEvent(image, scene, pinch);
};
