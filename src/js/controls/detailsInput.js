const updateNumberOfDirtPatches = (surface, $patches) => {
  const dirtPatches = surface.cells.filter(({ properties }) => properties.dirty)
    .length;
  $patches.innerHTML = `Patches (${dirtPatches})`;
};

let patchesCleaned = 0;
const updateNumberOfDirtPatchesCleaned = $patchesCleaned => {
  $patchesCleaned.innerHTML = `Patches cleaned (${++patchesCleaned})`;
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

export default (canvas, $patches, $patchesCleaned, $robot, $grid, surface) => {
  updateDisplay(surface, $patches, $robot, $grid);
  // Updates the number of dirt patches, the robot position and the grid dimensions,
  // each time that any object is modified.
  canvas.on({
    'object:modified': ({ action }) => {
      if (action === 'clean') {
        updateNumberOfDirtPatchesCleaned($patchesCleaned);
      }
      updateDisplay(surface, $patches, $robot, $grid);
    },
  });
};
