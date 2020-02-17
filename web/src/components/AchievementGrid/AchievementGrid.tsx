import React from 'react';
import AchievementRow from './../AchievementRow/AchievementRow';
import AchievementExplorerFilterOptions from '../AchievementExplorer/AchievementExplorerFilterOptions';
import './AchievementGrid.css';
import Achievement from './../../types/Achievement';
import ProgressionSummaryDetailMap from './ProgressionSummaryDetailMap';

export interface ColumnSpec
{
     Header: string, 
     accessor: ((row: Achievement) => string) | string,
     condition?: (row: any) => boolean,
     isHtml?: boolean
}

interface AchievementGridState {
    columns: ColumnSpec[]
}

interface AchievementGridProps {
    Filter: AchievementExplorerFilterOptions,
    Data: any[],
    ProgressionData: any[]
}

interface RowContainer
{
    Data: any,
    ProgressionData: any
}

export default class AcheivementGrid extends React.Component<AchievementGridProps, AchievementGridState, any>
{
    public getDetails = (r: any)  => {
        var html = "<strong>" + r.Name + "</strong> &nbsp; <i class='glyph glyph-gamerscore'></i><strong>" + r.Gamerscore + "</strong>" 
        + (r.IsRare ? (" &nbsp; <i class='glyph glyph-diamond'></i>" + r.Rarity + "%") : "") + "<br />"
        + "<span class='subheading'>" + r.Description + "</span>" ;
        
        if(r.GuideLink)
        {
            if(r.GuideTimestamp)
            {
                let parts = r.GuideTimestamp.split(":").map((t: any) => parseInt(t));
                let seconds = isNaN(parts[0]) ? 0 : (parts[0] * 60) + parts[1];

                html += " &nbsp; <a href='" + r.GuideLink + "?t=" + seconds + "'>[help]</a>";
            }
            else
            {
                html += " &nbsp; <a href='" + r.GuideLink + "'>[help]</a>";
            }
        } 

        return html;
    }

    public getProgressionSummary = (r: Achievement) => {
        var html = r.isUnlocked ? "<span title='" + r.progressionSummary +"'>✅</span>" : r.progressionSummary;

        if(r.progressions.length > 1)        
        {
            html += "<details><summary>Details</summary><p>";

            var map = ProgressionSummaryDetailMap[r.id];
            if(map !== undefined)
            {
                html += "<ul class='custom'>"
            }
            else
            {
                html += "<ul>"
            }
                
            html += r.progressions.map((v, i, _) => {

                var listVal = this.zeroPad((i+1).toString()) + ": " + v;

                if(map !== undefined)
                {
                    if(map.length < i) {
                        listVal = "???<br class='optional'/> " + v;
                    }
                    else {
                        listVal = "<strong>" + map[i] + ":</strong><br class='optional'/> " + v;    
                    }
                }

                return "<li>" + listVal + "</li>";
            }).join("\r\n");

            html += "</ul></p></details>";
        }

        return html;
    }

    private zeroPad (str: string): string {
        var pad = "00";
        return pad.substring(0, pad.length - str.length) + str;
    }

    public constructor(props: AchievementGridProps) {
        super(props);

        this.state = {
            columns: [
                {
                    "Header": "Category",
                    "accessor": r => r.Category + " // " + r.Subcategory
                },
                {
                    "Header": "Details",
                    "accessor": r => this.getDetails(r),
                    "isHtml": true
                },
                {
                    "Header": "Progression Target",
                    "accessor": "ProgressionTarget",
                    "condition": r => !r.progressionSummary
                },
                {
                    "Header": "Progression",
                    "accessor": r => this.getProgressionSummary(r),
                    "condition": r => !!r.progressionSummary,
                    "isHtml": true
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

        let progressionDict = this.props.ProgressionData.reduce((p,c) => {
            p[c.id] = c;
            return p;
        }, {});

        return rows.map(r => Object.assign(r, progressionDict[r.Id]));
    }

    render() {
        let rows = this.getFilteredRows();
        return (<div className="AchievementGrid">
            <table>
                <thead>
                    <tr className="AchievementRow">
                        {this.state.columns.filter(c => c.condition ? c.condition(rows[0]) : true).map(col => (
                            <th key={col.Header} className={col.Header}>{col.Header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map(row => (
                        <AchievementRow key={row.Id} Achievement={row} Columns={this.state.columns}></AchievementRow>
                    ))}
                </tbody>
            </table>
        </div>);
    }
}