import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';

import styles from './DateInput.scss';

const DateInput = ({
  fieldId,
  className,
  label,
  value,
  onChange,
}) => (
  <label
    className={`${styles.DateInput} ${className}`}
    htmlFor={fieldId}
  >
    {label && (
      <span className={styles.DateInput__label}>{label}</span>
    )}

    <input
      className={styles.DateInput__field}
      type="date"
      value={value}
      onChange={onChange}
    />
  </label>
);

DateInput.propTypes = {
  fieldId: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  label: PropTypes.node,
};

DateInput.defaultProps = {
  className: '',
  label: null,
  fieldId: null,
};

export default withStyles(styles)(DateInput);
