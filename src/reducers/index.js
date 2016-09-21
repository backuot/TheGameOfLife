import { combineReducers } from 'redux';
import within from './Within';
import outside from './Outside';

export default combineReducers({
  within,
  outside,
});
