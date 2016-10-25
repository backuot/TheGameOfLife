import { ENABLE_CELL } from '../constants/within';

export function enableCell(obj) {
  return {
    type: ENABLE_CELL,
    payload: obj,
  };
}
