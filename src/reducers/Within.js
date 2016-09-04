import { ADD_FIELD, GAME_PROCESS } from '../constants/Process'
import { ENABLE_CELL } from '../constants/Within'

export function initialData(n = 33, m = 37) {
    var data = [];
    
    for (var i = 0; i < n; i++){
        data[i] = [];
        for (var j = 0; j < m; j++){
            data[i][j] = 0;
        }
    }   
    
    return data
}

export function statusData(data){
    var enable = 0;
    var disable = 0;
        
    for (var i = 0; i < data.length; i++){
        for (var j = 0; j < data[0].length; j++){
            if(data[i][j]) enable++;
            else disable++;
        }
    } 
    
    return {enable: enable, disable: disable}
}

export function enableCell(data, i, j){
    var copy = data;
    
    if(!copy[i][j]) copy[i][j] = 1;
    else copy[i][j] = 0;
    
    data = [];
    
    return copy
}

export function scoreNeighbors(data, i, j){
    var count = 0;
    var n = data.length;
    var m = data[0].length;
    
    if(j)if(data[i][j-1]) count++;
    if(j!== m-1)if(data[i][j+1]) count++;
    if(i)if(data[i-1][j]) count++;
    if(i!== n-1)if(data[i+1][j]) count++;
    if(i&&j)if(data[i-1][j-1]) count++;
    if(i!== n-1&&j!== n-1)if(data[i+1][j+1]) count++;
    if(i!== n-1&&j)if(data[i+1][j-1]) count++;
    if(j!== n-1&&i)if(data[i-1][j+1]) count++;
        
    return count;
}

export function process(data){
    var copy = [];

    for (var i = 0; i < data.length; i++){
        copy[i] = [];
        for(var j = 0; j < data[0].length; j++){
            var count = scoreNeighbors(data, i, j)
            if(data[i][j]) {
                if(count < 2 || count > 3) copy[i][j] = 0;
                else copy[i][j] = 1;
            }
            else if(count === 3) copy[i][j] = 1;
            else copy[i][j] = 0;
        }
    }
    
    data = [];
    
    return copy
}

const initialState = {
    field: [],
    info: {}
}

export default function within(state = initialState, action) {
    var data = [];
    
    switch (action.type) {         
        case ADD_FIELD:
            data = initialData();
            
            return {
                ...state,
                field: data,
                info: statusData(data)
            }
        case ENABLE_CELL:
            data = enableCell(state.field, action.payload.i, action.payload.j);
                        
            return {
                ...state,
                field: data,
                info: statusData(data)
            }
        case GAME_PROCESS:
            data = process(state.field);

            return {
                ...state,
                field: data,
                info: statusData(data)
            }
        default:
            return state
    }
}
