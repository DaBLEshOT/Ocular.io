window.onload = trackersPerWeek;
function trackersPerWeek() {
    var ctx = document.getElementById('week');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["tracker1", "tracker2", "tracker3", "tracker4","tracker5","tracker6"],
            datasets: [{
                label: '6 Most common trackers in the last week',
                data: [84.00, 72.00, 40.00, 40.00, 66.000, 63.000],
                backgroundColor: [ 
                    'rgba(232,118,157,1)',  
                    'rgba(228,97,141,1)',
                    'rgba(225,75,126,1)',
                    'rgba(221,53,110,1)',
                    'rgba(213,36,96,1)',
                    'rgba(191,32,86,1)'
                ]
            }]
        },
        options: {
            legend: {
                display: false
            },
            maintainAspectRatio: false,

            title: {
                display: true,
                text: '6 most common trackers in the last week',
                position: 'top',
                fontSize: 20,
                fontFamily: 'Inconsolata , Arial',
                fontColor: "#000",
            },
            scales: {
                yAxes: [{
                    ticks: {
                        min: 0
                    }
                }]
            },
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    })

    document.getElementById("week").style.minHeight = "350px";


    var ctx = document.getElementById('month');
    var myChart = new Chart(ctx, {
        type: 'bar',
            data: {
                labels: ["tracker1", "tracker2", "tracker3", "tracker4","tracker5","tracker6"],
                datasets: [{
                    label: '6 Most common trackers in the last month',
                    data: [84.00, 72.00, 40.00, 40.00, 66.000, 63.000],
                backgroundColor: [
                    'rgba(254,242,162,1)',
                    'rgba(254,239,137,1)',
                    'rgba(254,235,111,1)',
                    'rgba(254,232,86,1)',
                    'rgba(254,229,61,1)',
                    'rgba(254,225,35,1)'
                ]
            }]
        },
        options: {
            legend: {
                display: false
            },
            maintainAspectRatio: true,

            scales: {
                yAxes: [{
                    ticks: {
                        min: 0
                    }
                }]
            },
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }],
            title: {
                display: true,
                text: '8 Most common trackers in the last month',
                position: 'top',
                fontSize: 20,
                fontFamily: 'Inconsolata , Arial, sans-serif',
                fontColor: "#000",
            }
        }
    })

    var ctx = document.getElementById('allTime');
    var myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ["tracker1", "tracker2", "tracker3", "tracker4","tracker5","tracker6"],
            datasets: [{
                label: 'Most frequent trackers',
                data: [6, 7, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(254,242,162,1)',
                    'rgba(254,239,137,1)',
                    'rgba(254,235,111,1)',
                    'rgba(254,232,86,1)',
                    'rgba(254,229,61,1)',
                    'rgba(254,225,35,1)'
                ]
            }]
        },
        options: {
            maintainAspectRatio: true,
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: '6 most frequently seen trackers off all time ',
                position: 'top',
                fontSize: 20,
                fontFamily: 'Inconsolata , Arial, sans-serif',
                fontColor: "#000"
            }
        }
    })
}