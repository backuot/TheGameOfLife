import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GameControl from '../components/GameControl/GameControl';
import GameField from '../components/GameField/GameField';
import StateField from '../components/StateField/StateField';
import * as gameFieldActions from '../actions/gameFieldActions';
import * as gameControlActions from '../actions/gameControlActions';
import styles from '../styles/app.css';

const App = (props) => {
  const { gameFieldState } = props;
  const { gameControlState } = props;
  const { enableCell } = props.gameFieldActions;
  const { changeStructureField } = props.gameControlActions;
  const { setStateGame } = props.gameControlActions;
  const { createField } = props.gameControlActions;

  return (
    <div className={styles.app}>
      <GameControl
        stateGameText={gameControlState.stateGameText}
        setStateGame={setStateGame}
        createField={createField}
        changeStructureField={changeStructureField}
      />
      <GameField field={gameFieldState.field} enableCell={enableCell} />
      <StateField disable={gameFieldState.info.disable} enable={gameFieldState.info.enable} />
    </div>
  );
};

App.propTypes = {
  gameFieldState: PropTypes.object.isRequired,
  gameControlState: PropTypes.object.isRequired,
  gameFieldActions: PropTypes.object.isRequired,
  gameControlActions: PropTypes.object.isRequired,
};

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
