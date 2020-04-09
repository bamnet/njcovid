import { CountyStats } from '../data_loader';
import { ChartConfiguration } from 'chart.js';

import { dateFormat } from '../util';

type DailyCountyCount = { [key: string]: { [key: string]: number } };

// colors stores the google-charts colors so we can reuse them in the static images.
const colors = ['#3366cc', '#dc3912', '#ff9900', '#109618', '#990099', '#0099c6', '#dd4477',
    '#66aa00', '#b82e2e', '#316395', '#994499', '#22aa99', '#aaaa11', '#6633cc',
    '#e67300', '#8b0707', '#651067', '#329262', '#5574a6', '#3b3eac', '#b77322',
    '#16d620', '#b91383', '#f4359e', '#9c5935', '#a9c413', '#2a778d', '#668d1c',
    '#bea413', '#0c5922', '#743411'];
// daysToGraph configures how many historical days should be plotted.
const daystoGraph = 10;

export class CountyCases {
    data: google.visualization.DataTable;
    options: google.visualization.LineChartOptions;
    chart: google.visualization.ComboChart;

    constructor(div: Element, county_stats: Array<CountyStats>, counties: Array<string>) {
        this.chart = new google.visualization.LineChart(div);

        this.data = new google.visualization.DataTable();
        this.data.addColumn('date', 'Date');

        counties.forEach((county) => {
            this.data.addColumn('number', county);
        });

        const daily = dailyCounts(county_stats);

        Object.keys(daily).sort().forEach((key) => {
            const value = daily[key];

            const date = new Date();
            date.setTime(parseInt(key, 10));

            const row = <Array<any>>[date];
            counties.forEach((county) => {
                row.push(value[county] || 0);
            });
            this.data.addRow(row);
        });

        const dates = this.data.getDistinctValues(0);
        this.options = {
            vAxis: { title: 'Positive Cases' },
            hAxis: {
                viewWindowMode: 'explicit',
                viewWindow: {
                    min: dates[dates.length - daystoGraph],
                    max: dates[dates.length - 1],
                },
                format: 'MMM d',
                ticks: dates.slice(dates.length - daystoGraph, dates.length),
            },
            pointSize: 7,
            chartArea: {
                left: 90,
                right: 150,
                top: 20,
                bottom: 20,
                height: "100%",
            }
        };

        this.render();
    }

    render() {
        this.chart.draw(this.data, this.options);
    }
}

function dailyCounts(county_stats: Array<CountyStats>){
    return county_stats.reduce((result, row) => {
        const d = row.date.valueOf().toString();
        (result[d] = result[d] || {})[row.county] = row.positive;
        return result;
    }, <DailyCountyCount>{});
}

export function staticURL(county_stats: Array<CountyStats>, counties: Array<string>) {
    const daily = dailyCounts(county_stats);

    const uniqueDays = county_stats.reduce((set, row) => {
        return set.add(row.date.valueOf().toString());
    }, new Set<string>());

    const days = Array.from(uniqueDays).sort().slice(-1 * daystoGraph);

    const staticOptions = <ChartConfiguration>{
        type: 'line',
        options: {
            legend: {
                position: 'right',
            },
        },
        data: {
            labels: days.map((day) => dateFormat(new Date(parseInt(day, 10)))),
            datasets: counties.map((county, i) => {
                return {
                    label: county,
                    data: days.map((day) => (daily[day][county] || 0)),
                    fill: false,
                    borderColor: colors[i],
                    pointBackgroundColor: colors[i],
                };
            }),
        },
    };

    return `https://quickchart.io/chart?w=1200&h=630&c=${encodeURIComponent(JSON.stringify(staticOptions))}`;
}