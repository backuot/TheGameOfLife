import { ENABLE_CELL } from '../constants/Within';


export function enableCell(obj) {
  return {
    type: ENABLE_CELL,
    payload: obj,
  };
}
