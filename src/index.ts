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
        bar: {groupWidth: "85%"},
        lineWidth: 4,
    };

    const chart = new google.visualization.ComboChart(div);

    const view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
        {
            calc: "stringify",
            sourceColumn: 1,
            type: "string",
            role: "annotation"
        },
        2]);

    chart.draw(view, options);
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

    const dates = data.getDistinctValues(0);

    const options: google.visualization.LineChartOptions = {
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
    const chart = new google.visualization.LineChart(div);
    chart.draw(data, options);
}