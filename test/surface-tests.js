import assert from 'assert';
import { spy } from 'sinon';
import Surface from '../src/js/core/Surface';

describe('Surface', () => {
  let canvas;
  let dimensions;
  let surface;

  beforeEach(() => {
    canvas = {
      width: 100,
      height: 100,
      dispose: spy(),
      add: spy(),
      trigger: spy(),
    };
    dimensions = { x: 5, y: 5 };
    surface = new Surface(canvas, dimensions);
  });

  describe('#constructor()', () => {
    it('should set the class properties and draw the grid', () => {
      const expectedCanvas = canvas;
      const expectedDimensions = dimensions;
      const expectedNumberOfCells = 25;

      assert.deepEqual(expectedCanvas, surface.canvas);
      assert.deepEqual(expectedDimensions, surface.dimensions);
      assert.equal(expectedNumberOfCells, surface.cells.length);
      assert.ok(surface.canvas.dispose.calledOnce);
      assert.ok(surface.canvas.trigger.calledOnce);
      assert.equal(expectedNumberOfCells, surface.canvas.add.callCount);
    });
  });

  describe('#getCellAt()', () => {
    it('should return the Cell at the specified position', () => {
      const x = 5;
      const y = 5;
      const expectedCell = surface.cells[0];

      assert.deepEqual(expectedCell, surface.getCellAt(x, y));
    });

    it('should not return any Cell object as the position is outside the grid boundaries', () => {
      const x = 150;
      const y = 200;
      const expectedCell = undefined;

      assert.equal(expectedCell, surface.getCellAt(x, y));
    });
  });

  describe('#isWithinBoundaries()', () => {
    it('should return true as the position is within the grid boundaries', () => {
      const left = 5;
      const top = 5;
      const expectedCondition = true;

      assert.equal(expectedCondition, surface.isWithinBoundaries(left, top));
    });

    it('should return false as the position is out the grid boundaries', () => {
      const left = 250;
      const top = 5;
      const expectedCondition = false;

      assert.equal(expectedCondition, surface.isWithinBoundaries(left, top));
    });
  });

  describe('#setRobot()', () => {
    it('should set a new robot at the specified position', () => {
      const x = 5;
      const y = 5;
      const expectedNumberOfObjectsAdded = 26;

      assert.ok(surface.setRobot(x, y));
      assert.equal(expectedNumberOfObjectsAdded, surface.canvas.add.callCount);
    });
  });
});
