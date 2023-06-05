import firebase from 'firebase/compat/app'
import * as firebaseui from 'firebaseui'

// FirebaseUI config.
var uiConfig = {
  signInSuccessUrl: '/',
  signInFlow: 'popup',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  // tosUrl and privacyPolicyUrl accept either url string or a callback
  // function.
  // Terms of service url/callback.
  tosUrl: '<your-tos-url>',
  // Privacy policy url/callback.
  privacyPolicyUrl: function () {
    window.location.assign('<your-privacy-policy-url>')
  }
}

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth())
// The start method will wait until the DOM is loaded.
export default function startUi() {
  const App = document.querySelector('#app')

  App.insertAdjacentHTML(
    'beforeend', /*html*/ `
    <div id="firebaseui-auth-container" class="mt-60"></div>
    `
  )

  ui.start('#firebaseui-auth-container', uiConfig)
}
