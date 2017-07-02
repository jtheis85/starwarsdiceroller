'use strict';

(function() {

  var proficiencyCount = 0;
  var abilityCount = 0;
  var boostCount = 0;
  var setbackCount = 0;
  var difficultyCount = 0;
  var challengeCount = 0;

  function rollAll() {
    var dice = [];
    addDice(diceLib.proficiency, proficiencyCount);
    addDice(diceLib.ability, abilityCount);
    addDice(diceLib.boost, boostCount);
    addDice(diceLib.setback, setbackCount);
    addDice(diceLib.difficulty, difficultyCount);
    addDice(diceLib.challenge, challengeCount);

    function addDice(die, count) {
      for(var i = 0; i < count; i++) {
        dice.push(die);
      }
    }

    var rolledGroupedSymbols = rollDice(dice);

    // Convert the groups of plain symbols to symbol descriptor objects
    Object.keys(rolledGroupedSymbols).forEach(function(groupKey) {
      rolledGroupedSymbols[groupKey] = rolledGroupedSymbols[groupKey].map(function(symbol) {
        return {
          glyph: symbol,
          isCancelled: false
        }
      })
    });

    // Display the final cancelled symbols
    var cancelledSymbols = cancelSymbols(rolledGroupedSymbols);
    ui.outputSymbols(cancelledSymbols);

    var markedSymbols = markSymbols(rolledGroupedSymbols);
    // Flatten the grouped symbols for display
    var rolledSymbols = Object.keys(markedSymbols).reduce(function(arr, next) {
      return arr.concat(markedSymbols[next])
    }, []);
    // Display the uncancelled symbols
    var isRaw = true;
    ui.outputSymbols(rolledSymbols, isRaw);
  }
  ui.hookUpRollAll(rollAll);

  function dieClick(dieType, isSelected) {
    switch(dieType) {
      case 'proficiency':
        proficiencyCount += isSelected ? 1 : -1;
        break;
      case 'ability':
        abilityCount += isSelected ? 1 : -1;
        break;
      case 'boost':
        boostCount += isSelected ? 1 : -1;
        break;
      case 'setback':
        setbackCount += isSelected ? 1 : -1;
        break;
      case 'difficulty':
        difficultyCount += isSelected ? 1 : -1;
        break;
      case 'challenge':
        challengeCount += isSelected ? 1 : -1;
        break;
    }
  }
  ui.hookUpDieClick(dieClick);

  function rollDice(dice) {
    // Produces an array of arrays of symbols
    return groupSymbols(dice.map(function(die) {
      return diceLib.rollDie(die);
      // Combine the results into a single array
    }).reduce(function(prev, next) {
      return prev.concat(next);
    }, []));
  }

  function markSymbols(groupedSymbols) {
    // "Destructure" the groups
    var successes = groupedSymbols.successes;
    var failures = groupedSymbols.failures;
    var advantages = groupedSymbols.advantages;
    var threats = groupedSymbols.threats;
    var triumphs = groupedSymbols.triumphs;
    var despairs = groupedSymbols.despairs;

    // Cancel successes and failures
    var i;
    if(successes.length > failures.length) {
        for(i = successes.length - failures.length; i < successes.length; i++) {
            successes[i].isCancelled = true;
        }
        // Mark all failures cancelled
        for(i = 0; i < failures.length; i++) {
            failures[i].isCancelled = true;
        }
    } else if (successes.length < failures.length) {
        for(i = failures.length - successes.length; i < failures.length; i++) {
            failures[i].isCancelled = true;
        }
        // Mark all successes cancelled
        for(i = 0; i < successes.length; i++) {
            successes[i].isCancelled = true;
        }
    } else if (successes.length === failures.length) {
      // Equal number, all successes and failures cancel
      successes.forEach(function(success) {
        success.isCancelled = true;
      });
      failures.forEach(function(failure) {
        failure.isCancelled = true;
      });
    }

    if(advantages.length > threats.length) {
        for(i = advantages.length - threats.length; i < advantages.length; i++) {
            advantages[i].isCancelled = true;
        }
        // Mark all threats cancelled
        for(i = 0; i < threats.length; i++) {
            threats[i].isCancelled = true;
        }
    } else if (advantages.length < threats.length) {
        for(i = threats.length - advantages.length; i < threats.length; i++) {
            threats[i].isCancelled = true;
        }
        // Mark all advantages cancelled
        for(i = 0; i < advantages.length; i++) {
            advantages[i].isCancelled = true;
        }
    } else if (advantages.length === threats.length) {
      // Equal number, all advantages and threats cancel
      advantages.forEach(function(advantage) {
        advantage.isCancelled = true;
      });
      threats.forEach(function(threat) {
        threat.isCancelled = true;
      });
    }

    return triumphs.concat(despairs, successes, failures, advantages, threats);
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
})();