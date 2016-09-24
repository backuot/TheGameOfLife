import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Outside from '../components/outside';
import Within from '../components/within';
import Conclusions from '../components/conclusions';
import * as withinActions from '../actions/withinActions';
import * as processActions from '../actions/processActions';

class App extends Component {
  render() {
    const { within } = this.props;
    const { outside } = this.props;
    const { enableCell } = this.props.withinActions;
    const { gameProcess, stateGame, addField } = this.props.processActions;

    return (
      <div className='main'>
        <Outside text={outside.text} stateGame={stateGame} addField={addField} gameProcess={gameProcess} />
        <Within field={within.field} enableCell={enableCell} />
        <Conclusions disable={within.info.disable} enable={within.info.enable} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    within: state.within,
    outside: state.outside,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    withinActions: bindActionCreators(withinActions, dispatch),
    processActions: bindActionCreators(processActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
