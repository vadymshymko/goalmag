import { schema } from 'normalizr';

const getEmblemUrl = (competitionName) => {
  if (competitionName === 'Ligue 1') {
    return 'https://upload.wikimedia.org/wikipedia/en/d/dd/Ligue_1_Logo.svg';
  }

  if (competitionName === 'Primeira Liga') {
    return 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Liga_NOS_logo.png';
  }

  if (competitionName === 'Bundesliga') {
    return 'https://upload.wikimedia.org/wikipedia/en/d/df/Bundesliga_logo_%282017%29.svg';
  }

  if (competitionName === 'Eredivisie') {
    return 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Eredivisie_nieuw_logo_2017-.svg';
  }

  if (competitionName === 'Serie A') {
    return 'https://upload.wikimedia.org/wikipedia/en/0/02/Serie_A_logo_%282018%29.png';
  }

  if (competitionName === 'Primera Division') {
    return 'https://upload.wikimedia.org/wikipedia/commons/9/92/LaLiga_Santander.svg';
  }

  if (competitionName === 'Premier League') {
    return 'https://upload.wikimedia.org/wikipedia/ru/f/f2/Premier_League_Logo.svg';
  }

  return '';
};

export const competition = new schema.Entity(
  'competitions',
  {},
  {
    processStrategy: competitionInfo => ({
      ...competitionInfo,
      emblemUrl: competitionInfo.emblemUrl || getEmblemUrl(competitionInfo.name),
    }),
  },
);

export const competitions = [competition];

export default competitions;
