import { schema } from 'normalizr';

export const matchSchema = new schema.Entity(
  'matches',
  {},
  {
    processStrategy: match => {
      const [day, month, year] = match.formattedDate.split('.');
      const [hours, minutes] = match.time.split(':');

      const matchDateUTC = new Date(
        Date.UTC(
          parseInt(year, 10),
          parseInt(month, 10) - 1,
          parseInt(day, 10),
          parseInt(hours, 10),
          parseInt(minutes, 10)
        )
      );

      const matchDateHours = matchDateUTC.getHours();
      const matchDateMinutes = matchDateUTC.getMinutes();

      const matchStartTime = minutes
        ? `${matchDateHours < 10 ? '0' : ''}${matchDateHours}:${
            matchDateMinutes < 10 ? '0' : ''
          }${matchDateMinutes}`
        : match.time;

      return {
        id: match.id,
        competitionId: match.compId,
        localTeamId: match.localteamId,
        localTeamName: match.localteamName,
        localTeamScore:
          !match.localteamScore || match.localteamScore === '?'
            ? '-'
            : match.localteamScore,
        localTeamPenaltyScore: match.penaltyLocal,
        visitorTeamId: match.visitorteamId,
        visitorTeamName: match.visitorteamName,
        visitorTeamScore:
          !match.visitorteamScore || match.visitorteamScore === '?'
            ? '-'
            : match.visitorteamScore,
        visitorTeamPenaltyScore: match.penaltyVisitor,
        season: match.season,
        week: match.week,
        city: match.venueCity,
        stadium: match.venue,
        events: match.events === '[]' ? [] : match.events,
        dateUTC: match.formattedDate,
        startTime: matchStartTime,
        timer: match.timer ? `${match.timer}'` : '',
        status:
          match.status === match.time || match.status === match.timer
            ? ''
            : match.status,
      };
    },
  }
);

export const matchesSchema = [matchSchema];
