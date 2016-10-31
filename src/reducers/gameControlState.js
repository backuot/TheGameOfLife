import { STATE_GAME } from '../constants/gameControl';

const initialState = {
  stateGameText: 'Старт',
};

export function setStateText(status) {
  if (status) return 'Пауза';
  return 'Старт';
}

export default function gameControlState(state = initialState, action) {
  switch (action.type) {
    case STATE_GAME:
      return {
        ...state,
        stateGameText: setStateText(action.payload),
      };
    default:
      return state;
  }
}
