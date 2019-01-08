import React, { Component } from 'react';
import './App.scss';
import asyncComponent from './components/asyncComponent/async'

//dynamic import component
const Container = asyncComponent(() =>
     import('./components/Container').then(module => module.default)
);



class App extends Component {
  render() {
    return (
      <Container />
    );
  }
}

export default App;
