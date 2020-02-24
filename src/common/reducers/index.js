import { combineReducers } from 'redux';

import competitions from './competitions';
import matches from './matches';

const rootReducer = combineReducers({
  competitions,
  matches,
});

export default rootReducer;
