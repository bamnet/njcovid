import { CountyStats } from '../data_loader';

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

        const daily = county_stats.reduce((result, row) => {
            const d = row.date.valueOf().toString();
            (result[d] = result[d] || {})[row.county] = row.positive;
            return result;
        }, <{ [key: string]: { [key: string]: number } }>{});

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
                    min: dates[dates.length - 7],
                    max: dates[dates.length - 1],
                },
                format: 'MMM d',
                ticks: dates.slice(dates.length - 7, dates.length),
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