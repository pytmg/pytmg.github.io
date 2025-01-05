async function fetchRepos() {
    const response = await fetch('https://api.github.com/users/pytmg/repos');
    const repos = await response.json();
    const reposContainer = document.getElementById('repos');

    repos.forEach(repo => {
        const repoDiv = document.createElement('div');
        repoDiv.className = 'repo';

        const repoName = document.createElement('h2');
        repoName.textContent = `${repo.name}`;
        repoDiv.appendChild(repoName);

        const repoDescription = document.createElement('p');
        repoDescription.textContent = repo.description || 'No description available';
        repoDiv.appendChild(repoDescription);

        const repoLink = document.createElement('a');
        repoLink.href = repo.html_url;
        repoLink.textContent = 'View Repository';
        repoDiv.appendChild(repoLink);

        reposContainer.appendChild(repoDiv);
    });
}

fetchRepos();