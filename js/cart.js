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
    // 1. Collect Data
    const fullName = document.querySelector('input[placeholder*="Full Name"]')?.value;
    const phone = document.querySelector('input[placeholder*="05"]')?.value;
    const address = document.querySelector('textarea')?.value;

    if (!fullName || !phone) {
        alert("Please enter Name and Phone");
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
