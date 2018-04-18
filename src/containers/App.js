import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Notes from "../components/Notes/Notes"
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      	<MuiThemeProvider>
        	<Notes />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
