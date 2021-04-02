window.onload = trackersPerWeek;

function trackersPerWeek() {

    var ctx = document.getElementById('week');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['https://Google.com', 'https://Facebook.com', 'https://Twitter.com', 'https://BBCNews.org.com', 'https://TikTok.com', 'https://Tumbler.com', 'https://Amazon.com', 'https://MedOverNet.com'],
            datasets: [{
                label: '8 Most common trackers in the last week',
                data: [84.00, 72.00, 40.00, 10.00, 66.000, 33.000, 45.000, 86.000],
                backgroundColor: [
                    'rgba(216, 27, 96, 0.6)',
                    'rgba(3, 169, 244, 0.6)',
                    'rgba(255, 152, 0, 0.6)',
                    'rgba(29, 233, 182, 0.6)',
                    'rgba(156, 39, 176, 0.6)',
                    'rgba(84, 110, 122, 0.6)'
                ],
                borderColor: [
                    'rgba(216, 27, 96, 1)',
                    'rgba(3, 169, 244, 1)',
                    'rgba(255, 152, 0, 1)',
                    'rgba(29, 233, 182, 1)',
                    'rgba(156, 39, 176, 1)',
                    'rgba(84, 110, 122, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            legend: {
                display: false
            },
            maintainAspectRatio: false,

            title: {
                display: true,
                text: '8 Most common trackers in the last week',
                position: 'top',
                fontSize: 30,
                fontFamily: 'Inconsolata , Arial, sans-serif',
                fontColor: "#333333",
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
    // Hana ta del kode skrbi za to da je stvar responsive. 

    var ctx = document.getElementById('month');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['https://Amazon.com', 'https://GitHub.com', 'https://StackOverflow.com', 'https://24ur.com', 'https://Facebook.com', 'https://Siol.si', 'https://Twitter.com', 'https://Feri.com'],
            datasets: [{
                label: '8 Most common trackers in the last month',
                data: [384.00, 172.00, 400.00, 100.00, 420.000, 69.000, 666.000, 1.000],
                backgroundColor: [
                    'rgba(216, 27, 96, 0.6)',
                    'rgba(3, 169, 244, 0.6)',
                    'rgba(255, 152, 0, 0.6)',
                    'rgba(29, 233, 182, 0.6)',
                    'rgba(156, 39, 176, 0.6)',
                    'rgba(84, 110, 122, 0.6)'
                ],
                borderColor: [
                    'rgba(216, 27, 96, 1)',
                    'rgba(3, 169, 244, 1)',
                    'rgba(255, 152, 0, 1)',
                    'rgba(29, 233, 182, 1)',
                    'rgba(156, 39, 176, 1)',
                    'rgba(84, 110, 122, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: true,
            legend: {
                display: false,
                //position: "bottom",
                //fontSize: 20
            },
            title: {
                display: true,
                text: '8 Most common trackers in the last month',
                position: 'top',
                fontSize: 30,
                fontFamily: 'Inconsolata , Arial, sans-serif',
                fontColor: "#333333",
            }
        }
    })

    var ctx = document.getElementById('domain');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['https://facebook.com', 'https://google.com', 'https://yahoo.com', 'https://amazon.de', 'https://google.si', 'https://amazon.de'],
            datasets: [{
                label: 'Trackers active on domain',
                data: [6, 7, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: true,
            legend: {
                position: "bottom",
                fontSize: 20
            },
            title: {
                display: true,
                text: '8 Most common trackers in the last month',
                position: 'top',
                fontSize: 30,
                fontFamily: 'Inconsolata , Arial, sans-serif',
                fontColor: "#333333",
            }
        }
    });

    var ctx = document.getElementById('frequent');
    var myChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: ['https://facebook.com', 'https://google.com', 'https://yahoo.com', 'https://amazon.de', 'https://google.si', 'https://amazon.de'],
            datasets: [{
                label: 'Most frequent trackers',
                data: [6, 7, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
                minBarLength: 6
            }]
        },
        options: {
            legend: {
                display: false
            },
            maintainAspectRatio: false,

            title: {
                display: true,
                text: 'Most frequent trackers',
                position: 'top',
                fontSize: 30,
                fontFamily: 'Inconsolata , Arial, sans-serif',
                fontColor: "#333333",
            },
            scales: {
                yAxes: [{
                    ticks: {
                        min: 2
                    }
                }]
            }
        }
    })
}