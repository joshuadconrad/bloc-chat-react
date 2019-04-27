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
      this.messageRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
     this.messageRef.on('child_added', snapshot => {
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
               <input className="send" type="button" id="send" name="submit" value="Send" onClick={ () => this.createMessage(this.state.content)}></input>
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

   createMessage(newMessage) {
     this.messageRef.push({
      content: this.state.content,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomID: this.props.setRoom.key,
      username: this.props.user ? this.props.user.displayName : "Guest",
    });
     this.setState({content: ''});
   }

   unixTime(time) {
     var date = new Date(time*1000);
     var hours = date.getHours();
     var minutes = "0" + date.getMinutes();
     var seconds = "0" + date.getSeconds();
     var ampm = " pm";
      if(hours > 12){
        hours = hours - 12;
        ampm = " am";
      }
    return hours+ ':' + minutes.substr(-2) + ampm;
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
                <td className="timestamp"><em>{this.unixTime(message.sentAt)}</em></td>
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
