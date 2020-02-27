import { combineReducers } from 'redux';

import competitions from './competitions';
import matches from './matches';
import standings from './standings';
import teams from './teams';
import players from './players';

const rootReducer = combineReducers({
  competitions,
  matches,
  standings,
  teams,
  players,
});

export default rootReducer;
