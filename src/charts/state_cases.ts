import { StateStats } from '../data_loader';

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
        height: '100%',
    },
    bar: { groupWidth: '85%' },
    lineWidth: 4,
    colors: ['#3366CC', '#0099C6']
};

export class StateCases {
    view: google.visualization.DataView;
    chart: google.visualization.ComboChart;

    constructor(div: Element, state_stats: Array<StateStats>) {
        this.chart = new google.visualization.ComboChart(div);

        const data = new google.visualization.DataTable();
        data.addColumn('date', 'Date');
        data.addColumn('number', 'Total Cases');
        data.addColumn('number', 'New Cases');
        let prev_positive = 0;
        state_stats.sort((a, b) => a.date.valueOf() - b.date.valueOf()).forEach((row) => {
            data.addRow([row.date, row.positive, row.positive - prev_positive]);
            prev_positive = row.positive;
        });

        this.view = new google.visualization.DataView(data);
        this.view.setColumns([0, 1,
            {
                calc: 'stringify',
                sourceColumn: 1,
                type: 'string',
                role: 'annotation'
            },
            2]);

        this.render();
    }

    render() {
        this.chart.draw(this.view, options);
    }
}