import { fabric } from 'fabric';

const canvas = new fabric.StaticCanvas('canvas');

// Re-render canvas when any object attached to the canvas is modified.
canvas.on({
  'object:modified': canvas.renderAll.bind(canvas),
});

// Disable context menu on canvas.
canvas.lowerCanvasEl.addEventListener('contextmenu', () => false);

// Canvas is a singleton for the lifetime of a running session.
export default canvas;
