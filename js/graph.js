$("#graphSectionBtn").click(() => {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#graphSection").offset().top
    }, 500);
});

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
            scaleBtn.text("Switch to week");
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
            scaleBtn.text("Switch to month");
            break;
    }
    scaleBtn.toggleClass("btn-demo").toggleClass("btn-learn");
    barChart.update();
}

let scaleBtn = $("#scale");
scaleBtn.click(changeScale);
let scale = "month";

const limit = 6;

let month;
let week;
let barChart = new Chart($("#week"), {
    type: 'bar',
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

let doughnutChart = new Chart($("#allTime"), {
    type: "doughnut",
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

const storage = new Storage();
storage.openDatabase().then(() => {
    const utils = new Utils(storage);

    utils.trackersPastWeek().then((data) => {
        week = data;
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
        barChart.update();
    });

    utils.trackersPastMonth().then((data) => {
        month = data;
    });

    utils.allTimePercentage().then((data) => {
        doughnutChart.data = {
            labels: data.chart.labels.slice(0, limit),
            datasets: [{
                data: data.chart.data.slice(0, limit),
                backgroundColor: [
                    'rgba(254,225,35,1)',
                    'rgba(254,239,137,1)',
                    'rgba(254,232,86,1)',
                    'rgba(254,242,162,1)',
                    'rgba(254,229,61,1)',
                    'rgba(254,235,111,1)'
                ],
                borderWidth: 0
            }]
        };
        doughnutChart.update();
    });
});
