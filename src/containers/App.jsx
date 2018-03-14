import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compMove, gameOverRemove } from '../actions/index';

import '../scss/main.scss';
import Header from './Header';
import Field from './Field';

class App extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        document.body.addEventListener('click', this.modal);
    }
    componentDidUpdate() {
    }
    modal = (e) => {
        if (e.target.id === 'game-over' || e.target.id === 'game-over__box') {
            this.props.gameOverRemove()
            document.body.removeEventListener('click', this.modal);
        }
    }
    render() {
        return(
            <div>
                <Header/>
                <Field/>
                {this.props.gameData.round > 0 ? '' : <button onClick={this.props.compMove}>Start Game</button>}
                {this.props.gameData.status === 'gameOver' ? <div id="game-over"><div id="game-over__box">GAME OVER</div></div> : null}
            </div>
        );
    }
}

const mapStateToProps = state => {return { gameData: state.data }};
const mapDispatchToProps = dispatch => bindActionCreators({ compMove, gameOverRemove }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
