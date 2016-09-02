import { ADD_FIELD, GAME_PROCESS, STATE_GAME } from '../constants/Process'

export function addField() {
    
    return {
        type: ADD_FIELD
    }
}
export function gameProcess() {
    
    return {
        type: GAME_PROCESS
    }
}
export function stateGame(status) {
    
    return {
        type: STATE_GAME,
        payload: status
    }
}