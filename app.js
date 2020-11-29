// handleInput() -> main(user:string, token:string)
function handleInput() {
    var user = document.getElementById("user").value;
    var token = document.getElementById("token").value !== "" ? document.getElementById("token").value : undefined;

    main(user, token);
}

// getRequest(url:string, token:string) -> data:json
async function getRequest(url, token) {

    const headers = {
        'Authorization': `Token ${token}`
    }

    const response = (token == undefined) ? await fetch(url) : await fetch(url, {
        "method": "GET",
        "headers": headers
    });

    let data = await response.json();
    return data;
}

// main(user:string, token:string)
async function main(user, token) {
    let url = `https://api.github.com/users/${user}/repos`;

    let repo = await getRequest(url, token).catch(error => console.error(error));

    get_addition_deletion(repo, user, token);
    get_language_pie(repo, user, token);
    get_commits_polarArea(repo, user, token);
}

async function get_commits_polarArea(repo, user, token) {
    let label = [];
    let data = [];
    let backgroundColor = [];
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    for (i in repo) {
        let url = `https://api.github.com/repos/${user}/${repo[i].name}/commits?per_page=100`;
        let commits = await getRequest(url, token).catch(error => console.error(error));

        for (j in commits) {
            let date = commits[j].commit.author.date;

            var d = new Date(date);
            let day = days[d.getDay()];

            if (label.includes(day)) {
                for (i = 0; i < label.length; i++)
                    if (day == label[i])
                        data[i] += 1;

            } else {
                label.push(day);
                data.push(1);
                backgroundColor.push(`rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.2)`);
            }
        }

    }

    draw1('commits', 'polarArea', 'commits', `📊 ${user} Commits per Day 📊`, label, data, backgroundColor);
}

async function get_language_pie(repo, user, token) {
    let label = [];
    let data = [];
    let backgroundColor = [];

    for (i in repo) {
        let url = `https://api.github.com/repos/${user}/${repo[i].name}/languages`;
        let languages = await getRequest(url, token).catch(error => console.error(error));

        for (language in languages) {

            if (label.includes(language)) {
                for (i = 0; i < label.length; i++)
                    if (language == label[i])
                        data[i] = data[i] + languages[language];

            } else {
                label.push(language);
                data.push(languages[language]);
                backgroundColor.push(`rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.2)`);
            }
        }

    }

    draw2('language', 'pie', 'languages', `💭 ${user} Languages (in bytes) 💭`, label, data, backgroundColor);
}

async function get_addition_deletion(repos, user, token) {
    let label = [];
    let commits = [];
    let addition = [];
    let deletion = [];

    for (repo in repos) {
        let url = `https://api.github.com/repos/${user}/${repos[repo].name}/stats/contributors`;
        let stats = await getRequest(url, token).catch(error => console.log(error));
        label.push(repos[repo].name);
        for (stat in stats) {
            if (stats[stat].author.login == user) {
                commits[repo] = stats[stat].total;
                addition[repo] = 0;
                deletion[repo] = 0;
                for (ad in stats[stat].weeks) {

                    addition[repo] += stats[stat].weeks[ad].a + 0;
                    deletion[repo] -= stats[stat].weeks[ad].d + 0;
                }
            }
        }
    }

    label = label.filter((x, i) => commits[i], addition[i], deletion[i])
    commits = commits.filter(x => x != undefined)
    addition = addition.filter(x => x != undefined)
    deletion = deletion.filter(x => x != undefined)

    draw3('insertion', 'bar', 'line', '🧐 Additions, Deletions and Commits per Repository 🧐', label, commits, deletion, addition);
}

function draw1(ctx, type, datasetLabel, titleText, label, data, backgroundColor) {

    if (chart1 != null) chart1.destroy();

    let myChart = document.getElementById(ctx).getContext('2d');

    chart1 = new Chart(myChart, {
        type: type,
        data: {
            labels: label,
            datasets: [{
                label: datasetLabel,
                data: data,
                backgroundColor: backgroundColor,
                borderWidth: 1,
                borderColor: '#777',
                hoverBorderWidth: 2,
                hoverBorderColor: '#000'
            }],

        },
        options: {
            title: {
                display: true,
                text: titleText,
                fontSize: 20
            },
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    fontColor: '#000'
                }
            },
            layout: {
                padding: {
                    left: 50,
                    right: 0,
                    bottom: 0,
                    top: 0
                }
            },
            tooltips: {
                enabled: true
            }
        }
    });
}

function draw2(ctx, type, datasetLabel, titleText, label, data, backgroundColor) {

    if (chart2 != null) chart2.destroy();

    let myChart = document.getElementById(ctx).getContext('2d');

    chart2 = new Chart(myChart, {
        type: type,
        data: {
            labels: label,
            datasets: [{
                label: datasetLabel,
                data: data,
                backgroundColor: backgroundColor,
                borderWidth: 1,
                borderColor: '#777',
                hoverBorderWidth: 2,
                hoverBorderColor: '#000'
            }],

        },
        options: {
            title: {
                display: true,
                text: titleText,
                fontSize: 20
            },
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    fontColor: '#000'
                }
            },
            layout: {
                padding: {
                    left: 50,
                    right: 0,
                    bottom: 0,
                    top: 0
                }
            },
            tooltips: {
                enabled: true
            }
        }
    });
}

function draw3(ctx, type, type2, titleText, datasetLabel, dataset1, dataset2, dataset3) {
    if (chart3 != null) chart3.destroy();

    let myChart = document.getElementById(ctx).getContext('2d');

    chart3 = new Chart(myChart, {
        type: type,
        data: {
            labels: datasetLabel,
            datasets: [{
                type: type2,
                label: 'commits',
                borderColor: 'rgba(0, 0, 255, 0.2)',
                borderWidth: 1,
                hoverBorderWidth: 2,
                hoverBorderColor: '#000',
                fill: false,
                data: dataset1,
                yAxisID: 'y-axis-2'
            },
            {
                type: type,
                label: 'Deletetion',
                backgroundColor: 'rgba(255, 0, 0, 0.2)',
                data: dataset2,
                borderColor: 'white',
                borderWidth: 1,
                hoverBorderWidth: 2,
                hoverBorderColor: '#000',
                yAxisID: 'y-axis-1'
            },
            {
                type: type,
                label: 'insertion',
                backgroundColor: 'rgba(0, 255, 0, 0.2)',
                data: dataset3,
                borderWidth: 1,
                hoverBorderWidth: 2,
                hoverBorderColor: '#000',
                yAxisID: 'y-axis-1'
            }]

        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: titleText,
                textSize: 20
            }, 
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    fontColor: '#000'
                }
            },
            tooltips: {
                mode: 'index',
                intersect: true,
                enabled: true
            },
            scales: {
                yAxes: [{
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                }, {
                    type: 'linear', 
                    display: true,
                    position: 'right',
                    id: 'y-axis-2',

                    gridLines: {
                        drawOnChartArea: false, 
                    },
                }],
            }
        }
    });
}

var chart1 = null;
var chart2 = null;
var chart3 = null;