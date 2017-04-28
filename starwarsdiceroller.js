'use strict';

(function() {
    function roll(die) {
        const rolledFace = Math.floor(Math.random() * die.faceCount) + 1;
        const rolledSymbols = die.faces[rolledFace];
        const result = rolledSymbols.length === 0
            ? 'BLANK'
            : rolledSymbols.join(' ');


        console.log(result);
    }

    roll(dice.boost);
})();