import React, { PropTypes, Component } from 'react';

export default class within extends Component {
  constructor(props) {
    super(props);
  }
  
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
                    var enableCell = _this.enableCell.bind(_this, i, j),
                        cellStatus = '';
                    if (!item) {
                      cellStatus = 'cells disable';
                    } else {
                      cellStatus = 'cells enable';
                    }
                    return (<div className={cellStatus} onClick={enableCell} key={j}></div>);
                  })
                }
              </div>
            );
          })
         }
      </div>
    );
  }
}

within.propTypes = {
  field: PropTypes.array.isRequired,
  enableCell: PropTypes.func.isRequired,
};
