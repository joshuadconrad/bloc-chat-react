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
       console.log(snapshot);
     });
   }

  render() {
    return (
      <section className="RoomList">
      </section>
    );
  }
}

export default RoomList;
