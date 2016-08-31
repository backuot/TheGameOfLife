import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Outside from '../components/Outside'
import Within from '../components/Within'
import Conclusions from '../components/Conclusions'
import * as WithinActions from '../actions/WithinActions'
import * as ProcessActions from '../actions/ProcessActions'

class App extends Component {
  render() {
    const { within } = this.props
    const { outside } = this.props
    const { enableCell } = this.props.WithinActions
    const { gameProcess, stateGame, addField } = this.props.ProcessActions

    return <div className="main">
        <Outside text={outside.text} stateGame={stateGame} addField={addField} gameProcess={gameProcess} />
        <Within field={within.field} enableCell={enableCell} />
        <Conclusions disable={within.info.disable} enable={within.info.enable} />
    </div>
  }
}

function mapStateToProps(state) {
  return {
      within: state.within,
      outside: state.outside
  }
}

function mapDispatchToProps(dispatch) {
  return {  
    WithinActions: bindActionCreators(WithinActions, dispatch),
    ProcessActions: bindActionCreators(ProcessActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
