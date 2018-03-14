import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeDifficulty } from '../actions/index';

class App extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
    }
    changeLvl = (e) => {
        this.props.changeDifficulty(e.target.value)
    }
    render() {
        return(
            <div>
                <h1>Simon the Game</h1>
                <h3>Round: {this.props.gameData.round}</h3>
                <p>Level: 
                    <select name="game_level" id="gamelevel" defaultValue={this.props.gameData.lvl} onChange={this.changeLvl}>
                        <option value="0">Easy</option>
                        <option value="1">Medium</option>
                        <option value="2">Hard</option>
                    </select>
                </p>
            </div>
        );
    }
}

const mapStateToProps = state => {return { gameData: state.data }};
const mapDispatchToProps = dispatch => bindActionCreators({ changeDifficulty }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
