import assert from 'assert';
import {
  cellSize,
  computeCircleAttributes,
  convertPositionToCoords,
} from '../src/js/utils/math';

// Utility function
const circleAttributesAsIntegers = ({ cellOffSetX, cellOffSetY, size }) => ({
  cellOffSetX: parseInt(cellOffSetX),
  cellOffSetY: parseInt(cellOffSetY),
  size: parseInt(size),
});

describe('math utils', () => {
  const canvas = {
    width: 100,
    height: 100,
  };
  const rows = 10;
  const columns = 10;

  describe('#cellSize()', () => {
    it('should compute the cell size based on cell dimensions and grid size', () => {
      const expectedCellSize = { x: 10, y: 10 };
      assert.deepEqual(expectedCellSize, cellSize(canvas, rows, columns));
    });
  });

  describe('#convertPositionToCoords()', () => {
    it('should convert the position to coordinates', () => {
      // top left cell
      const position = { x: 5, y: 5 };
      const expectedCoordinates = { x: 0, y: 9 };

      const positionToCoords = convertPositionToCoords(canvas, rows, columns)(
        position.x,
        position.y
      );
      assert.deepEqual(expectedCoordinates, positionToCoords);
    });
  });

  describe('#computeCircleAttributes()', () => {
    it('should compute the circle attributes such that it always fit in a cell when cell width > cell height', () => {
      const width = 100;
      const height = 50;

      const expectedCoordinates = { cellOffSetX: 22, cellOffSetY: 4, size: 20 };
      const circleAttributes = circleAttributesAsIntegers(
        computeCircleAttributes(width, height)
      );

      assert.deepEqual(expectedCoordinates, circleAttributes);
    });

    it('should compute the circle attributes such that it always fit in a cell when cell width < cell height', () => {
      const width = 50;
      const height = 100;

      const expectedCoordinates = { cellOffSetX: 4, cellOffSetY: 22, size: 20 };
      const circleAttributes = circleAttributesAsIntegers(
        computeCircleAttributes(width, height)
      );

      assert.deepEqual(expectedCoordinates, circleAttributes);
    });

    it('should compute the circle attributes such that it always fit in a cell when cell width = cell height', () => {
      const width = 100;
      const height = 100;

      const expectedCoordinates = { cellOffSetX: 8, cellOffSetY: 8, size: 41 };
      const circleAttributes = circleAttributesAsIntegers(
        computeCircleAttributes(width, height)
      );

      assert.deepEqual(expectedCoordinates, circleAttributes);
    });
  });
});
