import { combineReducers } from 'redux';

import competitions from './competitions';
import fixtures from './fixtures';
import teams from './teams';

export default combineReducers({
  competitions,
  fixtures,
  teams,
});
