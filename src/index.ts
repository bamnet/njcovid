import './styles.css';

import * as moment from 'moment';

import { loadData, countiesByWeight, StateStats, CountyStats } from './data_loader';
import { comma, commaSign, pctChange } from './util';
import { StateCases } from './charts/state_cases';
import { CountyCases } from './charts/county_cases';
import { CountyTable } from './charts/county_table';

google.charts.load('current', { packages: ['corechart', 'bar', 'line'] });
google.charts.setOnLoadCallback(drawCharts);

function drawCharts() {
    const data = loadData();

    summaryText(<HTMLElement>document.getElementById('summary'), data.state_stats);

    const stateCases = new StateCases(
        <Element>document.getElementById('state_total'),
        data.state_stats);

    const weightedCounties = countiesByWeight(data.county_stats);
    const countyCases = new CountyCases(
        <Element>document.getElementById('county_trend'),
        data.county_stats,
        weightedCounties);

    const metaImg = document.createElement('meta');
    metaImg.setAttribute('name', 'og:image');
    metaImg.content = countyCases.staticURL;
    document.head.appendChild(metaImg);

    new CountyTable(
        document.getElementById('tbl_bdy')!,
        <HTMLTemplateElement>document.getElementById('row_tmpl'),
        data.county_stats,
        weightedCounties);

    window.addEventListener('resize', () => {
        stateCases.render();
        countyCases.render();
    });
}

function summaryText(div: HTMLElement, state_stats: Array<StateStats>) {
    state_stats.sort((a, b) => a.date.valueOf() - b.date.valueOf());

    const recent = state_stats[state_stats.length - 1];
    const prev = state_stats[state_stats.length - 2];

    div.children.namedItem('summary_positive')!.innerHTML = `
        Positive Cases: ${comma(recent.positive)}
        (${commaSign(recent.positive - prev.positive)}
        / ${pctChange(prev.positive, recent.positive)}),
        Confirmed Deaths: ${comma(recent.deaths)}
        (${commaSign(recent.deaths - prev.deaths)}
        / ${pctChange(prev.deaths, recent.deaths)})
        `;

    const d = moment(recent.date);
    div.children.namedItem('summary_date')!.innerHTML = `as of ${d.format('MMM D')}`;

    div.children.namedItem('loading')!.remove();
}