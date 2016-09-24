import { ADD_FIELD, GAME_PROCESS } from '../constants/process';
import { ENABLE_CELL } from '../constants/within';

export function initialData(n = 33, m = 37) {
  var data = [],
      i,
      j;

  for (i = 0; i < n; i++) {
    data[i] = [];
    for (j = 0; j < m; j++) {
      data[i][j] = 0;
    }
  }

  return data;
}

export function statusData(data) {
  var enable = 0,
      disable = 0,
      i,
      j;

  for (i = 0; i < data.length; i++) {
    for (j = 0; j < data[0].length; j++) {
      if (data[i][j]) {
        enable++;
      } else {
        disable++;
      }
    }
  }

  return { enable, disable };
}

export function enableCell(data, i, j) {
  var copy = data.slice();

  if (!copy[i][j]) {
    copy[i][j] = 1;
  } else {
    copy[i][j] = 0;
  }

  return copy;
}

export function scoreNeighbors(data, i, j) {
  var count = 0,
      n = data.length,
      m = data[0].length;

  //Здесь внешнее условие - проверка на валидность индекса,
  //внутреннее - проверка на активность ячейки по этому индексу.
  //Внешних условий 8, т.к. ячейка может иметь всего 8 соседей.

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
