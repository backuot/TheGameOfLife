import React from 'react';
import styles from './scss/stateField.scss';
import classNames from 'classnames';

const StateField = (props) => {
  let disable = classNames({
    [styles['state-field__container']]: true,
    [styles['state-field__enable']]: true,
  });
  let enable = classNames({
    [styles['state-field__container']]: true,
    [styles['state-field__disable']]: true,
  });
  return (
    <div className={styles['state-field']}>
      <div className={disable}>{props.disable}</div>
      <div className={enable}>{props.enable}</div>
    </div>
  );
};

StateField.propTypes = {
  disable: React.PropTypes.number.isRequired,
  enable: React.PropTypes.number.isRequired,
};

export default StateField;
