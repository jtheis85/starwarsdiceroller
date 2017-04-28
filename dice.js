'use strict';

const dice = (function() {
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

    return {
        boost: boost,
        setback: setback
    }
})();