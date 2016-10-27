import {
  default as configureStore
} from '../store/configureStore'
import { ADD_FIELD, GAME_PROCESS, STATE_GAME } from '../constants/gameControl';
import { ENABLE_CELL } from '../constants/gameField';

describe('Test: configureStore', function () {
  let store = configureStore();

  it('should have an empty asyncReducers object', () => {
    expect(store.asyncReducers).to.be.an('object')
    expect(store.asyncReducers).to.be.empty
  })

  it('store should be dispatch ADD_FIELD', () => {
    function createMatrix(rows = 33, columns = 37) {
      let data = [];

      for (let row = 0; row < rows; row++) {
        data[row] = [];
        for (let column = 0; column < columns; column++) {
          data[row][column] = 0;
        }
      }

      return data;
    }

    let data = createMatrix();

    store.dispatch({
      type: 'ADD_FIELD',
    })

    expect(store.getState().gameFieldState.field.length).to.deep.equal(data.length)
    expect(store.getState().gameFieldState.info).to.deep.equal({disable: 1221, enable: 0,})
  })

  it('store should be dispatch ENABLE_CELL', () => {
    store.dispatch({
      type: 'ENABLE_CELL',
      payload: {row: 1, column:1},
    })

    expect(store.getState().gameFieldState.info).to.deep.equal({disable: 1220, enable: 1,})
  })

  it('store should be dispatch GAME_PROCESS', () => {
    store.dispatch({
      type: 'GAME_PROCESS',
    })

    expect(store.getState().gameFieldState.info).to.deep.equal({disable: 1221, enable: 0,})
  })

  it('store should be dispatch STATE_GAME', () => {
    store.dispatch({
      type: 'STATE_GAME',
      payload: 1
    })

    expect(store.getState().gameControlState.stateGameText).to.deep.equal('Пауза')
  })
});
