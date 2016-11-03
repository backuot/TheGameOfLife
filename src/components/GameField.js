import React, { PropTypes, Component } from 'react';

export default class GameField extends Component {
  static propTypes = {
    field: PropTypes.array.isRequired,
    enableCell: PropTypes.func.isRequired,
  };

  enableCell(row, column) {
    const obj = {
      row,
      column,
    };
    this.props.enableCell(obj);
  }

  render() {
    if (!this.props.field) return (<div className='within'></div>);

    const field = this.props.field;

    return (
      <div className='within'>
          {field.map((items, row) =>
            <div className='row' key={row}>
              {
                items.map((item, column) => {
                  let enableCell = () => this.enableCell(row, column);
                  let cellStatus = '';
                  if (!item) {
                    cellStatus = 'cells disable';
                  } else {
                    cellStatus = 'cells enable';
                  }
                  return (<div className={cellStatus} onClick={enableCell} key={column}></div>);
                }, this)
              }
            </div>
          , this)
         }
      </div>
    );
  }
}
