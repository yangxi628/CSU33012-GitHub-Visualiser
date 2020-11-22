// handleInput() -> main(user:string, token:string)
function handleInput() {
    var user = document.getElementById("user").value;
    var token = document.getElementById("token").value !== "" ? document.getElementById("token").value : undefined;
    console.log(token);
    console.log(user)
    main(user, token);
}

// getRequest(url:string) -> data:json
async function getRequest(url) {
    const response = await fetch(url);
    let data = await response.json();
    return data;
}

// main(user:string, token:string)
async function main(user, token) {
    let url = `https://api.github.com/users/${user}/repos`;
    let repo = await getRequest(url).catch(error => console.error(error));

    console.log(repo)
}