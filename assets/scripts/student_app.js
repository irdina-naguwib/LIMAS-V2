// Fetch user data from the previous login state
document.addEventListener('DOMContentLoaded', function() {
    const studentName = localStorage.getItem('loggedInUser');
    document.getElementById('student-name').textContent = studentName || 'Student';
});

// Go to Borang Permohonan Page
function goToApplicationForm() {
    window.location.href = 'borang_permohonan.html';
}

// Go to Semakan Pinjaman Page
function goToLoanCheck() {
    window.location.href = 'semakan_pinjaman.html';
}

// Log out and redirect to login page
function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
}
