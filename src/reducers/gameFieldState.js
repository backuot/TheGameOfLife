import { ADD_FIELD, GAME_PROCESS } from '../constants/gameControl';
import { ENABLE_CELL } from '../constants/gameField';

function inRange(value, minValue, maxValue) {
  if(value === undefined) return false;
  if (value > maxValue || value < minValue) return false;
  else return true;
}

export function initialField(rows = 33, columns = 37) {
  let data = [];

  if (!inRange(rows, 0, 33)) {
    rows = 33;
  }

  if (!inRange(columns, 0, 37)) {
    columns = 37;
  }

  if (rows === 0 && columns !== 0) {
    rows = 33;
  } else if(columns === 0 && rows !== 0) {
    columns = 37;
  }

  for (let row = 0; row < rows; row++) {
    data[row] = [];
    for (let column = 0; column < columns; column++) {
      data[row][column] = 0;
    }
  }

  return data;
}

export function getStatusField(data) {
  let enable = 0,
      disable = 0;

  if (data) {
    for (let row = 0; row < data.length; row++) {
      for (let column = 0; column < data[0].length; column++) {
        if (data[row][column]) {
          enable++;
        } else {
          disable++;
        }
      }
    }
  }

  return { enable, disable };
}

export function enableCell(data, row, column) {
  let copy = [];

  if (!data) return 0;
  if (!inRange(row, 0, data.length) || !inRange(column, 0, data[0].length)) return 0;

  copy = data.slice();

  if (!copy[row][column]) {
    copy[row][column] = 1;
  } else {
    copy[row][column] = 0;
  }

  return copy;
}

export function scoreNeighborsCell(data, row, column) {
  let count = 0,
      rows = 0,
      columns = 0;

  if (!data) return 0;
  if (!inRange(row, 0, data.length) && !inRange(column, 0, data[0].length)) return 0;

  rows = data.length;
  columns = data[0].length;

  if (column && data[row][column - 1]) {
    count++;
  }

  if ((column !== columns - 1) && data[row][column + 1]) {
    count++;
  }

  if (row && data[row - 1][column]) {
    count++;
  }

  if ((row !== rows - 1) && data[row + 1][column]) {
    count++;
  }

  if ((row && column) && data[row - 1][column - 1]) {
    count++;
  }

  if ((row !== rows - 1 && column !== rows - 1) && data[row + 1][column + 1]) {
    count++;
  }

  if ((row !== rows - 1 && column) && data[row + 1][column - 1]) {
    count++;
  }

  if ((column !== rows - 1 && row) && data[row - 1][column + 1]) {
    count++;
  }

  return count;
}

export function changeStructureField(data) {
  let copy = [],
      count = 0;

  if (!data) return 0;

  for (let row = 0; row < data.length; row++) {
    copy[row] = [];
    for (let column = 0; column < data[0].length; column++) {
      count = scoreNeighborsCell(data, row, column);
      if (data[row][column]) {
        if (count < 2 || count > 3) {
          copy[row][column] = 0;
        } else {
          copy[row][column] = 1;
        }
      } else if (count === 3) {
        copy[row][column] = 1;
      } else {
        copy[row][column] = 0;
      }
    }
  }

  return copy;
}

const initialState = {
  field: [],
  info: {
    enable: 0,
    disable: 0,
  },
};

export default function gameFieldState(state = initialState, action) {
  let data = [];

  switch (action.type) {
    case ADD_FIELD:
      data = initialField();

      return {
        ...state,
        field: data,
        info: getStatusField(data),
      };
    case ENABLE_CELL:
      data = enableCell(state.field, action.payload.row, action.payload.column);

      return {
        ...state,
        field: data,
        info: getStatusField(data),
      };
    case GAME_PROCESS:
      data = changeStructureField(state.field);

      return {
        ...state,
        field: data,
        info: getStatusField(data),
      };
    default:
      return state;
  }
}
