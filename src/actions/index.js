import * as conf from 'conf';

export const compMove = () => {
    return {
        type: conf.COMP_MOVE
    }
}
export const playerMove = () => {
    return {
        type: conf.PLAYER_MOVE
    }
}
export const playerStep = () => {
    return {
        type: conf.PLAYER_STEP
    }
}
export const gameOver = () => {
    return {
        type: conf.GAME_OVER
    }
}
export const gameOverRemove = () => {
    return {
        type: conf.GAME_OVER_REMOVE
    }
}
export const changeDifficulty = (lvl) => {
    return {
        type: conf.CHANGE_DIFFICULTY,
        lvl
    }
}