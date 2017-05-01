export default ($mouse, surface) => {
  const $canvas = surface.canvas.lowerCanvasEl;

  const cleanIfDirty = surface => {
    if (surface.robot) {
      const cell = surface.getCellAt(surface.robot.left, surface.robot.top);
      return cell.properties.dirty ? cell.execute('clean') : cell;
    }
  };

  // Displays cell coordinates according to the mouse position.
  $canvas.addEventListener('mousemove', ({ offsetX, offsetY }) => {
    if (surface.isWithinBoundaries(offsetX, offsetY)) {
      const { x, y } = surface.convertPositionToCoords(offsetX, offsetY);
      $mouse.innerHTML = `Mouse (${x},${y})`;
    }
  });

  // Sets the robot on the surface of the clicked position if the shift key was hold down;otherwise it 'adds' dirt
  // on the clicked cell unless the robot is already on the same position.
  $canvas.addEventListener('click', ({ offsetX, offsetY, shiftKey }) => {
    if (shiftKey) {
      surface.setRobot(offsetX, offsetY);
      return cleanIfDirty(surface);
    }

    surface.getCellAt(offsetX, offsetY).execute('dirt');

    cleanIfDirty(surface);
  });
};
