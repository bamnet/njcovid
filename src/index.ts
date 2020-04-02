import './styles.css';

import * as moment from 'moment';

import { loadData, StateStats, CountyStats } from './data_loader';

google.charts.load('current', { packages: ['corechart', 'bar', 'line'] });
google.charts.setOnLoadCallback(drawCharts);

async function drawCharts() {
    const data = await loadData();

    summaryText(<HTMLElement>document.getElementById('summary'), data.state_stats);
    stateTotal(<Element>document.getElementById('state_total'), data.state_stats);
    countyTrend(<Element>document.getElementById('county_trend'), data.county_stats);
    countyTable(document.getElementById('tbl_bdy')!, data.county_stats);
}

function comma(num: number): string {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function commaSign(num: number): string {
    let str = num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    if (num >= 0) {
        str = '+' + str;
    }
    return str;
}

function pctChange(oldVal: number, newVal: number): string {
    const pct = Math.round(100 * (newVal - oldVal) / oldVal);
    if (isNaN(pct)) {
        return '-';
    }
    return commaSign(pct) + '%';
}

function summaryText(div: HTMLElement, state_stats: Array<StateStats>) {
    state_stats.sort((a, b) => a.date.valueOf() - b.date.valueOf());

    const recent = state_stats[state_stats.length - 1];
    const prev = state_stats[state_stats.length - 2];

    div.children.namedItem('summary_positive')!.innerHTML = `
        Positive Cases: ${comma(recent.positive)}
        (${commaSign(recent.positive - prev.positive)}
        / ${pctChange(prev.positive, recent.positive)})`;

    const d = moment(recent.date);
    div.children.namedItem('summary_date')!.innerHTML = `as of ${d.format('MMM D')}`;

    div.children.namedItem('loading')!.remove();
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
        bar: { groupWidth: "85%" },
        lineWidth: 4,
        colors: ['#3366CC', '#0099C6']
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

function countiesByWeight(county_stats: Array<CountyStats>): Array<string> {
    const countyWeight = county_stats.reduce((weights, row) => {
        weights[row.county] = (weights[row.county] || 0) + row.positive;
        return weights;
    }, <{ [key: string]: number }>{});

    return Object.entries(countyWeight)
        .map(([county, weight]) => [county, weight])
        .sort((a, b) => <number>b[1] - <number>a[1])
        .map((rows) => <string>rows[0]);
}

function countyTable(body: HTMLElement, county_stats: Array<CountyStats>) {
    const summary = county_stats.reduce((county_results, row) => {
        (county_results[row.county] = county_results[row.county] || []).push(row);
        return county_results;
    }, <{[key: string]: Array<CountyStats>}>{});

    const template = <HTMLTemplateElement>document.getElementById('row_tmpl');
    const counties = countiesByWeight(county_stats);
    counties.forEach((county) => {
        const tr = <HTMLElement>template.content.cloneNode(true);
        const td = tr.querySelectorAll("td");

        td[0].textContent = county;

        // Sort the days so the most recent day is 0, prev is 1, etc.
        const days = summary[county].sort((a, b) => b.date.valueOf() - a.date.valueOf());

        td[1].textContent = comma(days[0].positive);
        td[2].textContent = commaSign(days[0].positive - days[1].positive);
        td[3].textContent = pctChange(days[1].positive, days[0].positive);

        td[4].textContent = comma(days[0].deaths);
        td[5].textContent = commaSign(days[0].deaths - days[1].deaths);
        td[6].textContent = pctChange(days[1].deaths, days[0].deaths);
        
        body.appendChild(tr);
    });
}

function countyTrend(div: Element, county_stats: Array<CountyStats>) {
    const data = new google.visualization.DataTable();
    data.addColumn('date', 'Date');

    const counties = countiesByWeight(county_stats);
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