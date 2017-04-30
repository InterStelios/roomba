import assert from 'assert';
import actions from '../src/js/actions/cellActions';

describe('cell actions', () => {
  describe('#dirt()', () => {
    it('should add "dirt"', () => {
      const expectedAttributes = {
        shapeProperties: { opacity: 0.7 },
        objectProperties: { dirty: true },
      };
      assert.deepEqual(expectedAttributes, actions.dirt());
    });
  });

  describe('#clean()', () => {
    it('should "clean"', () => {
      const expectedAttributes = {
        shapeProperties: { opacity: 1 },
        objectProperties: { dirty: false },
      };
      assert.deepEqual(expectedAttributes, actions.clean());
    });
  });
});
