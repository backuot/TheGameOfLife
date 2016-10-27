import { ADD_FIELD, GAME_PROCESS, STATE_GAME } from '../constants/gameControl';

export function createField() {
  return {
    type: ADD_FIELD,
  };
}

export function changeStructureField() {
  return {
    type: GAME_PROCESS,
  };
}

export function setStateGame(status) {
  return {
    type: STATE_GAME,
    payload: status,
  };
}
