import React from 'react';

import './FixturesListLoader.scss';

const FixturesListLoader = () => (
  <ul
    className="FixturesListLoader FixturesList"
    style={{
      backgroundColor: 'rgba(248, 249, 250, 0.3)',
    }}
  >
    {Array.from({
      length: 5,
    }).map(() => (
      <li className="FixturesList__item">
        <article className="Fixture">
          <span
            className="Fixture__date"
            style={{
              height: '14px',
              backgroundColor: 'rgba(33, 37, 41, 0.01)',
            }}
          />

          <div className="Fixture__mainInfo">
            <span className="FixtureTeam FixtureTeam--type--home">
              <span
                className="TeamLink FixtureTeam__link"
                style={{
                  height: '24px',
                  backgroundColor: 'rgba(33, 37, 41, 0.01)',
                  width: '100%',
                }}
              />

              <span
                className="FixtureTeam__score"
                style={{
                  height: '24px',
                  backgroundColor: 'rgba(33, 37, 41, 0.01)',
                }}
              />
            </span>

            <span className="FixtureTeam FixtureTeam--type--away">
              <span
                className="FixtureTeam__score"
                style={{
                  height: '24px',
                  backgroundColor: 'rgba(33, 37, 41, 0.01)',
                }}
              />

              <span
                className="TeamLink FixtureTeam__link"
                style={{
                  height: '24px',
                  backgroundColor: 'rgba(33, 37, 41, 0.01)',
                  width: '100%',
                }}
              />
            </span>
          </div>

          <span
            className="Fixture__status"
            style={{
              height: '14px',
              backgroundColor: 'rgba(33, 37, 41, 0.01)',
            }}
          />
        </article>
      </li>
    ))}
  </ul>
);

export default FixturesListLoader;
