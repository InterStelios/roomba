import assert from 'assert';
import { spy } from 'sinon';
import Cell from '../src/js/core/Cell';

describe('Cell', () => {
  let mockActions;
  let cell;

  beforeEach(() => {
    mockActions = {
      destroy: () => ({
        shapeProperties: {
          colour: 'black',
        },
        objectProperties: {
          destroyed: true,
        },
      }),
    };

    cell = new Cell(mockActions);
    cell.canvas = { trigger: spy() };
  });

  describe('#constructor()', () => {
    it('should set the class properties', () => {
      const expectedProperties = {
        dirty: false,
      };
      const expectedActions = mockActions;

      assert.deepEqual(expectedProperties, cell.properties);
      assert.deepEqual(expectedActions, cell.actions);
    });
  });

  describe('#execute()', () => {
    it('should execute the given action and set the cell properties', () => {
      const expectedShapeProperties = {
        colour: 'black',
      };
      const expectedObjectProperties = {
        dirty: false,
        destroyed: true,
      };
      const destroyAction = 'destroy';

      cell.execute(destroyAction);

      assert.deepEqual(expectedShapeProperties.colour, cell.colour);
      assert.deepEqual(expectedObjectProperties, cell.properties);
    });

    it('should not change any properties for an unknown action', () => {
      const unknownAction = 'unknown';
      const expectedProperties = cell.properties;

      cell.execute(unknownAction);

      assert.deepEqual(expectedProperties, cell.properties);
    });
  });
});
