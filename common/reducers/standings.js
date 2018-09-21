import { createReducer } from 'utils';
import { standings as types } from 'types';

const initialState = {};

const standings = createReducer(initialState, {
  // [types.FETCH_STANDINGS_REQUEST]: (state, action) => ({
  //   ...state,
  //   entities: {
  //     ...state.entities,
  //     [action.payload.id]: standing(state[action.payload.id], action),
  //   },
  //   ids: [
  //     ...state.ids,
  //     action.payload.id,
  //   ],
  // }),
  //
  // [types.FETCH_STANDINGS_SUCCESS]: (state, action) => ({
  //   ...state,
  //   entities: {
  //     ...state.entities,
  //     [action.payload.id]: standing(state[action.payload.id], action),
  //   },
  // }),
  //
  // [types.FETCH_STANDINGS_FAILURE]: (state, action) => ({
  //   ...state,
  //   entities: {
  //     ...state.entities,
  //     [action.payload.id]: standing(state[action.payload.id], action),
  //   },
  // }),
});

export default standings;
