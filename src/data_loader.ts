export interface CountyStats {
    date: Date;
    county: string;
    positive: number;
    deaths?: number;
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

export async function loadData() {
    return fetch(PATH).then((response) => {
        return <Promise<JSONData>>response.json()
    }).then((jsonData) => {
        // Convert the JSON into County Stats.
        const county_stats = jsonData.county_stats.map((row) => {
            return {
                date: date(row.date),
                county: row.county,
                positive: row.presumptive_positive,
                deaths: row.deaths,
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
        }
    })
}