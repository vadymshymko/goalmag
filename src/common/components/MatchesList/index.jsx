import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { fetchMatches } from 'actions';
import { getMatchesItems } from 'selectors';

function MatchesList() {
  const dispatch = useDispatch();

  const location = useLocation();
  const matchesItems = useSelector(state =>
    getMatchesItems(state, { location })
  );

  useEffect(() => {
    dispatch(
      fetchMatches({
        location,
      })
    );
  }, []);

  return (
    <div>
      {matchesItems.map(match => (
        <div key={match.id}>
          <p>
            {match.localteamName}
            {` - `}
            {match.visitorteamName}
          </p>
        </div>
      ))}
    </div>
  );
}

export default MatchesList;
