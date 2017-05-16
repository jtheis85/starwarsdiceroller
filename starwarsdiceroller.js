'use strict';

(function() {
    function rollSingleDie(die) {
        // Get a random face of the die, and the symbols on it
        const rolledFace = Math.floor(Math.random() * die.faceCount) + 1;
        const rolledSymbols = die.faces[rolledFace];
        return rolledSymbols;
    }

    function printSymbols (symbols, label) {
        const result = symbols.length === 0
            ? 'No Symbols Rolled!'
            : symbols.join(' ');
        console.log(label + ': ' + result);
    }

    function rollDice(dice) {
        // Produces an array of arrays of symbols
        return groupSymbols(dice.map(function(die) {
            return rollSingleDie(die);
        // Combine the results into a single array
        }).reduce(function(prev, next) {
            return prev.concat(next);
        }, []));
    }

    function cancelSymbols(groupedSymbols) {
        // "Destructure" the groups
        var successes = groupedSymbols.successes;
        var failures = groupedSymbols.failures;
        var advantages = groupedSymbols.advantages;
        var threats = groupedSymbols.threats;
        var triumphs = groupedSymbols.triumphs;
        var despairs = groupedSymbols.despairs;

        // Cancel successes and failures
        var successesAndFailures = [];
        if(successes.length > failures.length) {
            successesAndFailures = successes.slice(0, successes.length - failures.length);
        } else if (successes.length < failures.length) {
            successesAndFailures = failures.slice(0, failures.length - successes.length);
        }

        var advantagesAndThreats = [];
        if(advantages.length > threats.length) {
            advantagesAndThreats = advantages.slice(0, advantages.length - threats.length);
        } else if (advantages.length < threats.length) {
            advantagesAndThreats = threats.slice(0, threats.length - advantages.length);
        }

        return triumphs.concat(despairs, successesAndFailures, advantagesAndThreats);
    }

    function groupSymbols(symbols) {
        // Isolate each symbol - we want to display them sorted by type
        var successes = symbols.filter(function(symbol) {
            return symbol === diceLib.symbol.SUCCESS;
        });
        var failures = symbols.filter(function(symbol) {
            return symbol === diceLib.symbol.FAILURE;
        });
        var advantages = symbols.filter(function(symbol) {
            return symbol === diceLib.symbol.ADVANTAGE;
        });
        var threats = symbols.filter(function(symbol) {
            return symbol === diceLib.symbol.THREAT;
        });
        var triumphs = symbols.filter(function(symbol) {
            return symbol === diceLib.symbol.TRIUMPH;
        });
        var despairs = symbols.filter(function(symbol) {
            return symbol === diceLib.symbol.DESPAIR;
        });

        return {
            triumphs: triumphs,
            despairs: despairs,
            successes: successes,
            failures: failures,
            advantages: advantages,
            threats: threats
        }
    }

    function outputSymbols(symbols, isRaw) {
        isRaw = isRaw || false;
        var output;
        if(isRaw) {
            output = document.getElementsByClassName('results-raw')[0];
        } else {
            output = document.getElementsByClassName('results-cancelled')[0];
        }

        symbols.forEach(function(symbol) {
            var svg = createSvgElement('svg');
            addSvgAttribute(svg, 'class', 'symbol');
            addSvgAttribute(svg, 'width', 50);
            addSvgAttribute(svg, 'height', 50);
            var use = createSvgElement('use');
            addSvgAttribute(use, 'href', 'symbols.svg#' + symbol.toLowerCase());

            svg.appendChild(use);
            output.appendChild(svg);
        });
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

    var rolledGroupedSymbols = rollDice([
        diceLib.proficiency,
        diceLib.proficiency,
        diceLib.ability,
        diceLib.ability,
        diceLib.boost,
        diceLib.boost,
        diceLib.boost,
        diceLib.setback,
        diceLib.setback,
        diceLib.difficulty,
        diceLib.challenge
    ]);

    // Display the uncancelled symbols
    var rolledSymbols = Object.keys(rolledGroupedSymbols).reduce(function(arr, next) {
        return arr.concat(rolledGroupedSymbols[next])
    }, []);
    var isRaw = true;
    outputSymbols(rolledSymbols, isRaw);

    // Display the final cancelled symbols
    var cancelledSymbols = cancelSymbols(rolledGroupedSymbols);
    outputSymbols(cancelledSymbols);
})();