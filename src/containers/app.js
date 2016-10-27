import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GameControl from '../components/GameControl';
import GameField from '../components/GameField';
import StateField from '../components/StateField';
import * as gameFieldActions from '../actions/gameFieldActions';
import * as gameControlActions from '../actions/gameControlActions';

class App extends Component {
  render() {
    const { gameFieldState } = this.props;
    const { gameControlState } = this.props;
    const { enableCell } = this.props.gameFieldActions;
    const { changeStructureField, setStateGame, createField } = this.props.gameControlActions;

    return (
      <div className='main'>
        <GameControl stateGameText={gameControlState.stateGameText} setStateGame={setStateGame} createField={createField} changeStructureField={changeStructureField} />
        <GameField field={gameFieldState.field} enableCell={enableCell} />
        <StateField disable={gameFieldState.info.disable} enable={gameFieldState.info.enable} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    gameFieldState: state.gameFieldState,
    gameControlState: state.gameControlState,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    gameFieldActions: bindActionCreators(gameFieldActions, dispatch),
    gameControlActions: bindActionCreators(gameControlActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
