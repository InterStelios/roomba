import information from './information';

export default ($xRange, $yRange, surface) => {
  // Re-draw the surface with the new X coordinates based on the value of our x-range slider.
  $xRange.addEventListener('change', ({ target: { value } }) => {
    const existingRows = surface.dimensions.y;
    const newColumns = parseInt(value);
    information.cleared = 0;
    surface.draw(newColumns, existingRows);
  });

  // Re-draw the surface with the new Y coordinates based on the value of our y-range slider.
  $yRange.addEventListener('change', ({ target: { value } }) => {
    const existingColumns = surface.dimensions.x;
    const newRows = parseInt(value);
    information.cleared = 0;
    surface.draw(existingColumns, newRows);
  });
};
