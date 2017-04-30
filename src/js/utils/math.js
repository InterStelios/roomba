const { floor } = Math;

/**
 * Computes the cell size based on the canvas width|height and number of rows|columns.
 * @param {Object} canvas - The canvas element.
 * @param {int} rows - The number of rows.
 * @param {int} columns The number of columns.
 * @return {Object} The cell size in (x, y).
 */
const cellSize = (canvas, rows, columns) => ({
  x: canvas.width / rows,
  y: canvas.height / columns,
});

/**
 * Converts the given position to (x, y) coordinates. Note this function needs to be called once to bind the cell size
 * with the @cellSize() parameters.
 * @param {int} left - The position value from the left of the canvas.
 * @param {top} top - The position value from the top of the canvas.
 * @return {Object} The position coordinates as (x, y).
 */
const convertPositionToCoords = (canvas, rows, columns) => {
  const dimensions = cellSize(canvas, rows, columns);
  return (left = 0, top = 0) => ({
    x: floor(left / dimensions.x),
    y: columns - floor(top / dimensions.y) - 1,
  });
};

/**
 * Computes the circle attributes such that the circle will always be centred in a cell and maintains its aspect ratio
 * regardless the length of the cell width or height.
 * The attributes are computes as below:
 *    size - Half the length of the longer value for either width of height.
 *    X or Y offsets: The result of length of longer value of either width or height divided by the diameter, minus a
 *                    sixth of the radius for padding and then divide the result by 2.
 * @param {int} cellWidth - The cell width.
 * @param {int} cellHeight - The cell height.
 * @return {Object} The circle size (radius) and (x, y) offsets.
 */
const computeCircleAttributes = (cellWidth = 0, cellHeight = 0) => {
  let radius;
  let size;
  let cellOffSetY;
  let cellOffSetX;

  if (cellWidth === cellHeight) {
    radius = cellWidth / 2;
    cellOffSetX = cellOffSetY = radius / 6;
    size = radius - cellOffSetX;
  } else if (cellWidth > cellHeight) {
    radius = cellHeight / 2;
    cellOffSetX = (cellWidth - radius * 2 - radius / 6) / 2;
    cellOffSetY = radius / 6;
    size = radius - cellOffSetY;
  } else {
    radius = cellWidth / 2;
    cellOffSetX = radius / 6;
    cellOffSetY = (cellHeight - radius * 2 - radius / 6) / 2;
    size = radius - cellOffSetX;
  }
  return {
    cellOffSetX,
    cellOffSetY,
    size,
  };
};

export { cellSize, convertPositionToCoords, computeCircleAttributes };
