const APIURL = 'https://api.github.com/users/';

// Fetch element by ID
const form = document.getElementById('form');
const main = document.getElementById('main');

/**
 * Get user info
 * @param {*} userName
 * @returns
 */
async function getUser(userName) {
  try {
    const { data } = await axios(`${APIURL}${userName}`);
    createUserCard(data);
    getRepos(userName);
  } catch (err) {
    switch (err.status) {
      case 404: {
        createErrorCard(`${userName} is not the user you are looking for!`);
        break;
      }
      default:
        createErrorCard(`Oooopsies! ${err.message}`);
    }
    return err;
  }
}

/**
 * Get repos for the user
 * @param {} userName
 * @returns
 */
async function getRepos(userName) {
  try {
    const { data } = await axios(`${APIURL}${userName}/repos?sort=created`);
    addReposToCard(data);
  } catch (err) {
    switch (err.status) {
      case 404: {
        createErrorCard(`The hippo did not find any repos!`);
        break;
      }
      default:
        createErrorCard(`Oooopsies! ${err.message}`);
    }
    return err;
  }
}

function createErrorCard(msg) {
  const cardHTML = `
      <div class="card">
        ${msg}
      </div>
      `;
  main.innerHTML = cardHTML;
}

function createUserCard(user) {
  console.log(user);
  const cardHTML = `
      <div class="card">
        <img
          src="${user.avatar_url}"
          alt="${user.name}"
          class="avatar"
        />
        <div class="user-info">
          <h2>${user.name}</h2>
          <p>
            ${user.bio}
          </p>
          <ul>
            <li>${user.followers} <strong>Followers</strong></li>
            <li>${user.following} <strong>Following</strong></li>
            <li>${user.public_repos} <strong>Repos</strong></li>
          </ul>
          <div id="repos">
          </div>
        </div>
      </div>
      `;
  main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
  const reposEl = document.getElementById('repos');
  repos.slice(0, 10).forEach((repo) => {
    const repoEl = document.createElement('a');
    repoEl.classList.add('repo');
    repoEl.href = repo.html_url;
    repoEl.target = '_blank';
    repoEl.innerText = repo.name;
    reposEl.appendChild(repoEl);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const user = search.value;

  if (user) {
    getUser(user);
    search.value = '';
  }
});
