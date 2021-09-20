import React from 'react';
import { HighlightText } from './components/HighlightText';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <HighlightText with="span" text={['bar']}>foo bar baz</HighlightText>
        </p>
      </header>
    </div>
  );
}

export default App;
