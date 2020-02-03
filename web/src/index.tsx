import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const appUrl = "https://localhost.mccachievement.app/oauth";
const oauthUrl = "https://login.live.com/oauth20_authorize.srf?client_id=000000004037470C&response_type=token&scope=Xboxlive.signin&redirect_uri=https://localhost.mccachievement.app/oauth";

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
