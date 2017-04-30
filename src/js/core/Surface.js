import Cell from './Cell.js';
import Robot from './Robot.js';
import actions from '../actions';
import {
  cellSize,
  convertPositionToCoords,
  computeCircleAttributes,
} from '../utils/math';

export default class Surface {
  /**
   * Constructor for a Surface object. Upon initialisation, the grid is automatically drawn.
   * @param {Object} canvas - The surface canvas.
   * @param {Object} dimension - The surface dimensions.
   */
  constructor(canvas = {}, dimensions = { x: 0, y: 0 }) {
    this.canvas = canvas;
    this.draw(dimensions.x, dimensions.y);
  }

  /**
   * Draws the the surface objects based on the given dimensions and triggers an 'object:modified' event.
   * @param {int} rows - The number of rows.
   * @param {int} columns - The number of columns.
   * @return {Surface} The surface instance.
   */
  draw(rows = 0, columns = 0) {
    // Clean the existing canvas objects.
    this.canvas.dispose();
    this.dimensions = { x: rows, y: columns };
    this.cells = [];
    this.robot = null;
    this.convertPositionToCoords = convertPositionToCoords(
      this.canvas,
      rows,
      columns
    );

    // Create and add grid to surface.
    this.drawGrid();

    this.canvas.trigger('object:modified');
    return this;
  }

  /**
   * Helper method for drawing the surface grid.
   * @return {Surface} The surface instance.
   */
  drawGrid() {
    const { width: surfaceWidth, height: surfaceHeight } = this.canvas;
    const { x: width, y: height } = this.getCellSize();

    for (let left = 0; left < surfaceWidth; left += width) {
      for (let top = 0; top < surfaceHeight; top += height) {
        const cell = new Cell(actions.cell, {
          left,
          top,
          width,
          height,
          fill: 'white',
        });
        this.cells.push(cell);
        this.canvas.add(cell);
      }
    }
    return this;
  }

  /**
   * Evaluates whether the given position is within the surface's boundaries.
   * @param {int} left - The position value from the left of the canvas.
   * @param {top} top - The position value from the top of the canvas.
   * @return {boolean} Returns true if position is within boundaries; false otherwise.
   */
  isWithinBoundaries(left = 0, top = 0) {
    const { x: columns, y: rows } = this.dimensions;
    const { x, y } = this.convertPositionToCoords(left, top);
    return x >= 0 && x < columns && y >= 0 && y < rows;
  }

  /**
   * Gets the cell object at the given location.
   * @param {int} left - The position value from the left of the canvas.
   * @param {top} top - The position value from the top of the canvas.
   * @return [Cell] The Cell.
   */
  getCellAt(left = 0, top = 0) {
    const { x: cellWidth, y: cellHeight } = this.getCellSize();

    // This always loops until a cell at the given position is found. This is a bit slow but
    // it is not a problem for our simple example. Ideally, we would want to store cells in a
    // map for quick lookup access.
    return this.cells.find(cell => {
      const cellXStart = cell.left;
      const cellXEnd = cell.left + cellWidth;

      const cellYStart = cell.top;
      const cellYEnd = cell.top + cellHeight;

      return (
        left >= cellXStart &&
        left <= cellXEnd &&
        top >= cellYStart &&
        top <= cellYEnd
      );
    });
  }

  /**
   * Getter for the cell size.
   * @return {Object} The cell size in (x, y).
  */
  getCellSize() {
    return cellSize(this.canvas, this.dimensions.x, this.dimensions.y);
  }

  /**
   * Sets a new robot on the given location; overrides any previous robot.
   * @param {int} left - The position value from the left of the canvas.
   * @param {top} top - The position value from the top of the canvas.
   * @return {Robot} The new robot.
   */
  setRobot(left = 0, top = 0) {
    if (this.robot) {
      this.robot.remove();
    }

    const cell = this.getCellAt(left, top);
    const { x: cellWidth, y: cellHeight } = this.getCellSize();
    const { cellOffSetX, cellOffSetY, size } = computeCircleAttributes(
      cellWidth,
      cellHeight
    );

    // We are passing a restriction (pre-condition) to be applied for the robot actions.
    // In this case we prohibits the robot moving past the surface boundaries.
    const robotActions = actions.robot(this.isWithinBoundaries.bind(this));

    this.robot = new Robot(robotActions, this.getCellSize(), {
      radius: size,
      left: cell.left + cellOffSetX,
      top: cell.top + cellOffSetY,
      stroke: 'red',
      strokeWidth: 1,
    });

    this.canvas.add(this.robot);
    return this.robot;
  }

  /**
   * Getter for the robot.
   * @return {Robot} The robot.
  */
  getRobot() {
    return this.robot;
  }
}
