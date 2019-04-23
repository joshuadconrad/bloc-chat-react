import React, { Component } from 'react';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

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

    this.state = {
        activeRoom: '',
        activeMessage: '',
    }
  }

  setRoom(room) {
   this.setState({ activeRoom: room });
 }

 setMessage(message){
   this.setState({ activeMessage: message });
 }

  render() {
    return (
      <div className="App">
        <section className="rooms">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3 navbar">
                <RoomList
                  firebase={firebase}
                  setRoom={this.setRoom.bind(this)}
                  setMessage={this.state.activeMessage}
                 />
              </div>
              <div className="col-md-9">
                <MessageList
                  firebase={firebase}
                  setRoom={this.state.activeRoom}
                  setMessage={this.setMessage.bind(this)}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
