import '../styles/app.css';
import Surface from './core/Surface';
import canvas from './bootstrap';
import {
  mouseInput,
  keyboardInput,
  detailsInput,
  sliderInput,
} from './controls';

// Create the default surface.
const surface = new Surface(canvas, { x: 10, y: 10 });

// Elements that display useful information.
const $mouse = document.querySelector('#mouse');
const $patches = document.querySelector('#patches');
const $robot = document.querySelector('#robot');
const $xRange = document.querySelector('#x-range');
const $yRange = document.querySelector('#y-range');
const $grid = document.querySelector('#grid');

mouseInput($mouse, surface);
keyboardInput(surface);
detailsInput(canvas, $patches, $robot, $grid, surface);
sliderInput($xRange, $yRange, surface);
