import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Input } from './styles';

function DateInput({ value, onChange }) {
  return (
    <Wrapper htmlFor="date-input">
      <Input
        type="date"
        value={value}
        onChange={onChange}
        id="date-input"
        name="date-input"
      />
    </Wrapper>
  );
}

DateInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default memo(DateInput);
