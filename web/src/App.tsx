import React from 'react';
import AchievementExplorer from './components/AchievementExplorer/AchievementExplorer';
import ProgressionAuthorizer from './components/ProgressionAuthorizer/ProgressionAuthorizer';
import './App.css';
import MccApi from './services/MccApi';

export default class App extends React.Component<any, any, any> {
    public mccApi: MccApi = new MccApi();

    constructor(props:any)
    {
        super(props);
        this.state = {loggedIn: false};
    }

    async componentDidMount() {
        const resp = await fetch("/data/AnnotatedMCCAchievements.json");
        const json = await resp.json();
        this.setState({Data: json, loggedIn: this.mccApi.isAuthorized()});
    }

    progressionAuthCallback = () => {
        this.setState({loggedIn: this.mccApi.isAuthorized()});
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1><i className="glyph glyph-achievement App-logo"></i> MCC Achievement App <i className="glyph glyph-diamond App-logo"></i></h1>
                    <ProgressionAuthorizer onAuthorized={this.progressionAuthCallback} api={this.mccApi}></ProgressionAuthorizer>
                </header>
                
                <AchievementExplorer api={this.mccApi} LoggedIn={this.state.loggedIn} Data={this.state.Data}></AchievementExplorer>
            </div>
        );
    }
}
