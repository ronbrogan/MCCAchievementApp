import React from 'react';
import logo from './logo.svg';
import './App.css';
import AchievementExplorer from './components/AchievementExplorer/AchievementExplorer';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1><i className="glyph glyph-achievement App-logo"></i> MCC Achievement App <i className="glyph glyph-diamond App-logo"></i></h1>
      </header>

      <AchievementExplorer></AchievementExplorer>
    </div>
  );
}

export default App;
