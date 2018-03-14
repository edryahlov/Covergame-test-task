import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compMove, playerMove, playerStep, gameOver } from '../actions/index';

import * as conf from 'conf';

class App extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
    }
    componentDidUpdate() {
        if (this.props.gameData.compTurn) this.showCompsMoves()

    }
    showCompsMoves = () => {
        const list = this.props.gameData.sequence
        let audio
        const {sequence, lvl} = this.props.gameData 

        for (let x = 0; x < list.length; x++) {
            setTimeout(y => {
                if (sequence[x] !== 0) {
                    let elems = document.querySelector(".active");
                    if (elems !== null) elems.classList.remove('active')

                    document.getElementById('box' + sequence[x]).classList.add('active')
                    audio = new Audio('./sounds/'+(sequence[x])+'.mp3');
                    audio.play();

                    // console.log('>>>>',sequence[x])
                } else {
                    let elems = document.querySelectorAll(".field-box");
                    for (let i=0; i<elems.length; i++) {
                        elems[i].classList.add('players-turn')
                    }

                    elems = document.querySelector(".active");
                    if (elems !== null) elems.classList.remove('active')

                    this.props.playerMove()

                    // console.log('>>>>>>>>>fin')
                }
            }, x * conf.LVL[lvl], x);
        }

    }
    handleBoxClick = (e) => {
        if (this.props.gameData.playersTurn) {
            let clicked = +e.target.getAttribute("data-box")
            const {round, playersStep, sequence} = this.props.gameData

            if (clicked === sequence[playersStep]) { // right click
                let audio = new Audio('./sounds/'+(sequence[playersStep])+'.mp3');
                audio.play();

                if (playersStep === round-1) { // end of the player move

                    let elems = document.querySelectorAll(".field-box");
                    for (let i=0; i<elems.length; i++) {
                        elems[i].classList.remove('players-turn')
                    }
                    setTimeout(() => this.props.compMove(), 2000);

                } else { // player's next step
                    this.props.playerStep()
                }
            }
            else { // wrong click - game over
                this.props.gameOver()
            }
        }
    }
    render() {
        return(
            <div>
                <div id="box1" className="field-box" data-box="1" onClick={this.handleBoxClick}></div>
                <div id="box2" className="field-box" data-box="2" onClick={this.handleBoxClick}></div><br/>
                <div id="box3" className="field-box" data-box="3" onClick={this.handleBoxClick}></div>
                <div id="box4" className="field-box" data-box="4" onClick={this.handleBoxClick}></div>
            </div>
        );
    }
}

const mapStateToProps = state => {return { gameData: state.data }};
const mapDispatchToProps = dispatch => bindActionCreators({ compMove, playerMove, playerStep, gameOver }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
