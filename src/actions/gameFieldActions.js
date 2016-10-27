import { ENABLE_CELL } from '../constants/gameField';

export function enableCell(obj) {
  return {
    type: ENABLE_CELL,
    payload: obj,
  };
}
