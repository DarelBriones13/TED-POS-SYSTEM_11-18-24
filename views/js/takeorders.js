// Function to open the modal
function openModal() {
    const modal = document.getElementById('paymentModal');
    modal.classList.add('show');
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById('paymentModal');
    modal.classList.remove('show');
}

// Function to submit the payment and calculate the change
function submitPayment() {
    const amountPayable = parseFloat(document.getElementById('amountPayable').value.replace('₱', ''));
    const amountTendered = parseFloat(document.getElementById('amountTendered').value);
    const changeField = document.getElementById('change');

    if (isNaN(amountTendered) || amountTendered < amountPayable) {
        alert('Amount tendered is less than the payable amount.');
        return;
    }

    const change = amountTendered - amountPayable;
    changeField.value = '₱' + change.toFixed(2);
    alert('Payment Successful!');
    closeModal();
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    const saveBtn = document.querySelector('.save-btn');
    const cancelBtn = document.querySelector('.cancel-btn');
    const submitBtn = document.querySelector('.submit-payment-btn');

    // Open modal on save button click
    saveBtn.addEventListener('click', openModal);

    // Close modal on cancel button click
    cancelBtn.addEventListener('click', closeModal);

    // Submit payment on submit button click
    submitBtn.addEventListener('click', submitPayment);
});

// Function to close the modal
function closeModal() {
    const modal = document.getElementById('paymentModal');
    modal.classList.remove('show');  // Ensure this class matches the one used in CSS
}

// Event listener for the Cancel button
document.addEventListener('DOMContentLoaded', function() {
    const saveBtn = document.querySelector('.save-btn');
    const cancelBtn = document.querySelector('.cancel-btn');
    const submitBtn = document.querySelector('.submit-payment-btn');

    // Open modal on save button click
    saveBtn.addEventListener('click', function() {
        document.getElementById('paymentModal').classList.add('show');
    });

    // Close modal on cancel button click
    cancelBtn.addEventListener('click', closeModal);

    // Submit payment on submit button click
    submitBtn.addEventListener('click', function() {
        const amountPayable = parseFloat(document.getElementById('amountPayable').value.replace('₱', ''));
        const amountTendered = parseFloat(document.getElementById('amountTendered').value);
        const changeField = document.getElementById('change');

        if (isNaN(amountTendered) || amountTendered < amountPayable) {
            alert('Amount tendered is less than the payable amount.');
            return;
        }

        const change = amountTendered - amountPayable;
        changeField.value = '₱' + change.toFixed(2);
        alert('Payment Successful!');
        closeModal();
    });
});
