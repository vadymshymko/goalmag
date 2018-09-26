// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import nock from 'nock';
//
// import config from 'config';
//
// import { teams as types } from 'types';
// import * as actions from '../teams';
//
// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);
//
// const initialState = {
//   teams: {
//     entities: {},
//     ids: [],
//   },
// };
//
// const mockResponse = {
//   key: 'value',
// };
//
// const entities = {
//   1: {
//     id: 1,
//     key: 'value',
//     isFetching: false,
//     isRequestFailed: false,
//     isInitialized: true,
//   },
// };
//
// const ids = [1, 2, 3];
//
// const initializedState = {
//   teams: {
//     ...initialState.teams,
//     entities: {
//       ...entities,
//       2: {
//         isFetching: true,
//         isRequestFailed: false,
//         isInitialized: false,
//       },
//       3: {
//         isFetching: false,
//         isRequestFailed: true,
//         isInitialized: false,
//       },
//     },
//     ids,
//   },
// };
//
// describe('teams actions', () => {
//   afterEach(() => {
//     nock.cleanAll();
//   });
//
//   it('should not create any actions if team is currently fetching', () => {
//     const store = mockStore(initializedState);
//     const expectedActions = [];
//
//     return store.dispatch(actions.fetchTeam(2)).then(() => {
//       expect(store.getActions()).toEqual(expectedActions);
//     });
//   });
//
//   it('should not create any actions if team is initialized without errors', () => {
//     const store = mockStore(initializedState);
//     const expectedActions = [];
//
//     return store.dispatch(actions.fetchTeam(1)).then(() => {
//       expect(store.getActions()).toEqual(expectedActions);
//     });
//   });
//
//   it('should create FETCH_TEAM_REQUEST && FETCH_TEAM_SUCCESS if t
// eam is defined in store but it is previously requestFailed', () => {
//     const store = mockStore(initializedState);
//     const expectedActions = [
//       {
//         type: types.FETCH_TEAM_REQUEST,
//         payload: {
//           id: 3,
//         },
//       },
//       {
//         type: types.FETCH_TEAM_SUCCESS,
//         payload: {
//           id: 3,
//           crestUrl: '',
//           ...mockResponse,
//         },
//       },
//     ];
//
//     nock(`https:${config.apiRoot}`).get('/teams/3').reply(
//       200,
//       {
//         ...mockResponse,
//         id: 3,
//       },
//     );
//
//     return store.dispatch(actions.fetchTeam(3)).then(() => {
//       expect(store.getActions()).toEqual(expectedActions);
//     });
//   });
//
//   it('should create FETCH_TEAM_REQUEST && FETCH_TEAM_
// SUCCESS if team is not defined in store', () => {
//     const store = mockStore(initializedState);
//     const expectedActions = [
//       {
//         type: types.FETCH_TEAM_REQUEST,
//         payload: {
//           id: 4,
//         },
//       },
//       {
//         type: types.FETCH_TEAM_SUCCESS,
//         payload: {
//           id: 4,
//           crestUrl: '',
//           ...mockResponse,
//         },
//       },
//     ];
//
//     nock(`https:${config.apiRoot}`).get('/teams/4').reply(
//       200,
//       {
//         ...mockResponse,
//         id: 4,
//       },
//     );
//
//     return store.dispatch(actions.fetchTeam(4)).then(() => {
//       expect(store.getActions()).toEqual(expectedActions);
//     });
//   });
//
//   it('should create FETCH_TEAM_FAILURE', () => {
//     const store = mockStore(initialState);
//     const expectedActions = [
//       {
//         type: types.FETCH_TEAM_REQUEST,
//         payload: {
//           id: 5,
//         },
//       },
//       {
//         type: types.FETCH_TEAM_FAILURE,
//         payload: {
//           id: 5,
//         },
//       },
//     ];
//
//     nock(`https:${config.apiRoot}`).get('/teams/5').replyWithError({
//       message: 'Some Error',
//       code: 'AWFUL_ERROR',
//       statusCode: '500',
//     });
//
//     return store.dispatch(actions.fetchTeam(5)).catch(() => {
//       expect(store.getActions()).toEqual(expectedActions);
//     });
//   });
// });
