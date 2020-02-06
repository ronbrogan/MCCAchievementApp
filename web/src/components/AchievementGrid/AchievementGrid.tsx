import React from 'react';
import AchievementRow from './../AchievementRow/AchievementRow';
import AchievementExplorerFilterOptions from '../AchievementExplorer/AchievementExplorerFilterOptions';
import './AchievementGrid.css';

interface AchievementGridState {
    columns: { Header: string, accessor: string }[]
}

interface AchievementGridProps {
    Filter: AchievementExplorerFilterOptions,
    Data: any[]
}

export default class AcheivementGrid extends React.Component<AchievementGridProps, AchievementGridState, any>
{
    public constructor(props: AchievementGridProps) {
        super(props);

        this.state = {
            columns: [
                {
                    "Header": "Category",
                    "accessor": "Category"
                },
                {
                    "Header": "Subcategory",
                    "accessor": "Subcategory"
                },
                {
                    "Header": "Name",
                    "accessor": "Name"
                },
                {
                    "Header": "Description",
                    "accessor": "Description"
                },
                {
                    "Header": "Id",
                    "accessor": "Id"
                },
                {
                    "Header": "GuideLink",
                    "accessor": "GuideLink"
                },
                {
                    "Header": "GuideTimestamp",
                    "accessor": "GuideTimestamp"
                }
            ]
        };
    }

    private getFilteredRows = () : any[] => {
        var rows = this.props.Data;

        if(this.props.Filter.categoryFilter !== "Any")
        {
            rows = rows.filter(r => r.Category === this.props.Filter.categoryFilter);
        }

        if(this.props.Filter.subcategoryFilter !== "Any")
        {
            rows = rows.filter(r => r.Subcategory === this.props.Filter.subcategoryFilter);
        }

        return rows;
    }

    render() {
        let rows = this.getFilteredRows();
        return (<div className="AchievementGrid">
            <table>
                <thead>
                    <tr>
                        {this.state.columns.map(col => (
                            <th key={col.Header}>{col.Header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map(row => (
                        <AchievementRow key={row.Id} Achievement={row} Columns={this.state.columns} ProgressionState={null}></AchievementRow>
                    ))}
                </tbody>
            </table>
        </div>);
    }
}