import React, { Component } from 'react';
import RoomList from './components/RoomList';
import './App.css';
import './components/bootstrap-grid.css';
import * as firebase from 'firebase';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyD3tZg7PtNdNkK6a2XMnq5c-qnxgjop9a4",
    authDomain: "bloc-chat-284b3.firebaseapp.com",
    databaseURL: "https://bloc-chat-284b3.firebaseio.com",
    projectId: "bloc-chat-284b3",
    storageBucket: "bloc-chat-284b3.appspot.com",
    messagingSenderId: "988751464454"
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props){
    super(props);

  }

  render() {
    return (
      <div className="App">
       <RoomList firebase={firebase}/>
      </div>
    );
  }
}

export default App;
