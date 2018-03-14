import * as conf from "conf";

const defaultState = {
    'round': 0,
    'lvl': 0,
    'playersStep': 0,
    'playersTurn': false,
    'compTurn': true,
    'sequence': [],
    'status': 'stop'
}

export default function (state = defaultState, action) {
    let temp;
    let newState = JSON.parse(JSON.stringify(state));

    switch (action.type) {

        case conf.COMP_MOVE:
            let newSeq = state.sequence
            if (newSeq[newSeq.length - 1] === 0) newSeq.pop()
            newSeq.push(Math.floor(Math.random()*4)+1)
            newSeq.push(0)
            let newRound = state.round + 1
            newState = {
                ...newState,
                'playersStep': 0,
                'round': newRound,
                'sequence': newSeq,
                'playersTurn': false,
                'compTurn': true
            }
            return newState

        case conf.PLAYER_MOVE:
            newState = {
                ...newState,
                'playersTurn': true,
                'compTurn': false
            }
            return newState

        case conf.PLAYER_STEP:
            newState.playersStep = state.playersStep + 1
            return newState

        case conf.GAME_OVER:
            newState = {
                ...newState,
                'round':  0,
                'playersStep': 0,
                'playersTurn': false,
                'compTurn': true,
                'sequence': [],
                'status': 'gameOver'
            }
            return newState

        case conf.GAME_OVER_REMOVE:
            newState.status = 'start'
            return newState

        case conf.CHANGE_DIFFICULTY:
            newState.lvl = action.lvl
            return newState

        default:
            return state
    }
    return state;
}

