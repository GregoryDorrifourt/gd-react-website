import React, { Component } from 'react';
import InteractiveBackgroundComponent from './components/interactive-background/interactive-background.component';
import Home from './components/home/home.component';

class App extends Component {
  render() {
    return (
      <div className="App">
        <InteractiveBackgroundComponent></InteractiveBackgroundComponent>
        <Home></Home>
      </div>
    );
  } 
}

export default App;
