import React, { Component } from 'react'



export default class Outside extends Component {
    constructor(props){
       super(props)
       this.props.addField()
       this.status = 0;
    }
    newGame(){
        if(this.status) 
            this.status = 0;
        this.props.addField();
        this.props.stateGame(0);
    }
    StateGame() {
        if(!this.status){
            this.status = 1;
            this.props.stateGame(1);
            this.Game(this); 
        }
        else{
            this.status = 0;
            this.props.stateGame(0);
        } 
    }
    Game(point){
        if(!point.status) return;
        point.props.gameProcess();
        setTimeout(function(){point.Game(point)}, 700);
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
