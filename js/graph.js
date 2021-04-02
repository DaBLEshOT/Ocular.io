function changeScale() {
    switch (scale) {
        case "month":
            scale = "week";
            barChart.data = {
                labels: limitedMonthLabels,
                datasets: [{
                    label: '6 Most common trackers in the last month',
                    data: limitedWeekData,
                    backgroundColor: monthColors
                }]
            };
            barChart.options.title.text = '6 most common trackers in the last month';
            break;
        case "week":
        default:
            scale = "month";
            barChart.data = {
                labels: limitedWeekLabels,
                datasets: [{
                    label: '6 Most common trackers in the last week',
                    data: limitedWeekData,
                    backgroundColor: weekColors
                }]
            };
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

let limitedWeekLabels = week.chart.labels.slice(0, limit);
let limitedWeekData = week.chart.data.slice(0, limit);

let weekColors = [
    'rgba(225,75,126,1)',
    'rgba(213,36,96,1)',
    'rgba(232,118,157,1)',
    'rgba(221,53,110,1)',
    'rgba(191,32,86,1)',
    'rgba(228,97,141,1)'
];

let month = await utils.trackersPastMonth();

let limitedMonthLabels = month.chart.labels.slice(0, limit);
let limitedMonthData = month.chart.data.slice(0, limit);

let monthColors = [
    'rgba(254,235,111,1)',
    'rgba(254,239,137,1)',
    'rgba(254,232,86,1)',
    'rgba(254,242,162,1)',
    'rgba(254,225,35,1)',
    'rgba(254,229,61,1)'
];

let ctx = $("#week");
let barChart = new Chart(ctx, {
    type: 'bar',
    data: {
        label: '6 Most common trackers in the last week ',
        labels: limitedWeekLabels,
        datasets: [{ data: limitedWeekData, backgroundColor: weekColors }]
    },
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

let limitedPercentLabels = percent.chart.labels.slice(0, limit);
let limitedPercentData = percent.chart.data.slice(0, limit);

let percentColors = [
    'rgba(254,242,162,1)',
    'rgba(254,239,137,1)',
    'rgba(254,235,111,1)',
    'rgba(254,232,86,1)',
    'rgba(254,229,61,1)',
    'rgba(254,225,35,1)'
];

let ctx2 = $("#allTime");
let doughnutChart = new Chart(ctx2, {
    type: "doughnut",
    data: {
        labels: limitedPercentLabels,
        datasets: [{ data: limitedPercentData, backgroundColor: percentColors, borderWidth: 0 }]
    },
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
