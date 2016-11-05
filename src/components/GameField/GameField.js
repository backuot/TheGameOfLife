import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import styles from './styles/gameField.css';

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
    if (!this.props.field) return (<div className={styles['game-field']}></div>);

    const field = this.props.field;

    return (
      <div className={styles['game-field']}>
          {field.map((items, row) =>
            <div className={styles['game-field__row']} key={row}>
              {
                items.map((item, column) => {
                  let enableCell = () => this.enableCell(row, column);
                  let cellStatus = classNames({
                    [`styles['game-field__cells']` `styles['game-field__cells_disable']`]: !item,
                    [`styles['game-field__cells']` `styles['game-field__cells_enable']`]: item,
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
