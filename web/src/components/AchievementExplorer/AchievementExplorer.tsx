import React from 'react';
import AcheivementGrid from '../AchievementGrid/AchievementGrid';
import AchievementExplorerFilterOptions from './AchievementExplorerFilterOptions';
import AchievementFilter from '../AchievementFilter/AchievementFilter';

interface AchievementExplorerProps
{
}

interface AchievementExplorerState
{
    Data: any[],
    Filter: AchievementExplorerFilterOptions
}

export default class AchievementExplorer extends React.Component<AchievementExplorerProps, AchievementExplorerState, any>
{
    public constructor(props : AchievementExplorerProps)
    {
        super(props);
        this.state = {Data: [], Filter: new AchievementExplorerFilterOptions()};
    }

    handleFilterChange = (filter: AchievementExplorerFilterOptions) => {
        this.setState({Filter: filter});
    }

    async componentDidMount() {
        const resp = await fetch("/data/AnnotatedMCCAchievements.json");
        const json = await resp.json();
        this.setState({Data: json});
    }

    render() {
        return (
            <div className="AchievementExplorer">
                <AchievementFilter OnFilterChange={this.handleFilterChange} Data={this.state.Data}></AchievementFilter>
                <AcheivementGrid Filter={this.state.Filter} Data={this.state.Data}></AcheivementGrid>
            </div>);
    }
}