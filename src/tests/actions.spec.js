import {
  createField,
  changeStructureField,
  setStateGame,
} from '../actions/gameControlActions';
import { enableCell } from '../actions/gameFieldActions';

describe('Test: Action Creators', function () {
  it('addField valid', function () {
    expect(createField()).to.eql({ type: 'ADD_FIELD' });
  });

  it('gameProcess valid', function () {
    expect(changeStructureField()).to.eql({ type: 'GAME_PROCESS' });
  });

  it('stateGame valid', function () {
    expect(setStateGame(0)).to.eql({ type: 'STATE_GAME', payload: 0 });
  });

  it('enableCell valid', function () {
    expect(enableCell({ row: 0, column: 0 })).to.eql({ type: 'ENABLE_CELL', payload: { row: 0, column: 0 } });
  });
});
