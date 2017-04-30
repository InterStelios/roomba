import assert from 'assert';
import { spy } from 'sinon';
import Robot from '../src/js/core/Robot';

describe('Robot', () => {
  const speed = { x: 1, y: 1 };
  const mockActions = {
    destroy: () => ({
      colour: 'black',
    }),
  };
  let robot;

  beforeEach(() => {
    robot = new Robot(mockActions, speed);
    robot.canvas = { trigger: spy() };
  });

  describe('#constructor()', () => {
    it('should set the class properties', () => {
      const expectedSpeed = speed;
      const expectedActions = mockActions;

      assert.deepEqual(expectedSpeed, robot.speed);
      assert.deepEqual(expectedActions, robot.actions);
    });
  });

  describe('#execute()', () => {
    it('should execute the given action and set the robot properties', () => {
      const expectedProperties = {
        colour: 'black',
      };
      const destroyAction = 'destroy';

      robot.execute(destroyAction);

      assert.deepEqual(expectedProperties.colour, robot.colour);
    });
  });
});
