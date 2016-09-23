import { combineReducers } from 'redux';
import within from './within';
import outside from './outside';

export default combineReducers({
  within,
  outside,
});
