'use strict';

const diceLib = (function() {
  function rollDie(die) {
    // Get a random face of the die, and the symbols on it
    const rolledFace = Math.floor(Math.random() * die.faceCount) + 1;
    const rolledSymbols = die.faces[rolledFace];
    return rolledSymbols;
  }

  const symbol = {
      TRIUMPH: 'TRIUMPH',
      SUCCESS: 'SUCCESS',
      ADVANTAGE: 'ADVANTAGE',
      THREAT: 'THREAT',
      FAILURE: 'FAILURE',
      DESPAIR: 'DESPAIR'
  };

  const setback = {
      faceCount: 6,
      faces: {
          1: [],
          2: [],
          3: [ symbol.THREAT ],
          4: [ symbol.THREAT ],
          5: [ symbol.FAILURE ],
          6: [ symbol.FAILURE ]
      }
  };

  const boost = {
      faceCount: 6,
      faces: {
          1: [],
          2: [],
          3: [ symbol.ADVANTAGE ],
          4: [ symbol.ADVANTAGE, symbol.ADVANTAGE ],
          5: [ symbol.SUCCESS ],
          6: [ symbol.SUCCESS, symbol.ADVANTAGE ]
      }
  };

  const ability = {
      faceCount: 8,
      faces: {
          1: [],
          2: [ symbol.ADVANTAGE ],
          3: [ symbol.ADVANTAGE ],
          4: [ symbol.ADVANTAGE, symbol.ADVANTAGE ],
          5: [ symbol.SUCCESS ],
          6: [ symbol.SUCCESS ],
          7: [ symbol.SUCCESS, symbol.ADVANTAGE ],
          8: [ symbol.SUCCESS, symbol.SUCCESS ]
      }
  };

  const difficulty = {
      faceCount: 8,
      faces: {
          1: [],
          2: [ symbol.THREAT ],
          3: [ symbol.THREAT ],
          4: [ symbol.THREAT ],
          5: [ symbol.THREAT, symbol.THREAT ],
          6: [ symbol.FAILURE ],
          7: [ symbol.THREAT, symbol.FAILURE ],
          8: [ symbol.FAILURE, symbol.FAILURE ]
      }
  };

  const proficiency = {
      faceCount: 12,
      faces: {
          1:  [],
          2:  [ symbol.ADVANTAGE ],
          3:  [ symbol.ADVANTAGE, symbol.ADVANTAGE ],
          4:  [ symbol.ADVANTAGE, symbol.ADVANTAGE ],
          5:  [ symbol.SUCCESS ],
          6:  [ symbol.SUCCESS ],
          7:  [ symbol.SUCCESS, symbol.ADVANTAGE ],
          8:  [ symbol.SUCCESS, symbol.ADVANTAGE ],
          9:  [ symbol.SUCCESS, symbol.ADVANTAGE ],
          10: [ symbol.SUCCESS, symbol.SUCCESS ],
          11: [ symbol.SUCCESS, symbol.SUCCESS ],
          12: [ symbol.TRIUMPH ]
      }
  };

  const challenge = {
      faceCount: 12,
      faces: {
          1:  [],
          2:  [ symbol.THREAT ],
          3:  [ symbol.THREAT ],
          4:  [ symbol.THREAT, symbol.THREAT ],
          5:  [ symbol.THREAT, symbol.THREAT ],
          6:  [ symbol.FAILURE ],
          7:  [ symbol.FAILURE ],
          8:  [ symbol.FAILURE, symbol.THREAT ],
          9:  [ symbol.FAILURE, symbol.THREAT ],
          10: [ symbol.FAILURE, symbol.FAILURE ],
          11: [ symbol.FAILURE, symbol.FAILURE ],
          12: [ symbol.DESPAIR ]
      }
  };

  return {
    boost: boost,
    setback: setback,
    ability: ability,
    difficulty: difficulty,
    proficiency: proficiency,
    challenge: challenge,
    symbol: symbol,

    rollDie: rollDie
  }
})();