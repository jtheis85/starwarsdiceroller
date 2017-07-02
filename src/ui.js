/**
 * Responsible for rendering and updating the UI
 */

'use strict';

// Get important DOM elements
var rawOutput = document.getElementsByClassName('results-raw')[0];
var cancelledOutput = document.getElementsByClassName('results-cancelled')[0];

function hookUpDieClick(dieClickCallback) {
  [].forEach.call(document.querySelectorAll('.die'), function (die) {
    die.addEventListener('click', function (event) {
      // Visually toggle the appearance of the die
      die.classList.toggle('selected');

      // Figure out what kind of die was clicked
      var dieType = die.className.split(' ').filter(function(className) {
        return className !== 'die';
      })[0];
      dieClickCallback(dieType, die.classList.contains('selected'));
    })
  });
}

/**
 * Hook up the given callback to be triggered when the roll button is clicked (after
 * clearing the output of course)
 * @param rollAllCallback the function to call when the roll button is clicked
 */
function hookUpRollAll (rollAllCallback) {
  // Listen for clicks on the roll button
  document.getElementById('roll-button').addEventListener('click', function (event) {
    clearAllOutput();
    rollAllCallback();
  });
}

/**
 * Wipe away the rolled results so a fresh set can be displayed
 */
function clearAllOutput() {
  while (rawOutput.firstChild) {
    rawOutput.removeChild(rawOutput.firstChild);
  }
  while (cancelledOutput.firstChild) {
    cancelledOutput.removeChild(cancelledOutput.firstChild);
  }
}

function outputSymbol(size, output, symbol) {
  var svg = createSvgElement('svg');
  if (symbol.isCancelled) {
    addSvgAttribute(svg, 'class', 'symbol cancelled');
  } else {
    addSvgAttribute(svg, 'class', 'symbol');
  }
  addSvgAttribute(svg, 'width', size);
  addSvgAttribute(svg, 'height', size);
  var use = createSvgElement('use');
  addSvgAttribute(use, 'href', 'symbols.svg#' + symbol.glyph.toLowerCase());

  svg.appendChild(use);
  output.appendChild(svg);
}

function createSvgElement(elementName) {
  var svgns = 'http://www.w3.org/2000/svg';
  return document.createElementNS(svgns, elementName);
}

function addSvgAttribute(element, attributeName, value) {
  if(attributeName === 'href') {
    var xlns = 'http://www.w3.org/1999/xlink';
    return element.setAttributeNS(xlns, attributeName, value);
  } else {
    return element.setAttribute(attributeName, value);
  }
}

function outputSymbols(symbols, isRaw) {
  isRaw = isRaw || false;
  var size = isRaw ? 25 : 50;
  var output = isRaw ? rawOutput : cancelledOutput;

  // Title the output areas
  var title = isRaw ? 'Raw Roll' : 'Final Results';
  var heading = document.createElement('h2');
  var titleNode = document.createTextNode(title);
  heading.appendChild(titleNode);
  output.appendChild(heading);

  symbols.forEach(function (symbol) {
    outputSymbol(size, output, symbol);
  });
}

var ui = {
  outputSymbols: outputSymbols,
  hookUpRollAll: hookUpRollAll,
  hookUpDieClick: hookUpDieClick
}

module.exports = ui;