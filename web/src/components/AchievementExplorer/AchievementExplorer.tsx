import React from 'react';
import AcheivementGrid from '../AchievementGrid/AchievementGrid';
import AchievementExplorerFilterOptions from './AchievementExplorerFilterOptions';
import AchievementFilter from '../AchievementFilter/AchievementFilter';
import MccApi from '../../services/MccApi';

interface AchievementExplorerProps {
    api: MccApi,
    Data: any[]
}

interface AchievementExplorerState {
    Filter: AchievementExplorerFilterOptions,
    ProgressionData: any[]
}

export default class AchievementExplorer extends React.Component<AchievementExplorerProps, AchievementExplorerState, any>
{
    public constructor(props: AchievementExplorerProps) {
        super(props);
        this.state = { Filter: new AchievementExplorerFilterOptions(), ProgressionData:[] };
    }

    handleFilterChange = (filter: AchievementExplorerFilterOptions) => {
        this.setState({ Filter: filter });
    }

    async componentDidUpdate() {
        if(this.props.api.isAuthorized() && this.state.ProgressionData.length === 0)
        {
            var progressionData = await this.props.api.getAchievements();
            this.setState({ProgressionData: progressionData});
        }
    }

    render() {
        if (!!this.props.Data) {
            return (
                <div className="AchievementExplorer">
                    <AchievementFilter OnFilterChange={this.handleFilterChange} Data={this.props.Data}></AchievementFilter>
                    <AcheivementGrid Filter={this.state.Filter} Data={this.props.Data} ProgressionData={this.state.ProgressionData}></AcheivementGrid>
                </div>);
        }
        else {
            return (<p>loading</p>)
        }
    }
}