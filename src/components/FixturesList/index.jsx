import React from 'react';
import PropTypes from 'prop-types';

const getFixtureTeamGoalsValue = (goalsCount) => {
  if (!goalsCount && goalsCount !== 0) {
    return '-';
  }

  return goalsCount;
};

const FixturesList = ({
  fixturesItems,
}) => (
  <ul className="FixturesList">
    {fixturesItems.map(item => (
      <li className="FixturesList__item Fixture">
        <div>
          <span className="Fixture__date">
            {item.date}
          </span>

          <span className="Fixture__status">
            {item.status}
          </span>
        </div>

        <div>
          {item.homeTeamName}
          {getFixtureTeamGoalsValue(item.result.goalsHomeTeam)}
          :
          {getFixtureTeamGoalsValue(item.result.goalsAwayTeam)}
          {item.awayTeamName}
        </div>
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
  fixturesItems: [],
};

export default FixturesList;
