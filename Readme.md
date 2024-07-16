# Project: 3D Interactive EventViewer for Giant Radio Array for Neutrino Detection, using javascript only

## Author

Shivaji Chaulagain

## Description

This project visualizes data from the Giant Radio Array for Neutrino Detection (GRAND) experiment in a 3D interactive format. It allows users to explore particle interactions and gain insights into neutrino detection.

## Getting Started

### Prerequisites

A web browser that supports WebGL (most modern browsers do). Require internet connection
### Running the Project

Clone or download the project repository.
Open Event_3D_viewer.html in your web browser.
For your own GRAND data:
Upload the hdf5 file of this neutrino detection.

*For the sample data:
Use the sample hdf5 file already provided in the Data folder.
### Note:

For local execution, ensure all project files are within the same folder.

## Project Structure

Data: Stores the sample hdf5 file, dat for visualization.
node_modules: Contains node modules of oregondsp.js and its dependencies on kotlin .
src: Houses my code: JavaScript files for core functionality, including hdf5filereader, hilbert transformation, rbf interpolation, etc. 
mainevent_3d.js is the main js script.
css: contains css style of the web and plot
antennageometry_colorplattee_js: contains antenaa geometry data in js file and colorpalette js file.

Event_3D_viewer.html: The main HTML file that opens the visualization in your browser.

## Customization

The project currently focuses on functionality over aesthetics. You can improve the visual appeal by adding CSS styles to the css/event3d.css file.

## Note: During hilbert transformation, oregondsp.js library has builtin analog type butterworth filter only. So, analog type is used here. Digital type can be obtained by using appropriate transformation on analog type. FFT is performed on the data using tensorflow.js that gives the same output as of scipy.signal.fft. However, result of butterworth filter using oregondsp library differs from scipy.signal.butter(python) because scipy.signal.butter(N, Wn, btype='low', analog=False, output='ba', fs=None) in python uses analog false i.e digital type by default. So, I have left an analog type in my code. If want to use digital type, please inform me.


## Note: I didn't find any js library that performs rbf interpolation. So, I code rbfinterpolator.js from scratch. This script has been tested with scipy.interpolate.rbf(python) and gives the same/exact accurate output of the result of the scipy(python).

## Note: Plot of shower and angular plane can be rescaled appropriately. Please edit the mainevent_3d.js library which contains layout of those plot or otherwise please inform me for the update.

## Contact

Feel free to reach out to the project author for any questions or contributions.
