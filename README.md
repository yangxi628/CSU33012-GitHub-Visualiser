# CSU33012 GitHub Visualiser

<!-- Badges -->

<!-- Badges -->

Integrating the **[GitHub REST API v3](https://developer.github.com/v3/)** to build a visualisation of the data available to elucidate an aspect of the software engineering process using the **[D3js](https://d3js.org)** library to visualise the data.

## Getting Started

## Prerequisites

The project requires **Docker** to be installed. Please see below the instructions for downloading Docker on your device:

* **[Windows](https://www.docker.com/products/docker-desktop)**
* **[Mac OS](https://www.docker.com/products/docker-desktop)**
* **[Ubuntu](https://docs.docker.com/engine/install/ubuntu/)**

For a less restricted access experience to the GitHub API, you will need an Auth Token which can be found in your **[settings](https://github.com/settings/tokens)**.

## Installation

To run this project you need to clone the repository:\
```git clone https://github.com/ahmedhamedaly/CSU33012-GitHub-Visualiser.git```\
```cd CSU33012-GitHub-Visualiser```

Build the Docker Image for the Server:\
```docker build -t github-visualiser .```

Run the following command to run the container server:\
```docker run -d --name github_visualiser -p 80:80 github-visualiser```

## Usage

To view the GitHub visualiser, visit:\
```localhost:80```

On the page there will be 2 user inputs, GitHub username and Auth Token. For a less restricted access experience of the GitHub API, you will need an Auth Token which can be found in your **[settings](https://github.com/settings/tokens)**. This will allow you (as the user) to not be restricted to 60 API calls (which equates to about 2-3 users depending on the amount of repositories they have) and instead be allowed 600 API calls which is plenty for testing out the visualiser.

To stop the container, we need to use the name we set ealier to the container, which is `github_visualiser` if you're following along. So all you have to do is:\
```docker stop github_visualiser```

## Demo
