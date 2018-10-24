import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const Moves = ({color, symbol,clickAction})=> {
	const style = {
		backgroundColor: color,
		backgroundImage: "url(../img/" + symbol + ".png)"
	}
	return(
		<div style = {style} className="player-card" onClick={clickAction}>
		</div>
	)	
}


class App extends React.Component {
	constructor(props) {
		super(props);
		this.symbols = ["rock" , "paper", "scissors"];
		this.playerChoice = props.playerChoice || "rock";
		
		this.state = {};
		this.play = this.play.bind(this);
	}
	randomPick() {
    var options = ["Rock", "Paper", "Scissors"];
    return options[Math.floor(Math.random() * 3)];
  }

	decideWinner = ()=> {
		const {computerChoice, myChoice} = this.state
		if(myChoice == computerChoice) {
			return "IT'S A DRAW !"
		}
		if((myChoice==="rock" && computerChoice==="scissors") ||
			(myChoice==="paper" && computerChoice==="rock") ||
			(myChoice==="scissors" && computerChoice==="paper")) {
			return "YOU WIN !"
		}
		return "YOU LOOSE !"
	}

	play = (option) => {
		
		let counter = 0
		let myInterval = setInterval(() => {
			counter++;
			this.setState({
				myChoice: option,
				computerChoice: this.symbols[Math.floor(Math.random()*3)],
				winner: ""
			})
			if(counter > 20) {
				clearInterval(myInterval)
				this.setState({winner: this.decideWinner()})
			}
		},100)
	}

	render() {
		return (
			<div className="App">
			<h1> ROCK PAPER & SCISSORS GAME</h1>
			<div className="btn-group btn-group-justified pad" roleName="group">
		
				<div className="btn-group" roleName="group">
				<h2>Choose your move ...</h2>
					<Moves
						color="grey"
						symbol="rock" 
						clickAction =   {this.play.bind(this, 'rock')}/>
						<Moves
						color="grey"
						symbol="scissors" 
						clickAction =   {this.play.bind(this, 'scissors')}/>
						<Moves
						color="grey"
						symbol="paper" 
						clickAction =   {this.play.bind(this, 'paper')}/>       
				</div>
			</div>
			<div class="playerMove" ><h3>Your Move</h3>
				<Moves
					color="limegreen"
					symbol={this.state.myChoice}   />
					</div>
			<div class="computerMove"><h3 >Opponent Move</h3>
				<Moves
					color="orange"
					symbol={this.state.computerChoice}   />
					</div>
					<div class="result">
				<p>{this.state.winner}</p>
				</div>
			</div>
		);
	}
}
export default App;
