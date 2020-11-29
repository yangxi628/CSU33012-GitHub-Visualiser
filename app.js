// handleInput() -> main()
function handleInput() {
    var user = document.getElementById("user").value;
    var token = document.getElementById("token").value !== "" ? document.getElementById("token").value : undefined;

    main(user, token);
}

// getRequest(url:string) -> data:json
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

// main() -> create_sidebar(user_info:json)
async function main(user, token) {
    let url = `https://api.github.com/users/${user}`;
    let user_info = await getRequest(url, token).catch(error => console.error(error));

    create_sidebar(user_info);
}

// create_sidebar(user_info:json) -> Display Sidebar
function create_sidebar(user_info) {
    
    console.log('--------------------------------------------------------------------------------');
    console.log('Side bar information about the user');
    console.log(`avatar_url: ${user_info.avatar_url}`);
    console.log(`name: ${user_info.name}`);
    console.log(`login: ${user_info.login}`);
    console.log(`bio: ${user_info.bio}`);
    console.log(`hireable: ${user_info.hireable}`);
    console.log(`created_at: ${user_info.created_at}`);
    console.log(`followers: ${user_info.followers}`);
    console.log(`following: ${user_info.following}`);
    console.log(`location: ${user_info.location}`);
    console.log(`public_repos: ${user_info.public_repos}`);
    console.log('--------------------------------------------------------------------------------');

    let img = document.getElementById('img');
    img.src = user_info.avatar_url

    let name = document.getElementById('name');
    name.innerHTML = `<b>Name: </b>${user_info.name}`;

    let login = document.getElementById('login');
    login.innerHTML = `<b>Login ID: </b>${user_info.login}`;

    let bio = document.getElementById('bio');
    bio.innerHTML = `<b>Bio: </b>${user_info.bio == null ? 'User hasn\'t set a bio :(' : user_info.bio}`;

    let hireable = document.getElementById('hireable');
    hireable.innerHTML = `<b>Hireable: </b>${(user_info.hireable != null) ? 'Yes' : 'No'}`;

    let created_at = document.getElementById('created_at');
    created_at.innerHTML = `<b>Created On: </b>${user_info.created_at}`;

    let followers = document.getElementById('followers');
    followers.innerHTML = `<b>Followers: </b>${user_info.followers}`;

    let following = document.getElementById('following');
    following.innerHTML = `<b>Following: </b>${user_info.following}`;

    let location = document.getElementById('location');
    location.innerHTML = `<b>Location: </b>${user_info.location}`;

    let public_repos = document.getElementById('public_repos');
    public_repos.innerHTML = `<b>Public Repos: </b>${user_info.public_repos}`;
}