import information from './information';

const updateNumberOfDirtPatches = (surface, $patches) => {
  const dirtPatches = surface.cells.filter(({ properties }) => properties.dirty)
    .length;
  $patches.innerHTML = `Patches (${dirtPatches})`;
};

const updateNumberOfDirtPatchesCleaned = ($patchesCleaned, patches) => {
  $patchesCleaned.innerHTML = `Patches cleaned (${patches})`;
};

const updateRobotPosition = (surface, $robot) => {
  const { robot, convertPositionToCoords } = surface;
  if (robot) {
    const { x, y } = convertPositionToCoords(robot.left, robot.top);
    return ($robot.innerHTML = `Robot (${x},${y})`);
  }
  return ($robot.innerHTML = `Robot (/)`);
};

const updateGridDimensions = (surface, $grid) => {
  const { x, y } = surface.dimensions;
  $grid.innerHTML = `Grid ${x} x ${y}`;
};

const updateDisplay = (surface, $patches, $patchesCleaned, $robot, $grid) => {
  updateNumberOfDirtPatches(surface, $patches);
  updateRobotPosition(surface, $robot);
  updateGridDimensions(surface, $grid);
  updateNumberOfDirtPatchesCleaned($patchesCleaned, information.cleared);
};

export default (canvas, $patches, $patchesCleaned, $robot, $grid, surface) => {
  updateDisplay(surface, $patches, $patchesCleaned, $robot, $grid);
  // Updates the number of dirt patches, the robot position and the grid dimensions,
  // each time that any object is modified.
  canvas.on({
    'object:modified': ({ action }) => {
      if (action === 'clean') {
        information.cleared++;
      }

      updateDisplay(surface, $patches, $patchesCleaned, $robot, $grid);
    },
  });
};
