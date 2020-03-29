import './styles.css';

import { loadData, StateStats, CountyStats } from './data_loader';

google.charts.load('current', { packages: ['corechart', 'bar', 'line'] });
google.charts.setOnLoadCallback(drawCharts);

async function drawCharts() {
    const data = await loadData();

    stateTotal(<Element>document.getElementById('state_total'), data.state_stats);
    countyTrend(<Element>document.getElementById('county_trend'), data.county_stats);
}

function stateTotal(div: Element, state_stats: Array<StateStats>) {
    const data = new google.visualization.DataTable();
    data.addColumn('date', 'Date');
    data.addColumn('number', 'Total Cases');
    data.addColumn('number', 'New Cases');
    let prev_positive = 0;
    state_stats.sort((a, b) => a.date.valueOf() - b.date.valueOf()).forEach((row) => {
        data.addRow([row.date, row.positive, row.positive - prev_positive]);
        prev_positive = row.positive;
    });

    const options: google.visualization.ComboChartOptions = {
        vAxes: [{ title: 'Total Cases' }, { title: 'New Cases' }],
        seriesType: 'line',
        series: {
            1: {
                type: 'bars',
                targetAxisIndex: 1,
            },
        },
        hAxis: { format: 'MMM d' },
        pointSize: 7,
        chartArea: {
            left: 90,
            right: 90,
            top: 20,
            bottom: 20,
            height: "100%",
        },
    };

    const chart = new google.visualization.ComboChart(div);

    chart.draw(data, options);
}

function countyTrend(div: Element, county_stats: Array<CountyStats>) {
    const data = new google.visualization.DataTable();
    data.addColumn('date', 'Date');


    const countyWeight = county_stats.reduce((weights, row) => {
        weights[row.county] = (weights[row.county] || 0) + row.positive;
        return weights;
    }, <{ [key: string]: number }>{});

    const counties = Object.entries(countyWeight)
        .map(([county, weight]) => [county, weight])
        .sort((a, b) => <number>b[1] - <number>a[1])
        .map((rows) => <string>rows[0]);


    counties.forEach((county) => {
        data.addColumn('number', county);
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
        data.addRow(row);
    });

    const options: google.visualization.LineChartOptions = {
        vAxis: { title: 'Positive Cases' },
        hAxis: {
            viewWindowMode: 'explicit',
            viewWindow: {
                min: new Date(2020, 2, 20),
                max: new Date(2020, 2, 28),
            },
            format: 'MMM d',
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
    const chart = new google.visualization.LineChart(div);
    chart.draw(data, options);
}