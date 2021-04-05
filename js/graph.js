function changeScale() {
    switch (scale) {
        case "month":
            scale = "week";
            barChart.data = monthData;
            barChart.options.title.text = '6 most common trackers in the last month';
            break;
        case "week":
            scale = "month";
        default:
            barChart.data = weekData;
            barChart.options.title.text = '6 most common trackers in the last week ';
            break;
    }
    barChart.update();
}

$("#scale").click(changeScale);

const storage = new Storage();
await storage.openDatabase();
const utils = new Utils(storage);
let scale = "month";
const limit = 6;

let week = await utils.trackersPastWeek();
let weekData = {
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
}

let month = await utils.trackersPastMonth();
let monthData = {
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
}

let ctx = $("#week");
let barChart = new Chart(ctx, {
    type: 'bar',
    data: weekData,
    options: {
        legend: {
            display: false
        },
        maintainAspectRatio: true,

        title: {
            display: true,
            text: '6 most common trackers in the last week',
            position: 'top',
            fontSize: 20,
            fontFamily: 'Inconsolata , Arial',
            fontColor: "#000",
        },
        scales: {
            xAxes: [{
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                }
            }],
            yAxes: [{
                ticks: {
                    min: 0
                },
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                }
            }]
        },
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
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
        cutoutPercentage: 40,
        maintainAspectRatio: true,
        legend: {
            position: "right"
        },
        title: {
            display: false
        }
    }
});
