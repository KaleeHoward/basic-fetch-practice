let allUsers = []; 


async function fetchUsers() {
    try {
        const response = await fetch('https://dan-collins-dev.github.io/dummy-data-fetching-repo/data/users.json');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        return data.results.map(user => ({
            name: `${user.firstName} ${user.lastName}`,
            yearsEmployed: '${user.yearsEmployed}'
        }));
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}


function createUserCard(user) {
    const card = document.createElement('div');
    card.classList.add('user-card');

    const image = document.createElement('img');
    image.alt = user.name;

    const name = document.createElement('h2');
    name.textContent = user.name;

    const years = document.createElement('p');
    years.classList.add('years-employed');
    years.textContent = `Years Employed: ${user.yearsEmployed}`;

    card.appendChild(image);
    card.appendChild(name);
    card.appendChild(years);

    return card;
}


function renderUsers(users) {
    const container = document.getElementById('card-container');
    container.innerHTML = ''; 

    users.forEach(user => {
        const card = createUserCard(user);
        container.appendChild(card); 
    });
}


document.getElementById('fetchAllBtn').addEventListener('click', async () => {
    allUsers = await fetchUsers(); 
    renderUsers(allUsers);
});


document.getElementById('filterBtn').addEventListener('click', () => {
    const filteredUsers = allUsers.filter(user => user.yearsEmployed < 10);
    renderUsers(filteredUsers);
});


document.getElementById('clearBtn').addEventListener('click', () => {
    const container = document.getElementById('card-container');
    container.innerHTML = ''; 
});