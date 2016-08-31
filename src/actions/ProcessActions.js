import { ADD_FIELD, GAME_PROCESS, STATE_GAME } from '../constants/Process'

export function addField() {
    
    return (dispatch) => {
        dispatch({
            type: ADD_FIELD
        })
    }
}
export function gameProcess() {
    
    return (dispatch) => {
        dispatch({
            type: GAME_PROCESS
        })
    }
}
export function stateGame(status) {
    
    return (dispatch) => {
        dispatch({
            type: STATE_GAME,
            payload: status
        })
    }
}