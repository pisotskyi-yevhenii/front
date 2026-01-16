/**
 *  1) Styles at the top of file.
 *  All scss files must be included in /assets/src/scss/main.scss
 */

import '../scss/main.scss';

/**
 * 2) Import External (3d-part) JS/jQuery Libs, Extensions like: bootstrap, datepicker, fadeSlider, ect.
 * !!! Import Only required components of Bootstrap (NOT whole library).
 */
// import Modal from 'bootstrap/js/dist/modal'; // uncomment for use

/**
 *  3) Import custom modules
 */
// Test examples, to show usage approach. Can be deleted
import {consoleTest1, consoleTest2} from "./modules/test";
import {projectDesign} from "./modules/project-design";

/**
 * 4) Call functions
 */

consoleTest1();
consoleTest2();
// projectDesign();