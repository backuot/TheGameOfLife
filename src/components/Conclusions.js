import React, { Component } from 'react'

export default class Conclusions extends Component {
    
       render() {
        
        return <div className="conclusions">
                <div className="cont disable">{this.props.disable}</div>
                <div className="cont enable">{this.props.enable}</div>
        </div>        
    }
}
