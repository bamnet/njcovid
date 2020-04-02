import * as rawJsonData from './data/data.json';

export interface CountyStats {
    date: Date;
    county: string;
    positive: number;
    deaths: number;
}

export interface StateStats {
    date: Date;
    positive: number;
    deaths: number;
}

export interface Data {
    county_stats: Array<CountyStats>
    state_stats: Array<StateStats>
}

interface JSONCountyStats {
    date: string;
    county: string;
    presumptive_positive: number;
    deaths: number | null;
}

interface JSONData {
    county_stats: Array<JSONCountyStats>
}

const PATH = './data.json';

function date(input: string): Date {
    // -04:00 = New Jersey Timezone.
    return new Date(input + "T00:00:00-04:00");
}

export function loadData() {
    const jsonData: JSONData = (<any>rawJsonData).default;
    // Convert the JSON into County Stats.
    const county_stats = jsonData.county_stats.map((row) => {
        return <CountyStats>{
            date: date(row.date),
            county: row.county,
            positive: row.presumptive_positive,
            deaths: row.deaths || 0,
        };
    });

    // Summarize counties into the state.
    // TODO(bamnet): Push this over to a server.
    const dailySummary = jsonData.county_stats.reduce((rv, x) => {
        rv[x.date] = rv[x.date] || { deaths: 0, positive: 0 };
        rv[x.date].positive = (rv[x.date].positive || 0) + x.presumptive_positive;
        if (x.deaths) {
            rv[x.date].deaths = (rv[x.date].deaths || 0) + x.deaths;
        }
        return rv;
    }, <{ [key: string]: { deaths: number, positive: number } }>{});

    const stateStats = Object.entries(dailySummary).map(([key, value]) => {
        return {
            date: date(key),
            positive: value.positive,
            deaths: value.deaths,
        };
    });

    return <Data>{
        county_stats: county_stats,
        state_stats: stateStats,
    };
}

export function countiesByWeight(county_stats: Array<CountyStats>): Array<string> {
    const countyWeight = county_stats.reduce((weights, row) => {
        weights[row.county] = (weights[row.county] || 0) + row.positive;
        return weights;
    }, <{ [key: string]: number }>{});

    return Object.entries(countyWeight)
        .map(([county, weight]) => [county, weight])
        .sort((a, b) => <number>b[1] - <number>a[1])
        .map((rows) => <string>rows[0]);
}