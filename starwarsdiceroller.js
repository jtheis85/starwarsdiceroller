'use strict';

(function() {
    function rollSingleDie(die) {
        // Get a random face of the die, and the symbols on it
        const rolledFace = Math.floor(Math.random() * die.faceCount) + 1;
        const rolledSymbols = die.faces[rolledFace];
        printSymbols(rolledSymbols, 'Die');
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
        const rolledSymbols = dice.map(function(die) {
            return rollSingleDie(die);
        // Combine the results into a single array
        }).reduce(function(prev, next) {
            return prev.concat(next);
        }, []);

        printSymbols(rolledSymbols, 'All Symbols');

        // Isolate each symbol - we want to display them sorted by type
        var successes = rolledSymbols.filter(function(symbol) {
            return symbol === diceLib.symbol.SUCCESS;
        });
        var failures = rolledSymbols.filter(function(symbol) {
            return symbol === diceLib.symbol.FAILURE;
        });
        var advantages = rolledSymbols.filter(function(symbol) {
            return symbol === diceLib.symbol.ADVANTAGE;
        });
        var threats = rolledSymbols.filter(function(symbol) {
            return symbol === diceLib.symbol.THREAT;
        });
        var triumphs = rolledSymbols.filter(function(symbol) {
            return symbol === diceLib.symbol.TRIUMPH;
        });
        var despairs = rolledSymbols.filter(function(symbol) {
            return symbol === diceLib.symbol.DESPAIR;
        });

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

        var finalSymbols = triumphs
            .concat(despairs)
            .concat(successesAndFailures)
            .concat(advantagesAndThreats);

        printSymbols(finalSymbols, 'Cancelled Symbols');

        return finalSymbols;
    }

    rollDice([
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
})();