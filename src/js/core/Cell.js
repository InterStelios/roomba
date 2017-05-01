import { fabric } from 'fabric';

// We are extending one of the built-in fabric.js shapes. This, - admittedly - adds a hard dependency
// which is a restriction but it was done for the sake of this simple exercise. Ideally, we would like
// to inject such dependencies (i.e. via our constructor).
export default class Cell extends fabric.Rect {
  /**
   * Constructor for a Cell object.
   * @param {Object} actions - The cell actions.
   * @param {Object} shapeOptions - The fabricjs shape related properties.
   */
  constructor(actions = {}, shapeOptions = {}) {
    super(shapeOptions);
    this.properties = { dirty: false };
    this.actions = actions;
  }

  /**
   * Executes the given action on the Cell and triggers an 'object:modified' event. The action is executed only if its
   * one of the known/defined actions.
   * @param {String} action - The action for the cell to perform.
   * @return {Cell} The cell instance.
   */
  execute(action = null) {
    if (this.actions[action]) {
      // The current properties.
      const shapeProperties = { opacity: this.opacity };
      const objectProperties = { dirty: this.properties.dirty };

      const nextAction = this.actions[action](
        shapeProperties,
        objectProperties
      );

      // Sets the fabricjs properties related to the shape.
      this.set(nextAction.shapeProperties);

      // Sets the cell state properties.
      this.properties = Object.assign(
        {},
        this.properties,
        nextAction.objectProperties
      );

      this.canvas.trigger('object:modified', { action });
      return this;
    }
    return this;
  }
}
