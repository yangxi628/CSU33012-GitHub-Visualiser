// handleInput() -> main(user:string)
function handleInput() {
    var user = document.getElementById("textBox").value;
    main(user);
}

// getRequest(url:string) -> data:json
async function getRequest(url) {
    const response = await fetch(url);
    let data = await response.json();
    return data;
}

// main(user:string)
async function main(user) {
    let url = `https://api.github.com/users/${user}/repos`;
    let repo = await GetRequest(url).catch(error => console.error(error));
}