export const getCompetitionInfo = (competitionId = 0, competitionsItems = []) => (
  competitionsItems.find(competition => (
    parseInt(competition.id, 10) === parseInt(competitionId, 10)
  )) || {}
);

export default getCompetitionInfo;
