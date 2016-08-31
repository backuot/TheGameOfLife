import { STATE_GAME } from '../constants/Process'

const initialState = {
    status: 0,
    text: 'Старт'
};

function setState(status){
    if(status) return 'Пауза';
    else return 'Старт';
}

export default function within(state = initialState, action) {

  switch (action.type) {
          
    case STATE_GAME:
        return { ...state, 
                status: action.payload,
                text: setState(action.payload)
               }
    default:
      return state;
  }
}