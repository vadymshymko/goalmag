export const getTable = (state, id) => (
  state.tables.byId[id]
);

export default getTable;
