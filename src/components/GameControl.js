import React, { PropTypes, Component } from 'react';

export default class GameControl extends Component {
  constructor(props) {
    super(props);
    this.status = 0;
    if (this.props.createField) {
      this.props.createField();
    }
  }

  createNewGame() {
    this.props.createField();
    if (this.status) {
      this.status = 0;
      this.props.setStateGame(0);
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

  changeStructureField() {
    if (!this.status) return;
    this.props.changeStructureField();
    setTimeout(() => (this).changeStructureField(), 700);
  }

  render() {
    return (
      <div className='outside'>
        <div className='cont'>
          <button className='button button1' onClick={::this.createNewGame}>Новая игра</button>
          <button className='button button2' onClick={::this.setStateGame}>{this.props.stateGameText}</button>
        </div>
      </div>
    );
  }
}

GameControl.propTypes = {
  createField: PropTypes.func.isRequired,
  changeStructureField: PropTypes.func.isRequired,
  setStateGame: PropTypes.func.isRequired,
  stateGameText: PropTypes.string.isRequired,
};
