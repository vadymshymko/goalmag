import { getURLLastPath } from 'utils';

export const getFixturesItemsdGroupedByCompetition = ({
  fixtures: {
    items: fixturesItems,
  },
}) => (
  fixturesItems.reduce((result, item) => {
    const fixtureCompetitionId = parseInt(getURLLastPath(item.links.competition.href), 10);

    if (!result[fixtureCompetitionId]) {
      return {
        ...result,
        [fixtureCompetitionId]: [
          item,
        ],
      };
    }

    return {
      ...result,
      [fixtureCompetitionId]: [
        item,
        ...result[fixtureCompetitionId],
      ],
    };
  }, {})
);

export default getFixturesItemsdGroupedByCompetition;
