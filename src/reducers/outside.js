import { STATE_GAME } from '../constants/process';

const initialState = {
  text: 'Старт',
};

export function setState(status) {
  if (status) return 'Пауза';
  else return 'Старт';
}

export default function within(state = initialState, action) {
  switch (action.type) {
    case STATE_GAME:
      return {
        ...state,
        text: setState(action.payload),
      };
    default:
      return state;
  }
}
