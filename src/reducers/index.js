import { combineReducers } from 'redux';
import competitions from './competitions';
import fixtures from './fixtures';

export default combineReducers({
  competitions,
  fixtures,
});
