// The robot actions; note that they can all be subject to condition.
export default (condition = () => true) => ({
  /**
   * Takes a left position value and a speed and computes the next position by substracting
  * the speed of the X axis.
  */
  left: ({ left, speed }) => ({
    left: condition(left - speed.x) ? left - speed.x : left,
  }),

  /**
   * Takes a left position value and a speed and computes the next position by adding
   * the speed of the X axis.
   */
  right: ({ left, speed }) => ({
    left: condition(left + speed.x) ? left + speed.x : left,
  }),
  /**
   * Takes a top position value and a speed and computes the next position by substracting
   * the speed of the Y axis.
   */
  up: ({ top, speed }) => ({
    top: condition(top - speed.y) ? top - speed.y : top,
  }),
  /**
    * Takes a left position value and a speed and computes the next position by adding
    * the speed of the Y axis.
    */
  down: ({ top, speed }) => ({
    top: condition(top + speed.y) ? top + speed.y : top,
  }),
});
