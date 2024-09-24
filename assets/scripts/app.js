document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const ic = document.getElementById('ic').value;
    const password = document.getElementById('password').value;
    
    // Load the JSON database
    fetch('data/database.json')
        .then(response => response.json())
        .then(data => {
            const user = data.users.find(user => user.ic === ic && user.password === password);

            if (user) {
                // Store the user's name in localStorage
                localStorage.setItem('loggedInUser', user.name);

                // Redirect based on role
                if (user.role === 'student') {
                    window.location.href = 'student_home.html';
                } else if (user.role === 'admin') {
                    window.location.href = 'admin_home.html';
                }
            } else {
                document.getElementById('error-message').textContent = 'Invalid credentials. Please try again.';
            }
        });
});
