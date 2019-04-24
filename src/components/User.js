import React, { Component } from 'react';

class User extends Component {
  constructor(props){
    super(props);
      this.state = {
      }
      this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
});
}

displayUsername(){
  if(this.props.user){
    return(
      <span>{this.props.user}</span>
    );
  }
}

signIn(e){
  const provider = new this.props.firebase.auth.GoogleAuthProvider();
  this.props.firebase.auth().signInWithPopup( provider );
  this.setState({user: e.target.value});
}

signOut(e){
  this.props.firebase.auth().signOut();
  this.setState({user: e.target.value});
}

  render() {
    return (
      <section className="user">
        <div className="account">
          <span class="log-in-out">{ this.props.user ? this.props.user.displayName : "Guest" }</span>
          <button className="signin-signout" onClick={ this.props.user ? this.signOut.bind(this) : this.signIn.bind(this) }>
            <span>Sign { this.props.user ? 'out' : 'in' }</span>
          </button>
        </div>
      </section>
    )
  }
}

  export default User;
