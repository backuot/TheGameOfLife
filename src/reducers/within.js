import { ADD_FIELD, GAME_PROCESS } from '../constants/process';
import { ENABLE_CELL } from '../constants/within';

function inRange(value, minValue, maxValue) {
  if (value > maxValue || value < minValue) return false;
  else return true;
}

export function initialData(n = 33, m = 37) {
  let data = [];
  let rows = inRange(n, 0, 33) ? n : 33;
  let columns = inRange(m, 0, 37) ? m : 37;

  if(rows === 0 && columns !== 0) {
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

export function statusData(data) {
  var enable = 0,
      disable = 0,
      i,
      j;

  if (data) {
    for (i = 0; i < data.length; i++) {
      for (j = 0; j < data[0].length; j++) {
        if (data[i][j]) {
          enable++;
        } else {
          disable++;
        }
      }
    }
  }

  return { enable, disable };
}

export function enableCell(data, i, j) {
  var copy;

  if (!data) return 0;
  if (!(i <= data.length && i >= 0 && j <= data[0].length && j >= 0)) return data;

  copy = data.slice();

  if (!copy[i][j]) {
    copy[i][j] = 1;
  } else {
    copy[i][j] = 0;
  }

  return copy;
}

export function scoreNeighbors(data, i, j) {
  var count,
      n,
      m;

  if (!data) return 0;
  if (!(i <= data.length && i >= 0 && j <= data[0].length && j >= 0)) return 0;

  count = 0;
  n = data.length;
  m = data[0].length;

  if (j && data[i][j - 1]) {
    count++;
  }

  if ((j !== m - 1) && data[i][j + 1]) {
    count++;
  }

  if (i && data[i - 1][j]) {
    count++;
  }

  if ((i !== n - 1) && data[i + 1][j]) {
    count++;
  }

  if ((i && j) && data[i - 1][j - 1]) {
    count++;
  }

  if ((i !== n - 1 && j !== n - 1) && data[i + 1][j + 1]) {
    count++;
  }

  if ((i !== n - 1 && j) && data[i + 1][j - 1]) {
    count++;
  }

  if ((j !== n - 1 && i) && data[i - 1][j + 1]) {
    count++;
  }

  return count;
}

export function process(data) {
  var copy = [],
      count = 0,
      i,
      j;

  if (!data) return 0;

  for (i = 0; i < data.length; i++) {
    copy[i] = [];
    for (j = 0; j < data[0].length; j++) {
      count = scoreNeighbors(data, i, j);
      if (data[i][j]) {
        if (count < 2 || count > 3) {
          copy[i][j] = 0;
        } else {
          copy[i][j] = 1;
        }
      } else if (count === 3) {
        copy[i][j] = 1;
      } else {
        copy[i][j] = 0;
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

export default function within(state = initialState, action) {
  let data = [];

  switch (action.type) {
    case ADD_FIELD:
      data = initialData();

      return {
        ...state,
        field: data,
        info: statusData(data),
      };
    case ENABLE_CELL:
      data = enableCell(state.field, action.payload.i, action.payload.j);

      return {
        ...state,
        field: data,
        info: statusData(data),
      };
    case GAME_PROCESS:
      data = process(state.field);

      return {
        ...state,
        field: data,
        info: statusData(data),
      };
    default:
      return state;
  }
}
