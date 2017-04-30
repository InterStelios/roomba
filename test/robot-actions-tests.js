import assert from 'assert';
import actions from '../src/js/actions/robotActions';

describe('robot actions', () => {
  const robotActions = actions();
  const speed = { x: 1, y: 1 };
  const attrs = { left: 5, top: 5, speed };

  describe('#top()', () => {
    it('should compute the next "moving up" position', () => {
      const expectedNextPosition = { top: 4 };
      assert.deepEqual(expectedNextPosition, robotActions.up(attrs));
    });
  });

  describe('#right()', () => {
    it('should compute the next "moving right" position', () => {
      const expectedNextPosition = { left: 6 };
      assert.deepEqual(expectedNextPosition, robotActions.right(attrs));
    });
  });

  describe('#down()', () => {
    it('should compute the next "moving down" position', () => {
      const expectedNextPosition = { top: 6 };
      assert.deepEqual(expectedNextPosition, robotActions.down(attrs));
    });
  });

  describe('#left()', () => {
    it('should compute the next "moving down" position', () => {
      const expectedNextPosition = { left: 4 };
      assert.deepEqual(expectedNextPosition, robotActions.left(attrs));
    });
  });

  describe('action condition', () => {
    it('should not change any attribute if the condition is negative; a restriction is applied', () => {
      const restrictAnyRobotAction = () => false;
      const robotActions = actions(restrictAnyRobotAction);
      const expectedNextPosition = { left: 5 };
      assert.deepEqual(expectedNextPosition, robotActions.left(attrs));
    });
  });
});
