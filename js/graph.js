function changeScale() {
    switch (scale) {
        case "month":
            scale = "week";
            barChart.data = {
                labels: month.chart.labels.slice(0, limit),
                datasets: [{
                    label: '6 Most common trackers in the last month',
                    data: month.chart.data.slice(0, limit),
                    backgroundColor: [
                        'rgba(254,235,111,1)',
                        'rgba(254,239,137,1)',
                        'rgba(254,232,86,1)',
                        'rgba(254,242,162,1)',
                        'rgba(254,225,35,1)',
                        'rgba(254,229,61,1)'
                    ]
                }]
            };
            barChart.options.plugins.title.text = '6 most common trackers in the last month';
            break;
        case "week":
            scale = "month";
        default:
            barChart.data = {
                labels: week.chart.labels.slice(0, limit),
                datasets: [{
                    label: '6 Most common trackers in the last week',
                    data: week.chart.data.slice(0, limit),
                    backgroundColor: [
                        'rgba(225,75,126,1)',
                        'rgba(213,36,96,1)',
                        'rgba(232,118,157,1)',
                        'rgba(221,53,110,1)',
                        'rgba(191,32,86,1)',
                        'rgba(228,97,141,1)'
                    ]
                }]
            };
            barChart.options.plugins.title.text = '6 most common trackers in the last week';
            break;
    }
    scaleBtn.toggleClass("btn-demo").toggleClass("btn-learn");
    barChart.update();
}

let scaleBtn = $("#scale");
scaleBtn.click(changeScale);

const storage = new Storage();
await storage.openDatabase();
const utils = new Utils(storage);
let scale = "month";
const limit = 6;

let week = await utils.trackersPastWeek();
let weekData = {
    labels: week.chart.labels.slice(0, limit),
    datasets: [{
        data: week.chart.data.slice(0, limit),
        backgroundColor: [
            'rgba(225,75,126,1)',
            'rgba(213,36,96,1)',
            'rgba(232,118,157,1)',
            'rgba(221,53,110,1)',
            'rgba(191,32,86,1)',
            'rgba(228,97,141,1)'
        ]
    }]
};

let month = await utils.trackersPastMonth();
let monthData = {
    labels: month.chart.labels.slice(0, limit),
    datasets: [{
        data: month.chart.data.slice(0, limit),
        backgroundColor: [
            'rgba(254,235,111,1)',
            'rgba(254,239,137,1)',
            'rgba(254,232,86,1)',
            'rgba(254,242,162,1)',
            'rgba(254,225,35,1)',
            'rgba(254,229,61,1)'
        ]
    }]
};

let ctx = $("#week");
let barChart = new Chart(ctx, {
    type: 'bar',
    data: weekData,
    options: {
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: '6 most common trackers in the last week ',
            }
        }
    }
});

let percent = await utils.allTimePercentage()
let percentData = {
    labels: percent.chart.labels.slice(0, limit),
    datasets: [{
        data: percent.chart.data.slice(0, limit),
        backgroundColor: [
            'rgba(254,242,162,1)',
            'rgba(254,239,137,1)',
            'rgba(254,235,111,1)',
            'rgba(254,232,86,1)',
            'rgba(254,229,61,1)',
            'rgba(254,225,35,1)'
        ],
        borderWidth: 0
    }]
}


let ctx2 = $("#allTime");
let doughnutChart = new Chart(ctx2, {
    type: "doughnut",
    data: percentData,
    options: {
        cutout: "40%",
        radius: "75%",
        plugins: {
            legend: {
                position: "right"
            },
        }
    }
});
