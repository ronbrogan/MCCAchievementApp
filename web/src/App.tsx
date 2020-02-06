import React from 'react';
import AchievementExplorer from './components/AchievementExplorer/AchievementExplorer';
import ProgressionAuthorizer from './components/ProgressionAuthorizer/ProgressionAuthorizer';
import './App.css';

export default class App extends React.Component
{
  progressionAuthCallback()
  {

  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h1><i className="glyph glyph-achievement App-logo"></i> MCC Achievement App <i className="glyph glyph-diamond App-logo"></i></h1>
        </header>
        <ProgressionAuthorizer onAuthorized={this.progressionAuthCallback}></ProgressionAuthorizer>
        <AchievementExplorer></AchievementExplorer>
      </div>
    );
  }
}
