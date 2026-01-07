// This tells the browser to watch the button
document.addEventListener('DOMContentLoaded', () => {
    const confirmBtn = document.querySelector('.btn-confirm');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', (e) => {
            e.preventDefault(); 
            handleOrderConfirmation();
        });
    }
});

function handleOrderConfirmation() {
    // 1. Get Values using the new IDs
    const fullName = document.getElementById('full_name')?.value;
    const phone = document.getElementById('phone_number')?.value;
    const wilaya = document.getElementById('wilaya-select')?.value; // Matching your select ID
    const deliveryType = document.querySelector('.toggle-btn.active')?.innerText;
    const address = document.querySelector('textarea')?.value;
    
    // Total price fix: your HTML uses a span inside .summary-total, not an ID
    const total = document.querySelector('.summary-total span:last-child')?.innerText;

    // 2. Validation
    if (!fullName || fullName.trim() === "" || !phone || phone.trim() === "") {
        alert("Please enter your Name and Phone number.");
        return;
    }

    const orderData = {
        customer: fullName,
        phone: phone,
        address: address,
        date: new Date().toLocaleString()
    };

    // 2. Save to Firebase (database is defined in checkout.html)
    if (typeof firebase !== 'undefined') {
        firebase.database().ref('orders').push(orderData)
            .then(() => { window.location.href = 'success.html'; })
            .catch((err) => { alert("Firebase Error: " + err.message); });
    }
}
