import { combineReducers } from 'redux';

import competitions from './competitions';
import fixtures from './fixtures';
import teams from './teams';
import standings from './standings';

export default combineReducers({
  competitions,
  fixtures,
  teams,
  standings,
});
