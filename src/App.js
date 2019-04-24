import React, { Component } from 'react';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';


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

  var provider = new firebase.auth.GoogleAuthProvider();


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
        activeRoom: '',
        user: null,
    }
  }

  setRoom(room) {
   this.setState({ activeRoom: room });
 }

  setUser(user){
    this.setState({ user: user });
  }

  render() {
    return (
      <div className="App">
        <section className="superNav">
          <User
            firebase={firebase}
            setUser={ (user) => this.setUser(user)}
            user={this.state.user}
          />
        </section>
        <section className="rooms">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3 navbar">
                <RoomList
                  firebase={firebase}
                  setRoom={this.setRoom.bind(this)}
                 />
              </div>
              <div className="col-md-9">
                <MessageList
                  firebase={firebase}
                  setRoom={this.state.activeRoom}
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
