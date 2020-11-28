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
    console.log(repo);
    get_commits_histogram(repo, user, token);
    get_language_pie(repo, user, token);
}

async function get_commits_histogram(repo, user, token) {
    let label = [];
    let data = [];
    let backgroundColor = [];

    for (i in repo) {
        let reponame = repo[i].name;
        let url = `https://api.github.com/repos/${user}/${repo[i].name}/commits?per_page=100`;
        let commits = await getRequest(url, token).catch(error => console.error(error));
        console.log(reponame);

        label.push(reponame);
        data.push(commits.length);
        backgroundColor.push(`rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.2)`);
    }
    
    draw1('commits', 'polarArea', 'languages', `${user} Languages (in bytes)`, label, data, backgroundColor);
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
    
    draw2('myChart', 'pie', 'languages', `${user} Languages (in bytes)`, label, data, backgroundColor);
}

function draw1(ctx, type, datasetLabel, titleText, label, data, backgroundColor) {  

    if(chart1 != null) chart1.destroy();
    
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

    if(chart2 != null) chart2.destroy();
    
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


var chart1 = null;
var chart2 = null;