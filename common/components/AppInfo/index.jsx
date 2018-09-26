import React from 'react';

import './AppInfo.scss';

const AppInfo = () => (
  <div className="AppInfo">
    <p className="AppInfo__item">
      See app sources on <a className="AppInfo__link" href="//github.com/vadymshymko/goalmag" target="_blank" rel="noopener noreferrer" title="App sources on GitHub">GitHub</a>
    </p>

    <p className="AppInfo__item">
      Football data provided by the <a className="AppInfo__link" href="//www.football-data.org" target="_blank" rel="noopener noreferrer" title="Football-Data.org">Football-Data.org API</a>
    </p>
  </div>
);

export default AppInfo;
