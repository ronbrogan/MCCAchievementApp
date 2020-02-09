import React from 'react';
import { ColumnSpec } from '../AchievementGrid/AchievementGrid';

interface AchievementRowProps
{
    Achievement: any,
    Columns: ColumnSpec[]
}

export default class AchievementRow extends React.Component<AchievementRowProps, any, any>
{   
    public constructor(props : AchievementRowProps)
    {
        super(props);
    }

    render() {
        return (
            <tr className="AchievementRow full">
                    {this.props.Columns.filter(c => c.condition ? c.condition(this.props.Achievement) : true).map(col => (
                        col.isHtml ? (
                            <td className={col.Header} key={col.accessor.toString()} dangerouslySetInnerHTML={ (typeof col.accessor == 'string') 
                                ? { __html: this.props.Achievement[col.accessor] }
                                : { __html: col.accessor(this.props.Achievement)}}>
                            </td>
                        ) : (
                            <td className={col.Header} key={col.accessor.toString()}>
                                {(typeof col.accessor == 'string') 
                                    ? this.props.Achievement[col.accessor]
                                    : col.accessor(this.props.Achievement)}
                            </td>
                        )
                    ))} 
            </tr>);
            
    }
}