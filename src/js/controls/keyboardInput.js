// Map event key codes to names (arrows)
const mapKeyToRobotAction = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
};

export default surface => {
  // Moves the robot accordingly if one of the arrow keys was pressed (or the key was 'down').
  surface.canvas.lowerCanvasEl.addEventListener('keydown', ({ keyCode }) => {
    const { robot } = surface;
    const move = mapKeyToRobotAction[keyCode];

    // Execute only if an arrow key was pressed.
    if (move) {
      robot.execute(move);
      const cell = surface.getCellAt(robot.left, robot.top);
      if (cell.properties.dirty) {
        cell.execute('clean');
      }
    }
  });
};
