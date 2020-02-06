import React from 'react';

interface AchievementRowProps
{
    Achievement: any,
    Columns: {Header: string, accessor: string}[],
    ProgressionState: any
}

export default class AchievementRow extends React.Component<AchievementRowProps, any, any>
{   
    public constructor(props : AchievementRowProps)
    {
        super(props);
    }

    render() {
        return (
            <tr className="AchievementRow">
                   {this.props.Columns.map(col => (
                        <td key={col.accessor}>
                            {(col.accessor === "GuideLink") 
                            ? <a href={this.props.Achievement[col.accessor]}>{this.props.Achievement[col.accessor]}</a>
                            : this.props.Achievement[col.accessor]}
                        </td>
                    ))} 
            </tr>);
    }
}