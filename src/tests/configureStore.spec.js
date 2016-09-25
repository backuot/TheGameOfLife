import {
  default as configureStore
} from '../store/configureStore'
import { ADD_FIELD, GAME_PROCESS, STATE_GAME } from '../constants/process';
import { ENABLE_CELL } from '../constants/within';

describe('Test: configureStore', function () {
  let store = configureStore();

  it('should have an empty asyncReducers object', () => {
    expect(store.asyncReducers).to.be.an('object')
    expect(store.asyncReducers).to.be.empty
  })

  it('store should be dispatch ADD_FIELD', () => {
    function createMatrix(n = 33, m = 37) {
      var data = [];

      for (var i = 0; i < n; i++) {
        data[i] = [];
        for (var j = 0; j < m; j++) {
          data[i][j] = 0;
        }
      }

      return data;
    }

    let data = createMatrix();

    store.dispatch({
      type: 'ADD_FIELD',
    })

    expect(store.getState().within.field.length).to.deep.equal(data.length)
    expect(store.getState().within.info).to.deep.equal({disable: 1221, enable: 0,})
  })

  it('store should be dispatch ENABLE_CELL', () => {
    store.dispatch({
      type: 'ENABLE_CELL',
      payload: {i: 1, j:1},
    })

    expect(store.getState().within.info).to.deep.equal({disable: 1220, enable: 1,})
  })

  it('store should be dispatch GAME_PROCESS', () => {
    store.dispatch({
      type: 'GAME_PROCESS',
    })
    
    expect(store.getState().within.info).to.deep.equal({disable: 1221, enable: 0,})
  })

  it('store should be dispatch STATE_GAME', () => {
    store.dispatch({
      type: 'STATE_GAME',
      payload: 1
    })

    expect(store.getState().outside.text).to.deep.equal('Пауза')
  })
});
