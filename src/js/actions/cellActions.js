// The cell actions.
export default {
  /**
   * Returns the visual (:opacity) and state (:dirty) attributes that represent a dirty cell.
   */
  dirt: () => ({
    shapeProperties: { opacity: 0.7 },
    objectProperties: { dirty: true },
  }),

  /**
   * Returns the visual (:opacity) and state (:dirty) attributes that represent a clean cell.
   */
  clean: () => ({
    shapeProperties: { opacity: 1 },
    objectProperties: { dirty: false },
  }),
};
