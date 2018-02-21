import { combineReducers } from 'redux';

import competitions from './competitions';
import fixtures from './fixtures';
import teams from './teams';
import tables from './tables';
import squads from './squads';

export default combineReducers({
  competitions,
  fixtures,
  teams,
  tables,
  squads,
});
