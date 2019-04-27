import React, { Component } from 'react';

class MessageList extends Component {

  constructor(props){
    super(props);
      this.state = {
        messages: [],
        content: '',
        sentAt: '',
        roomID: '',
        username: '',
      }
      this.roomsRef = this.props.firebase.database().ref('rooms');
      this.roomsRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
     this.roomsRef.on('child_added', snapshot => {
       const message = snapshot.val();
       message.key = snapshot.key;
       this.setState({ messages: this.state.messages.concat( message ) })
     });
   }

   showMessageInput(){
     if(!this.props.setRoom.key == ''){
     return(
       <form id="newMessageForm">
               <input className="message-field" type="text" id="newMessage" name="newMessage" placeholder="Write your message here..." onChange={ this.handleChange.bind(this) } value={this.state.content}></input>
               <input className="send" type="button" id="send" name="submit" value="Send" onClick={ (e) => this.createMessage(e)}></input>
       </form>
     )}else{
        return(
          <h2 className="choose">Select a room to start chatting</h2>
        )
     }
   }

   handleChange(e){
     this.setState({content: e.target.value});
   }

   createMessage(newMessage, index) {
     newMessage.preventDefault();
     this.roomsRef.push({
      content: this.state.content,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomID: this.props.setRoom.key,
      username: this.props.user,
     });
     this.setState({content: newMessage});
   }

    render() {
      return(
        <section className="MessageList">
        <h2 className="active-room">{this.props.setRoom.name}</h2>
          <table className="messages">
          <tbody>
            {

              this.state.messages.filter((message) => this.props.setRoom.key === message.roomID)
              .map((message, index) =>
              <tr className="message" key={index}>
                <td className="info"><span className="username">{message.username}</span><br/><span className="content">{message.content}</span></td>
                <td className="timestamp">{message.sentAt}</td>
              </tr>
            )
            }
          </tbody>
          </table>
            {this.showMessageInput()}
        </section>
      )
    }

}

export default MessageList;
