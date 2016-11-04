import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';

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
                  let cellStatus = classNames({
                    'cells disable': !item,
                    'cells enable': item,
                  });
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
