import React, { Component } from 'react';
import './RoomList.css';

class RoomList extends Component {
  constructor(props){
    super(props);
      this.state = {
        rooms: [],
        modalIsOpen: false,
        room: '',
      }
      this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
     this.roomsRef.on('child_added', snapshot => {
       const room = snapshot.val();
       room.key = snapshot.key;
       this.setState({ rooms: this.state.rooms.concat( room ) })
     });
   }

handleButtonChange(){
  if(!this.state.modalIsOpen){
    return (
      <span>New Room</span>
    );
  } else{
    return (
      <span>Cancel</span>
    );
  }
}

modalOpen(){
  this.setState({ modalIsOpen: true });
}

modalClose(){
  this.setState({ modalIsOpen: false });
}

handleModalClick(){
  if(!this.state.modalIsOpen){
    this.modalOpen();
  } else{
    this.modalClose();
  }
}

showModal(){
  if(this.state.modalIsOpen){
    return (
      <form id="newRoomForm" action="">
        <h3>Create a new room name</h3>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <input type="text" id="newRoomName" name="newRoomName" placeholder="Enter a room name..." onChange={ () => this.createRoom() }></input>
            </div>
            <div className="col-6">
              <input type="button" id="cancel" name="cancel" value="Cancel" onClick={ () => this.handleModalClick() }></input>
            </div>
            <div className="col-6">
              <input type="button" id="submit" name="submit" value="Create Room"></input>
            </div>
          </div>
        </div>
      </form>
    );
  }
  else{
    return null;
  }
}



  createRoom(newRoomName) {
    const handleChange = (e) =>{
   this.setState({room: e.target.value});
 }
    this.roomsRef.push({
      name: null
    });
    this.setState({name: newRoomName});
  }

  render() {
    return (
      <section className="RoomList">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3 navbar">
              <h1 className="navbar-header">Bloc Chat</h1>
              <button className="new-room" onClick={ () => this.handleModalClick() }>{ this.handleButtonChange() }</button>
              <div className="new-room-modal">{this.showModal()}</div>
              <table className="rooms-container">
                <tbody>
                  {
                    this.state.rooms.map((room, index) =>
                      <tr className="rooms" key={index}>
                        <td className="room">Room {index +1}</td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
            <div className="col-md-9">
            chatroom placeholder
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default RoomList;
