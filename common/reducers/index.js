import { combineReducers } from 'redux';

import competitions from './competitions';
import fixtures from './fixtures';
import teams from './teams';
import standings from './standings';
import squads from './squads';

export default combineReducers({
  competitions,
  fixtures,
  teams,
  standings,
  squads,
});
