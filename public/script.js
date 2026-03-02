const apiUrl = 'http://localhost:5000/api';
const responseArea = document.getElementById('responseArea');

function displayResponse(data) {
    responseArea.textContent = JSON.stringify(data, null, 2);
}

// Register
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    try {
        const res = await fetch(`${apiUrl}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        const data = await res.json();
        displayResponse(data);
    } catch (err) {
        displayResponse({ error: err.message });
    }
});

// Login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const res = await fetch(`${apiUrl}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (data.token) {
            localStorage.setItem('token', data.token);
            data.message = "Successfully logged in. Token saved to localStorage.";
        }
        displayResponse(data);
    } catch (err) {
        displayResponse({ error: err.message });
    }
});

// Test Protected Route
document.getElementById('testBtn').addEventListener('click', async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        displayResponse({ error: "No token found in localStorage. Please login first." });
        return;
    }

    try {
        const res = await fetch(`${apiUrl}/protected`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        displayResponse(data);
    } catch (err) {
        displayResponse({ error: err.message });
    }
});
