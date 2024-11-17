document.addEventListener("DOMContentLoaded", function () {
    // Ensure both modals are hidden on page load
    const newUserModal = document.getElementById("newUserModal");
    const editUserModal = document.getElementById("editUserModal");

    newUserModal.style.display = "none";
    editUserModal.style.display = "none";

    // Get the button that opens the new user modal
    const newUserBtn = document.querySelector(".new-user-btn");

    // Get the <span> element that closes the modal for both new user and edit user modals
    const closeBtns = document.querySelectorAll(".close");

    // Get the cancel buttons for both modals
    const cancelBtns = document.querySelectorAll(".cancel-btn");

    // When the user clicks the new user button, open the new user modal
    newUserBtn.onclick = function () {
        newUserModal.style.display = "flex"; // Display the modal when the button is clicked
    };

    // Close modals when clicking on <span> (x) or cancel buttons
    closeBtns.forEach((span) => {
        span.onclick = function () {
            newUserModal.style.display = "none"; // Hide new user modal
            editUserModal.style.display = "none"; // Hide edit user modal
        };
    });

    cancelBtns.forEach((btn) => {
        btn.onclick = function () {
            newUserModal.style.display = "none"; // Hide new user modal
            editUserModal.style.display = "none"; // Hide edit user modal
        };
    });

    // Close the modal when clicking outside of it
    window.onclick = function (event) {
        if (event.target == newUserModal || event.target == editUserModal) {
            newUserModal.style.display = "none";
            editUserModal.style.display = "none";
        }
    };

    // Handle the edit user modal open when clicking edit buttons
    document.querySelectorAll('.edit-btn').forEach((editBtn) => {
        editBtn.addEventListener('click', function () {
            const row = this.closest('tr');
            const userId = row.children[0].innerText;
            const userName = row.children[1].innerText;
            const userUsername = row.children[2].innerText;
            const userType = row.children[3].innerText;
    
            // Pre-fill the form with user data
            document.getElementById('editUserId').value = userId;
            document.getElementById('editFname').value = userName.split(' ')[0]; // First name
            document.getElementById('editLname').value = userName.split(' ').slice(1).join(' '); // Last name
            document.getElementById('editUsername').value = userUsername;
            document.getElementById('editUserType').value = userType;
    
            // Open edit modal
            editUserModal.style.display = 'flex'; // Use 'flex' for proper display
        });
    });
    

    // Handle form submission (for edit user form)
    const editUserForm = document.getElementById('editUserForm');
    editUserForm.onsubmit = function (e) {
        e.preventDefault();
    
        // Combine first name and last name into one "name" field
        const fullName = `${document.getElementById('editFname').value} ${document.getElementById('editLname').value}`;
        
        const data = {
            id: document.getElementById('editUserId').value,
            name: fullName, // Combine first and last names
            username: document.getElementById('editUsername').value,
            password: document.getElementById('editPassword').value, // Optional
            userType: document.getElementById('editUserType').value
        };
    
        // Log the updated user data for debugging
        console.log('Updated user data:', data);
    
        // Handle form submission logic (e.g., via AJAX or backend API)
        $.ajax({
            url: `/users/${data.id}`,
            method: 'PUT',
            data: data,
            success: function (updatedUser) {
    
                // Update the row in the table with the new data
                const row = $(`tr[data-id="${updatedUser.id}"]`);
                row.find('td:nth-child(2)').text(updatedUser.name);
                row.find('td:nth-child(3)').text(updatedUser.username);
                row.find('td:nth-child(4)').text(updatedUser.userType);
    
                // Close the modal after successful update
                editUserModal.style.display = 'none';
            },
            error: function (xhr) {
                alert('Error updating user. Please try again.');
                console.error(xhr.responseJSON); // Log the error response for debugging
            }
        });
    };    
});
