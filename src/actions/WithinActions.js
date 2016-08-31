import {ENABLE_CELL} from '../constants/Within'


export function enableCell(obj) {
    
     
    return (dispatch) => {
        dispatch({
            type: ENABLE_CELL,
            payload: obj
        })
    }
}
