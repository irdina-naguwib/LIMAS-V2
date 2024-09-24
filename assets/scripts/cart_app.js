document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.querySelector('#cart-items-table tbody');
    const loggedInUser = localStorage.getItem('loggedInUser');  // Fetch the logged-in user
    const cart = JSON.parse(localStorage.getItem('cart')) || [];  // Fetch the cart from localStorage
    const tarikhPinjam = localStorage.getItem('tarikhPinjam');  // Fetch Tarikh Pinjam
    const tarikhPulang = localStorage.getItem('tarikhPulang');  // Fetch Tarikh Pulang

    // Check if cart is empty
    if (cart.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="4">Your cart is empty.</td></tr>';
        return;
    }

    // Fill in user details and borrowed items
    cart.forEach(item => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${loggedInUser}</td>
            <td>${tarikhPinjam ? tarikhPinjam : 'Not set'}</td>
            <td>${tarikhPulang ? tarikhPulang : 'Not set'}</td>
            <td>${item.name} (${item.code})</td>
        `;

        tableBody.appendChild(row);
    });
});

// Function to submit the cart and go to semakan pinjaman page
function submitCart() {
    const tarikhPinjam = localStorage.getItem('tarikhPinjam');
    const tarikhPulang = localStorage.getItem('tarikhPulang');

    if (!tarikhPinjam || !tarikhPulang) {
        alert('Please make sure both borrow and return dates are set.');
        return;
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const loggedInUser = localStorage.getItem('loggedInUser');

    // Prepare the borrow data for submission
    const borrowData = {
        butiran: loggedInUser,
        tarikh_pinjam: tarikhPinjam,
        tarikh_pulang: tarikhPulang,
        items_borrowed: cart,
        status: "pending",
        approver: null,
        approval_date: null
    };

    // Send the data to the backend using fetch (assuming /api/borrowed-items is available)
    fetch('/api/borrowed-items/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(borrowData)
    })
    .then(response => response.json())
    .then(data => {
        alert('Your request has been submitted.');
        localStorage.removeItem('cart');  // Clear the cart after submission
        window.location.href = 'semakan_pinjaman.html';  // Redirect to semakan pinjaman page
    })
    .catch(error => {
        console.error('Error submitting request:', error);
    });
}

// Navigation to home page
function goToHome() {
    window.location.href = 'student_home.html';
}

// Navigation to home page
function linenSelect() {
    window.location.href = 'linen_selection.html';
}
