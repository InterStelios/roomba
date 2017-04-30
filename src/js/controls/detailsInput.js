const updateNumberOfDirtPatches = (surface, $patches) => {
  const dirtPatches = surface.cells.filter(({ properties }) => properties.dirty)
    .length;
  $patches.innerHTML = `Patches (${dirtPatches})`;
};

const updateRobotPosition = (surface, $robot) => {
  const { robot, convertPositionToCoords } = surface;
  if (robot) {
    const { x, y } = convertPositionToCoords(robot.left, robot.top);
    $robot.innerHTML = `Robot (${x},${y})`;
  }
};

const updateGridDimensions = (surface, $grid) => {
  const { x, y } = surface.dimensions;
  $grid.innerHTML = `Grid ${x} x ${y}`;
};

const updateDisplay = (surface, $patches, $robot, $grid) => {
  updateNumberOfDirtPatches(surface, $patches);
  updateRobotPosition(surface, $robot);
  updateGridDimensions(surface, $grid);
};

export default (canvas, $patches, $robot, $grid, surface) => {
  updateDisplay(surface, $patches, $robot, $grid);
  // Updates the number of dirt patches, the robot position and the grid dimensions,
  // each time that any object is modified.
  canvas.on({
    'object:modified': updateDisplay.bind(
      null,
      surface,
      $patches,
      $robot,
      $grid
    ),
  });
};
