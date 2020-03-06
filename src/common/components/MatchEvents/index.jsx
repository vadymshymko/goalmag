import React from 'react';
import PropTypes from 'prop-types';

import {
  Wrapper,
  Event,
  EventMinute,
  EventIcon,
  EventDescription,
} from './styles';

const EVENT_TYPE_ICONS = {
  goal: {
    name: 'ball',
  },
  subst: {
    name: 'substitution',
  },
  redcard: {
    name: 'redCard',
    style: {
      width: '10px',
    },
  },
  yellowcard: {
    name: 'yellowCard',
    style: {
      width: '10px',
    },
  },
  'pen miss': {
    name: 'missedPenalty',
  },
};

function MatchEvents({ events }) {
  return (
    <Wrapper>
      {[...events].reverse().map(event => {
        return (
          <Event key={event.id} data-team-type={event.team}>
            <EventMinute>{`${event.minute}'`}</EventMinute>

            <EventIcon
              name={EVENT_TYPE_ICONS[event.type].name}
              style={EVENT_TYPE_ICONS[event.type].style || {}}
            />

            {event.type === 'subst' ? (
              <EventDescription
                title={`${event.player} in. ${event.assist} out`}
              >
                {`${event.player} in. ${event.assist} out`}
              </EventDescription>
            ) : (
              <EventDescription
                title={`${event.player} ${
                  event.type === 'goal' && event.assist
                    ? `(asist - ${event.assist})`
                    : ''
                }`}
              >
                {`${event.player} ${
                  event.type === 'goal' && event.assist
                    ? `(asist - ${event.assist})`
                    : ''
                }`}
              </EventDescription>
            )}
          </Event>
        );
      })}
    </Wrapper>
  );
}

MatchEvents.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MatchEvents;
