import React from 'react';

const StateField = (props) =>
  <div className='conclusions'>
    <div className='cont disable'>{props.disable}</div>
    <div className='cont enable'>{props.enable}</div>
  </div>;

StateField.propTypes = {
  disable: React.PropTypes.number.isRequired,
  enable: React.PropTypes.number.isRequired,
}

export default StateField;
