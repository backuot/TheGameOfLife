import React, { PropTypes, Component } from 'react';

export default class within extends Component {
  enableCell(i, j) {
    var obj = {
      i,
      j,
    };
    this.props.enableCell(obj);
  }

  render() {
    if (!this.props.field) {
      return (<div className='within'></div>);
    }

    var field = this.props.field;
    var _this = this;

    return (
      <div className='within'>
          {field.map(function (row, i) {
            return (
              <div className='row' key={i}>
                {
                  row.map(function (item, j) {
                    var enableCell = _this.enableCell.bind(_this, i, j);
                    if (!item) return (<div className='cells disable' onClick={enableCell} key={j}></div>);
                    return (<div className='cells enable' onClick={enableCell} key={j}></div>);
                  })
                }
              </div>
            );
          })
         }
    </div>);
  }
}

within.propTypes = {
  field: PropTypes.array.isRequired,
  enableCell: PropTypes.func.isRequired,
};
