import React, { Component } from 'react';
import './RoomList.css';

class RoomList extends Component {
  constructor(props){
    super(props);
      this.state = {
        rooms: [],
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

  render() {
    return (
      <section className="RoomList">
          <div className="row">
            <div className="col-md-3 navbar">
              <h1 className="navbar-header">Bloc Chat</h1>
              <table>
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
        </div>
      </section>
    );
  }
}

export default RoomList;
