import { ADD_FIELD, GAME_PROCESS } from '../constants/gameControl';
import { ENABLE_CELL } from '../constants/gameField';

function inRange(value, minValue, maxValue) {
  if (value === undefined) return false;
  return (value <= maxValue && value >= minValue);
}

function rowsZero(rows, columns) {
  return (rows === 0 && columns !== 0);
}

function columnsZero(rows, columns) {
  return (columns === 0 && rows !== 0);
}

export function initialField(rowsCount = 33, columnsCount = 37) {
  let rows = inRange(rowsCount, 0, 33) ? rowsCount : 33;
  let columns = inRange(columnsCount, 0, 37) ? columnsCount : 37;

  if (rowsZero(rows, columns)) {
    rows = 33;
  } else if (columnsZero(rows, columns)) {
    columns = 37;
  }

  const zeroRow = Array.apply(null, new Array(columns)).map(Number.prototype.valueOf, 0);

  return Array.apply(null, new Array(rows)).map(Array.prototype.valueOf, zeroRow);
}

export function getStatusField(data) {
  let enable = 0;
  let disable = 0;

  if (data) {
    data.forEach((items) =>
      items.forEach((item) => {
        if (item) {
          enable++;
        } else {
          disable++;
        }
      })
    );
  }

  return { enable, disable };
}

function onEqual(opLeft, opRight) {
  return (opLeft === opRight);
}

function isCurrentCell(leftCoordinate, rightCoordinate, leftIndex, rightIndex) {
  return (leftCoordinate === leftIndex && rightCoordinate === rightIndex);
}

export function enableCell(data, row, column) {
  if (!data) return 0;
  if (!inRange(row, 0, data.length) || !inRange(column, 0, data[0].length)) return 0;

  return data.map((items, rowIndex) =>
    items.map((item, columnIndex) => {
      if (isCurrentCell(row, column, rowIndex, columnIndex)) return item ? 0 : 1;
      return item;
    })
  );
}

function top(row) {
  return (row - 1 >= 0);
}

function left(column) {
  return (column - 1 >= 0);
}

function right(column, columns) {
  return (column + 1 < columns);
}

function bottom(row, rows) {
  return (row + 1 < rows);
}

export function scoreNeighborsCell(data, row, column) {
  let count = 0;
  let rows = 0;
  let columns = 0;

  if (!data) return 0;
  if (!inRange(row, 0, data.length) && !inRange(column, 0, data[0].length)) return 0;

  rows = data.length;
  columns = data[0].length;

  count += top(row) ? data[row - 1][column] : 0;
  count += bottom(row, rows) ? data[row + 1][column] : 0;
  count += left(column) ? data[row][column - 1] : 0;
  count += right(column, columns) ? data[row][column + 1] : 0;

  count += (top(row) && left(column)) ? data[row - 1][column - 1] : 0;
  count += (top(row) && right(column, columns)) ? data[row - 1][column + 1] : 0;
  count += (bottom(row, rows) && left(column)) ? data[row + 1][column - 1] : 0;
  count += (bottom(row, rows) && right(column, columns)) ? data[row + 1][column + 1] : 0;

  return count;
}

function cellIsDeath(count) {
  return (count < 2 || count > 3) ? 0 : 1;
}

export function changeStructureField(data) {
  let count = 0;

  if (!data) return 0;

  return data.map((items, row) =>
    items.map((item, column) => {
      count = scoreNeighborsCell(data, row, column);
      if (item) return cellIsDeath(count);
      return (count === 3);
    })
  );
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
