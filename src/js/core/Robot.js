import { fabric } from 'fabric';

// We are extending one of the built-in fabric.js shapes. This, - admittedly - adds a hard dependency
// which is a restriction but it was done for the sake of this simple exercise. Ideally, we would like
// to inject such dependencies (i.e. via our constructor).
export default class Robot extends fabric.Circle {
  /**
   * Constructor for a Robot object.
   * @param {Object} actions - The robot actions.
   * @param {Object} speed - The robot speed.
   * @param {Object} args - The fabricjs shape related properties.
   */
  constructor(actions = {}, speed = { x: 0, y: 0 }, shapeOptions = {}) {
    super(shapeOptions);
    this.actions = actions;
    this.speed = speed;
  }

  /**
   * Executes the given robot action and triggers an 'object:modified' event. The action is executed only if its
   * one of the known/defined actions.
   * @param {String} action - The action for the robot to perform.
   * @return {Robot} The robot instance.
   */
  execute(action = null) {
    if (this.actions[action]) {
      // The current robot properties.
      const props = { left: this.left, top: this.top, speed: this.speed };
      const nextMoveProperties = this.actions[action](props);
      this.set(nextMoveProperties);
      this.canvas.trigger('object:modified');
      return this;
    }
    return this;
  }
}
