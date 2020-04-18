import { StateStats } from '../data_loader';

const options: google.visualization.ColumnChartOptions = {
    vAxes: [{ title: 'Average New Cases' }],
    hAxis: { format: 'MMM d' },
    chartArea: {
        left: 90,
        right: 90,
        top: 20,
        bottom: 20,
        height: '100%',
    },
    bar: { groupWidth: '85%' },
    legend: { position: 'none' },
    annotations: {
        textStyle: {
            bold: true,
            color: '#3F484D',
        },
    }
};

export class NewCases {
    view: google.visualization.DataView;
    chart: google.visualization.ColumnChart;

    constructor(div: Element, state_stats: Array<StateStats>) {
        this.chart = new google.visualization.ColumnChart(div);

        const data = new google.visualization.DataTable();
        data.addColumn('date', 'Date');
        data.addColumn('number', 'Average New Cases');
        data.addColumn({ type: 'string', role: 'style' });
        let prev_positive = 0;
        let deltas: Array<number> = [];
        state_stats.sort((a, b) => a.date.valueOf() - b.date.valueOf()).forEach((row, i) => {
            const delta = row.positive - prev_positive;
            deltas.push(delta);
            prev_positive = row.positive;

            // Only display every other row.
            // Skip the first few days, they round to 0.
            if (i > 4 && i % 2 == 0) {
                // Compute a 3 day average of new cases.
                // 3 days looks like it reduces weekend / holiday spikes nicely while
                // still preserving changes within weeks.
                const avg = (delta + deltas[i - 1] + deltas[i - 2]) / 3;
                // Round to 100s.
                data.addRow([row.date, Math.round(avg / 100) * 100, color(avg)]);
            }
        });

        this.view = new google.visualization.DataView(data);
        this.view.setColumns([0, 1,
            {
                role: 'style', sourceColumn: 2
            }, {
                calc: 'stringify',
                sourceColumn: 1,
                type: 'string',
                role: 'annotation'
            }]);

        this.render();
    }

    render() {
        this.chart.draw(this.view, options);
    }
}

function color(cases: number): string {
    if (cases > 3000) {
        return '#E08E79';
    }
    if (cases > 1000) {
        return '#F1D4AF';
    }
    return '#C5E0DC';
}   