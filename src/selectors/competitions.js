export const getCompetitionInfo = (competitionsItems = [], competitionId = 0) => (
  competitionsItems.find(competition => (
    parseInt(competition.id, 10) === parseInt(competitionId, 10)
  )) || {}
);

export default getCompetitionInfo;
