// handleInput() -> main(user:string, token:string)
function handleInput() {
    var user = document.getElementById("user").value;
    var token = document.getElementById("token").value !== "" ? document.getElementById("token").value : undefined;
    
    main(user, token);
}

// getRequest(url:string, token:string) -> data:json
async function getRequest(url, token) {

    const headers = {
        'Authorization':`Token ${token}`
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

    console.log(repo)
}