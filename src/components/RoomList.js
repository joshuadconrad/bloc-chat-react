import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props){
    super(props);
      this.state = {
        rooms: [],
        modalIsOpen: false,
        name: '',
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
     this.setState({name: null});
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
        <form id="newRoomForm">
          <h3 className="new-room-title">Create a new room name</h3>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <input className="textbox" type="text" id="newRoomName" name="newRoomName" placeholder="Enter a room name..." onChange={ this.handleChange.bind(this) } value={this.state.name}></input>
              </div>
              <div className="col-6">
                <input className="cancel" type="button" id="cancel" name="cancel" value="Cancel" onClick={ () => this.handleModalClick() }></input>
              </div>
              <div className="col-6">
                <input className="submit" type="button" id="submit" name="submit" value="Create Room" onClick={ () => this.createRoom(this.state.name)}></input>
              </div>
            </div>
          </div>
        </form>
      );
    } else {
        return null;
      }
    }

  handleChange(e){
    this.setState({name: e.target.value});
  }

  createRoom(newRoomName) {
    this.roomsRef.push({
      name: newRoomName
    });
    this.setState({name: newRoomName});
    this.setState({ modalIsOpen: false });
  }


  render() {
    return (
      <section className="RoomList">
        <h1 className="navbar-header">Bloc Chat</h1>
        <button className="new-room" onClick={ () => this.handleModalClick() }>{ this.handleButtonChange() }</button>
        <div className="new-room-modal">{this.showModal()}</div>
        <table className="rooms-container">
          <tbody>
            {
              this.state.rooms.map((room, index) =>
              <tr className="rooms" key={index}>
                <td className="room" onClick={ () => this.props.setRoom(room)}>{room.name}</td>
              </tr>
              )
            }
          </tbody>
        </table>
      </section>
    );
  }
}

export default RoomList;
