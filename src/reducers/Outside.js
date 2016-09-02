import { STATE_GAME } from '../constants/Process'

const initialState = {
    text: 'Старт'
};

function setState(status){
    if(status) return 'Пауза';
    else return 'Старт';
}

export default function within(state = initialState, action) {

  switch (action.type) {
          
    case STATE_GAME:
        return {
            ...state,
            text: setState(action.payload)
        }
    default:
      return state;
  }
}