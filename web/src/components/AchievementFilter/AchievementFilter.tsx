import React from 'react';
import AchievementExplorerFilterOptions from '../AchievementExplorer/AchievementExplorerFilterOptions';
import { throwStatement } from '@babel/types';

interface AchievementFilterProps {
    Data: any[],
    OnFilterChange: (filter: AchievementExplorerFilterOptions) => void
}

interface AchievementFilterState {
    Filter: AchievementExplorerFilterOptions
}

export default class AchievementFilter extends React.Component<AchievementFilterProps, AchievementFilterState, any>
{
    private filterOptions: AchievementExplorerFilterOptions = {
        categoryFilter: "Any", 
        subcategoryFilter: "Any"
    };

    public constructor(props: AchievementFilterProps) {
        super(props);
        this.props.OnFilterChange(this.filterOptions);
        this.state = {Filter: this.filterOptions};
    }

    notifyFilterChange = (event: React.FormEvent<HTMLSelectElement>) => {
        var stateProp = event.currentTarget.getAttribute("data-filter-accessor");

        if(stateProp == null)
            return;

        this.filterOptions[(stateProp as string)] = event.currentTarget.value;

        // Ensure that the existing subcategory selection is valid for the new category selection, otherwise reset to Any
        if(stateProp == "categoryFilter" && this.filterOptions.categoryFilter != "Any")
        {
            let subcatIsValid = this.props.Data.filter(r => r.Category == this.filterOptions.categoryFilter)
                .map(r => r.Subcategory)
                .indexOf(this.filterOptions.subcategoryFilter) >= 0;

            if(subcatIsValid === false)
            {
                this.filterOptions.subcategoryFilter = "Any";
            }
        }

        this.setState({Filter: this.filterOptions});
        this.props.OnFilterChange(this.filterOptions);
    }

    render() {
        const categories = ["Any", ...new Set(this.props.Data.map(r => r.Category))];
        let subcats:any[] = [];

        const filter = this.state.Filter;

        if(filter.categoryFilter == "Any")
        {
            subcats = ["Any", ...new Set(this.props.Data.map(r => r.Subcategory))];
        }
        else
        {
            subcats = ["Any", ...new Set(this.props.Data.filter(r => r.Category == filter.categoryFilter).map(r => r.Subcategory))];
        }

        return (
            <div className="AchievementFilter">
                <select onChange={this.notifyFilterChange} value={this.state.Filter.categoryFilter} data-filter-accessor="categoryFilter">
                    {categories.map(c => (<option key={c} value={c}>{c}</option>))}
                </select>
                <select onChange={this.notifyFilterChange} value={this.state.Filter.subcategoryFilter} data-filter-accessor="subcategoryFilter">
                    {subcats.map(c => (<option key={c} value={c}>{c}</option>))}
                </select>
            </div>);
    }
}