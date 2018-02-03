import React from 'react';
import PropTypes from 'prop-types';

import { getFormattedDatetimeByDatetime } from 'utils';

import './FixturesList.scss';

const getFixtureTeamGoalsCount = (goalsValue) => {
  if (!goalsValue && goalsValue !== 0) {
    return '-';
  }

  return goalsValue;
};

const getFixtureScoreColorByStatus = (status = '') => {
  if (!status || status.toLowerCase() === 'timed') {
    return null;
  } else if (
    status.toLowerCase() === 'finished'
    || status.toLowerCase() === 'in_play'
  ) {
    return 'white';
  }

  return null;
};

const getFixtureScoreBgColorByStatus = (status = '') => {
  if (!status || status.toLowerCase() === 'timed') {
    return null;
  } else if (status.toLowerCase() === 'finished') {
    return 'red';
  } else if (status.toLowerCase() === 'in_play') {
    return 'green';
  }

  return null;
};

const FixturesList = ({
  fixturesItems,
}) => (
  <ul className="FixturesList">
    {fixturesItems.map(item => (
      <li
        className="FixturesList__item"
        key={item.links.self.href}
      >
        <article className="Fixture">
          <span className="Fixture__date">
            {getFormattedDatetimeByDatetime(item.date)}
          </span>

          <span className="Fixture__main-info">
            <span className="Fixture__team-name">{item.homeTeamName}</span>

            <strong
              className="Fixture__score FixtureScore"
              style={{
                color: getFixtureScoreColorByStatus(item.status),
              }}
            >
              <span
                className="FixtureScore__goals-count"
                style={{
                  backgroundColor: getFixtureScoreBgColorByStatus(item.status),
                }}
              >
                {getFixtureTeamGoalsCount(item.result.goalsHomeTeam)}
              </span>

              <span className="FixtureScore__separator">:</span>

              <span
                className="FixtureScore__goals-count"
                style={{
                  backgroundColor: getFixtureScoreBgColorByStatus(item.status),
                }}
              >
                {getFixtureTeamGoalsCount(item.result.goalsAwayTeam)}
              </span>
            </strong>

            <span className="Fixture__team-name">{item.awayTeamName}</span>
          </span>
        </article>
      </li>
    ))}
  </ul>
);

FixturesList.propTypes = {
  fixturesItems: PropTypes.arrayOf(PropTypes.shape({
    awayTeamName: PropTypes.string,
    homeTeamName: PropTypes.string,
    date: PropTypes.string,
    status: PropTypes.string,
    result: PropTypes.shape({
      goalsAwayTeam: PropTypes.number,
      goalsHomeTeam: PropTypes.number,
    }),
  })),
};

FixturesList.defaultProps = {
  fixturesItems: {},
};

export default FixturesList;
