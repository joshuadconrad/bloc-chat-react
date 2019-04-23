import React, { Component } from 'react';

class MessageList extends Component {

  constructor(props){
    super(props);
      this.state = {
        rooms: [],
        message: '',
      }
      this.roomsRef = this.props.firebase.database().ref('rooms');
      this.roomsRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
     this.roomsRef.on('child_added', snapshot => {
       const room = snapshot.val();
       room.key = snapshot.key;
       this.setState({ rooms: this.state.rooms.concat( room ) })
     });
   }



    render() {
      return(
        <section className="MessageList">
        <h2>{this.props.setRoom.name}</h2>
          <table className="messages">
            <tbody>
              {
                this.state.rooms.map((message, index) =>
                <tr className="message" key={index}>
                  <td className="info"><span className="username">{message.username}</span><br/><span className="content">{message.content}</span></td>
                  <td className="timestamp">{message.sentAt}</td>
                </tr>
                )
              }
            </tbody>
          </table>
        </section>
      )
    }

}

export default MessageList;
