import React, { PropTypes, Component } from 'react';

export default class conclusions extends Component {

  render() {
    return (
      <div className='conclusions'>
        <div className='cont disable'>{this.props.disable}</div>
        <div className='cont enable'>{this.props.enable}</div>
      </div>
    );
  }
}

conclusions.propTypes = {
  disable: PropTypes.number.isRequired,
  enable: PropTypes.number.isRequired,
};
