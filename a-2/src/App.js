import React, { Component } from 'react';
import './App.css';
import Task1 from './Task1';
import Validation from './Validation';
import Char from './Char/Char';


class App extends Component {
  state = {
    userInput: ''
  }

  // count the number of characters entered
  countHandler = (event) => {
    this.setState({
      userInput: event.target.value
    })
  }

  // delete specific characters from input field
  deleteCharHandler = (index) => {

    const chars = this.state.userInput.split('');

    // delete character
    chars.splice(index, 1);

    // join array into string and setState
    this.setState({
      userInput: chars.join('')
    })
  }

  render () {
    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        <Task1
          userInput={this.state.userInput}
          changed={this.countHandler}
        />
        <Validation 
          length={this.state.userInput.length}
        />
        <Char
          userInput={this.state.userInput}
          onClick={this.deleteCharHandler.bind(this)}
        />
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
