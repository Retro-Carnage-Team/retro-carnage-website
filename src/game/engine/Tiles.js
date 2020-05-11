export const PLAYER_HEIGHT = 200;
export const PLAYER_WIDTH = 90;
export const SCREEN_SIZE = 1500;

export function renderToOffScreenCanvas(image, width, height) {
  const canvas = window.document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  context.drawImage(image, 0, 0);
  return canvas;
}