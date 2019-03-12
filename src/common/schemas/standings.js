import { schema } from 'normalizr';

export const standing = new schema.Entity(
  'standings',
  undefined,
  {
    idAttribute: ({ type, group }) => {
      if (group) {
        return `${group}-${type}`;
      }

      return type;
    },
  },
);
export const standings = [standing];

export default standings;
