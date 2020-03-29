export interface CountyStats {
    date: Date;
    county: string;
    positive: number;
}

export interface StateStats {
    date: Date;
    positive: number;
}

export interface Data {
    county_stats: Array<CountyStats>
    state_stats: Array<StateStats>
}

interface JSONCountyStats {
    date: string;
    county: string;
    presumptive_positive: number;
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
            };
        });

        // Summarize counties into the state.
        // TODO(bamnet): Push this over to the server.
        const dailySummary = jsonData.county_stats.reduce((rv, x) => {
            rv[x.date] = (rv[x.date] || 0) + x.presumptive_positive;
            return rv;
        }, <{ [key: string]: number }>{});

        const stateStats = Object.entries(dailySummary).map(([key, value]) => {
            return {
                date: date(key),
                positive: value
            };
        });

        return <Data>{
            county_stats: county_stats,
            state_stats: stateStats,
        }
    })
}