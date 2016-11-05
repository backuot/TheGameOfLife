import React, { PropTypes, Component } from 'react';
import styles from './styles/gameControl.css';

export default class GameControl extends Component {
  static propTypes = {
    createField: PropTypes.func.isRequired,
    changeStructureField: PropTypes.func.isRequired,
    setStateGame: PropTypes.func.isRequired,
    stateGameText: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.status = 0;
    if (this.props.createField) {
      this.props.createField();
    }
  }

  setStateGame() {
    if (!this.status) {
      this.status = 1;
      this.props.setStateGame(1);
      this.changeStructureField();
    } else {
      this.status = 0;
      this.props.setStateGame(0);
    }
  }

  createNewGame() {
    this.props.createField();
    if (this.status) {
      this.status = 0;
      this.props.setStateGame(0);
    }
  }

  changeStructureField() {
    if (!this.status) return;
    this.props.changeStructureField();
    setTimeout(() => this.changeStructureField(), 700);
  }

  render() {
    return (
      <div className={styles['game-control']}>
        <div className={styles['game-control__container']}>
          <button
            className={
              `styles['game-control__button']`
              `styles['game-control__button_new-game']`
            }
            onClick={::this.createNewGame}
          >Новая игра</button>
          <button
            className={
              `styles['game-control__button']`
              `styles['game-control__button_state-game']`
            }
          >{this.props.stateGameText}</button>
        </div>
      </div>
    );
  }
}
