import React, { PropTypes, Component } from 'react'

export default class Outside extends Component {
    constructor(props){
       super(props)
       if(this.props.addField !== undefined) this.props.addField();
       this.status = 0;
    }
    newGame(){
        this.props.addField();
        if(this.status){
            this.status = 0;
            this.props.stateGame(0); 
        }   
    }
    StateGame() {
        if(!this.status){
            this.status = 1;
            this.props.stateGame(1);
            this.Game(); 
        }
        else{
            this.status = 0;
            this.props.stateGame(0);
        } 
    }
    Game(){
        if(!this.status) return;
        var point = this;
        this.props.gameProcess();
        setTimeout(function(){point.Game()}, 700);
    }
    
    render() {
        return <div className="outside">
                <div className="cont">
                    <button className="button button1" onClick={::this.newGame}>Новая игра</button>
                    <button className="button button2" onClick={::this.StateGame}>{this.props.text}</button>
                </div>
        </div>        
    }
}

Outside.propTypes = {
    addField: PropTypes.func.isRequired,
    gameProcess: PropTypes.func.isRequired,
    stateGame: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
}