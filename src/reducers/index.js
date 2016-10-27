import { combineReducers } from 'redux';
import gameFieldState from './gameFieldState';
import gameControlState from './gameControlState';

export default combineReducers({
  gameFieldState,
  gameControlState,
});
