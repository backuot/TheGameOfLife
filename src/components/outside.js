import React, { PropTypes, Component } from 'react';

export default class outside extends Component {
  constructor(props) {
    super(props);
    this.status = 0;
    if (this.props.addField) {
      this.props.addField();
    }
  }
  newGame() {
    this.props.addField();
    if (this.status) {
      this.status = 0;
      this.props.stateGame(0);
    }
  }
  stateGame() {
    if (!this.status) {
      this.status = 1;
      this.props.stateGame(1);
      this.game();
    } else {
      this.status = 0;
      this.props.stateGame(0);
    }
  }
  game() {
    var _this = this;
    if (!this.status) return;
    this.props.gameProcess();
    setTimeout(function () { _this.game(); }, 700);
  }

  render() {
    return (<div className='outside'>
      <div className='cont'>
        <button className='button button1' onClick={::this.newGame}>Новая игра</button>
        <button className='button button2' onClick={::this.stateGame}>{this.props.text}</button>
      </div>
    </div>);
  }
}

outside.propTypes = {
  addField: PropTypes.func.isRequired,
  gameProcess: PropTypes.func.isRequired,
  stateGame: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
