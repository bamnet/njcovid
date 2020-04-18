import './styles.css';

import { loadData, countiesByWeight, StateStats, CountyStats } from './data_loader';
import { comma, commaSign, pctChange } from './util';
import { StateCases } from './charts/state_cases';
import { NewCases } from './charts/new_cases';
import { CountyCases } from './charts/county_cases';
import { CountyTable } from './charts/county_table';
import { summary } from './charts/summary_text';

google.charts.load('current', { packages: ['corechart', 'bar', 'line'] });
google.charts.setOnLoadCallback(drawCharts);

function drawCharts() {
    const data = loadData();

    summaryText(<HTMLElement>document.getElementById('summary'), data.state_stats);

    const stateCases = new StateCases(
        <Element>document.getElementById('state_total'),
        data.state_stats);

    const newCases = new NewCases(
        <Element>document.getElementById('new_cases'),
        data.state_stats);

    const weightedCounties = countiesByWeight(data.county_stats);
    const countyCases = new CountyCases(
        <Element>document.getElementById('county_trend'),
        data.county_stats,
        weightedCounties);

    new CountyTable(
        document.getElementById('tbl_bdy')!,
        <HTMLTemplateElement>document.getElementById('row_tmpl'),
        data.county_stats,
        weightedCounties);

    window.addEventListener('resize', () => {
        stateCases.render();
        newCases.render();
        countyCases.render();
    });
}

function summaryText(div: HTMLElement, state_stats: Array<StateStats>) {
    div.children.namedItem('summary_text')!.innerHTML = summary(state_stats);
    div.children.namedItem('loading')!.remove();
}