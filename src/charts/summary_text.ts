import { comma, commaSign, pctChange } from "../util";
import { StateStats } from "../data_loader";

import * as moment from "moment";

export function summary(state_stats: Array<StateStats>) {
    state_stats.sort((a, b) => a.date.valueOf() - b.date.valueOf());

    const recent = state_stats[state_stats.length - 1];
    const prev = state_stats[state_stats.length - 2];

    const d = moment(recent.date);

    return `
    Positive Cases: ${comma(recent.positive)}
    (${commaSign(recent.positive - prev.positive)}
    / ${pctChange(prev.positive, recent.positive)}),
    Confirmed Deaths: ${comma(recent.deaths)}
    (${commaSign(recent.deaths - prev.deaths)}
    / ${pctChange(prev.deaths, recent.deaths)})
    as of ${d.format('MMM D')}
    `;
}