// Load the logged-in user's name into the Butiran field
document.addEventListener('DOMContentLoaded', function() {
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInUser) {
        document.getElementById('butiran').value = loggedInUser;  // Auto-fill the butiran field
    } else {
        alert('No logged-in user found. Please log in.');
        window.location.href = 'login.html';  // Redirect to login page if no user is logged in
    }
});

document.getElementById('permohonanForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const tarikhPinjam = document.getElementById('tarikh_pinjam').value;
    const tarikhPulang = document.getElementById('tarikh_pemulangan').value;

    if (!tarikhPinjam || !tarikhPulang) {
        alert('Please select both borrow and return dates.');
        return;
    }

    // Store Tarikh Pinjam and Tarikh Pulang in localStorage
    localStorage.setItem('tarikhPinjam', tarikhPinjam);
    localStorage.setItem('tarikhPulang', tarikhPulang);

    // Proceed to the next page
    window.location.href = 'linen_selection.html';
});

// Navigation function to go back to the home page
function goToHome() {
    window.location.href = 'student_home.html';
}
