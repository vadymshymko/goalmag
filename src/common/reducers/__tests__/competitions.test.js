// import { competitions as types } from 'types';
// import reducer from '../competitions';
//
// const initialState = {
//   entities: {},
//   ids: [],
//   isFetching: false,
//   isRequestFailed: false,
//   lastUpdated: 0,
// };
//
// const fetchingState = {
//   ...initialState,
//   isFetching: true,
// };
//
// const entities = {
//   1: {
//     id: 1,
//     caption: '1 caption',
//   },
//   2: {
//     id: 2,
//     caption: '2 caption',
//   },
// };
//
// const ids = [1, 2];
//
// const initializedState = {
//   ...initialState,
//   entities,
//   ids,
//   lastUpdated: 1000,
// };
//
// const failureState = {
//   ...initialState,
//   lastUpdated: 1000,
//   isRequestFailed: true,
// };
//
// describe('competitions reducer', () => {
//   it('should return initial state', () => {
//     expect(reducer(undefined, {})).toEqual(initialState);
//   });
//
//   it('should return fetchingState', () => {
//     expect(reducer(undefined, {
//       type: types.FETCH_COMPETITIONS_REQUEST,
//     })).toEqual(fetchingState);
//   });
//
//   it('should return initializedState', () => {
//     expect(reducer(undefined, {
//       type: types.FETCH_COMPETITIONS_SUCCESS,
//       payload: {
//         entities,
//         ids,
//         lastUpdated: 1000,
//       },
//     })).toEqual(initializedState);
//   });
//
//   it('should return failureState', () => {
//     expect(reducer(undefined, {
//       type: types.FETCH_COMPETITIONS_FAILURE,
//       payload: {
//         lastUpdated: 1000,
//       },
//     })).toEqual(failureState);
//   });
// });
