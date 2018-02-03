export const getFixturesItemsdGroupedByCompetition = ({
  fixtures: {
    items: fixturesItems,
  },
}) => (
  fixturesItems.reduce((result, item) => {
    if (!result[item.links.competition.href]) {
      return {
        ...result,
        [item.links.competition.href]: [
          item,
        ],
      };
    }

    return {
      ...result,
      [item.links.competition.href]: [
        item,
        ...result[item.links.competition.href],
      ],
    };
  }, {})
);

export default getFixturesItemsdGroupedByCompetition;
