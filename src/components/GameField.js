import React, { PropTypes, Component } from 'react';

export default class GameField extends Component {
  enableCell(row, column) {
    let obj = {
      row: row,
      column: column,
    };
    this.props.enableCell(obj);
  }

  render() {
    if (!this.props.field) {
      return (<div className='within'></div>);
    }

    var field = this.props.field;

    return (
      <div className='within'>
          {field.map(function (items, row) {
            return (
              <div className='row' key={row}>
                {
                  items.map(function (item, column) {
                    var enableCell = this.enableCell.bind(this, row, column),
                        cellStatus = '';
                    if (!item) {
                      cellStatus = 'cells disable';
                    } else {
                      cellStatus = 'cells enable';
                    }
                    return (<div className={cellStatus} onClick={enableCell} key={column}></div>);
                  }, this)
                }
              </div>
            );
          }, this)
         }
      </div>
    );
  }
}

GameField.propTypes = {
  field: PropTypes.array.isRequired,
  enableCell: PropTypes.func.isRequired,
};
