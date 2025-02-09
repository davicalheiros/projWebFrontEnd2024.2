document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
});

document.getElementById('userForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const userName = document.getElementById('userName').value;
    const userEmail = document.getElementById('userEmail').value;
    addUser(userName, userEmail);
    clearForm();
});

function addUser(name, email) {
    const user = {
        name: name,
        email: email,
        date: new Date().toLocaleString()
    };

    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    loadUsers();
}

function loadUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    users.forEach((user, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${user.date} - ${user.name} (${user.email})</span>
            <button onclick="deleteUser(${index})">Excluir</button>
        `;
        userList.appendChild(li);
    });
}

function deleteUser(index) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    loadUsers();
}

function deleteAllUsers() {
    localStorage.removeItem('users');
    loadUsers();
}

function clearForm() {
    document.getElementById('userName').value = '';
    document.getElementById('userEmail').value = '';
}

function searchUsers() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm) || 
        user.email.toLowerCase().includes(searchTerm)
    );

    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    filteredUsers.forEach((user, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${user.date} - ${user.name} (${user.email})</span>
            <button onclick="deleteUser(${index})">Excluir</button>
        `;
        userList.appendChild(li);
    });
}