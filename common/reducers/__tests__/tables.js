// import { tables as types } from 'types';
// import reducer from '../tables';
//
// const initialState = {
//   entities: {},
//   ids: [],
// };
//
// const initializedEntity = {
//   isFetching: false,
//   isInitialized: true,
// };
//
// const fetchingEntity = {
//   id: 1,
//   isFetching: true,
//   isRequestFailed: false,
//   isInitialized: false,
// };
//
// const failedEntity = {
//   isFetching: false,
//   isRequestFailed: true,
//   isInitialized: true,
// };
//
// describe('fixtures reducer', () => {
//   it('should return initial state', () => {
//     expect(reducer(undefined, {})).toEqual(initialState);
//   });
//
//   it('should return fetchingState', () => {
//     expect(reducer(undefined, {
//       type: types.FETCH_TABLE_REQUEST,
//       payload: {
//         id: 1,
//       },
//     })).toEqual({
//       entities: {
//         1: fetchingEntity,
//       },
//       ids: [1],
//     });
//   });
//
//   it('should return initializedState', () => {
//     expect(reducer(undefined, {
//       type: types.FETCH_TABLE_SUCCESS,
//       payload: {
//         id: 1,
//         table: {},
//       },
//     })).toEqual({
//       entities: {
//         1: initializedEntity,
//       },
//       ids: [],
//     });
//   });
//
//   it('should return failureState', () => {
//     expect(reducer(undefined, {
//       type: types.FETCH_TABLE_FAILURE,
//       payload: {
//         id: 1,
//       },
//     })).toEqual({
//       entities: {
//         1: failedEntity,
//       },
//       ids: [],
//     });
//   });
// });
