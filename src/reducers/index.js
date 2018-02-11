import { combineReducers } from 'redux';

import competitions from './competitions';
import fixtures from './fixtures';
import teams from './teams';
import tables from './tables';

export default combineReducers({
  competitions,
  fixtures,
  teams,
  tables,
});
