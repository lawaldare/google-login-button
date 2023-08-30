import { Component, h, Event, EventEmitter, getAssetPath } from '@stencil/core';
import { firebase } from '../../environment/environment';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, UserCredential, User, signOut } from 'firebase/auth';

@Component({
  tag: 'google-login-button',
  styleUrl: 'google-login-button.css',
  shadow: true,
  assetsDirs: ['assets'],
})
export class GoogleLoginButton {
  firebaseapp = initializeApp(firebase);
  auth = getAuth(this.firebaseapp);

  @Event({ bubbles: true, composed: true }) userEmitted: EventEmitter<User>;

  onButtonClick() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider)
      .then(result => {
        const user = result.user;
        this.userEmitted.emit(user);
        // console.log(user);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <button onClick={this.onButtonClick.bind(this)}>
        <img src={getAssetPath('assets/g-icon.png')} alt="icon" />
        Sign in with Google
      </button>
    );
  }
}
