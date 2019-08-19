export const isLandscape = (scene) =>
  scene && scene.scale && scene.scale.orientation && scene.scale.orientation.indexOf('landscape') !== -1;
