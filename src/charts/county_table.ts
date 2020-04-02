import { CountyStats } from "../data_loader";
import { comma, commaSign, pctChange } from "../util";

export class CountyTable {
    constructor(body: HTMLElement, template: HTMLTemplateElement, county_stats: Array<CountyStats>, counties: Array<string>) {
        const summary = county_stats.reduce((county_results, row) => {
            (county_results[row.county] = county_results[row.county] || []).push(row);
            return county_results;
        }, <{ [key: string]: Array<CountyStats> }>{});

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
}