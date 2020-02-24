import React, { memo } from 'react';

function Logo() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30">
      <circle cx="15" cy="15" r="15" fill="#28a745" />
      <circle cx="15" cy="15" r="3" fill="#fff" />
      <circle cx="15" cy="15" r="8" fill="none" stroke="#fff" strokeWidth="2" />
      <line x1="15" y1="0" x2="15" y2="30" stroke="#fff" strokeWidth="2" />
    </svg>
  );
}

export default memo(Logo);
