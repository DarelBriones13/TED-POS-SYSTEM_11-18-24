$(document).ready(function () {
  // Load users into the table
  function loadUsers() {
    $.ajax({
      url: '/users/list',
      method: 'GET',
      success: function (users) {
        let rows = '';
        users.forEach((user, index) => {
          rows += `
            <tr data-id="${user.id}">
              <td>${index + 1}</td>
              <td>${user.name}</td>
              <td>${user.username}</td>
              <td>${user.userType}</td>
              <td>
                <button class="edit-btn"><i class="bx bxs-edit"></i></button>
                <button class="delete-btn"><i class="bx bxs-trash"></i></button>
              </td>
            </tr>`;
        });
        $('tbody').html(rows);
      }
    });
  }

  loadUsers(); // Initial load

  // Show the new user modal when the button is clicked
  $('.new-user-btn').click(function () {
    $('#newUserModal').show();
  });

  // Close the modals when the close button is clicked
  $('.close').click(function () {
    $(this).closest('.modal').hide();
  });

  // Add user
  $('#newUserForm').submit(function (e) {
    e.preventDefault();

    // Combine first name and last name into one "name" field
    const fullName = `${$('#fname').val()} ${$('#lname').val()}`;
    const formData = $(this).serializeArray();
    formData.push({ name: 'name', value: fullName });

    $.ajax({
      url: '/users',
      method: 'POST',
      data: $.param(formData),
      success: function (newUser) {
        alert('User successfully added!');

        const newRow = `
          <tr data-id="${newUser.id}">
            <td>${$('tbody tr').length + 1}</td>
            <td>${newUser.name}</td>
            <td>${newUser.username}</td>
            <td>${newUser.userType}</td>
            <td>
              <button class="edit-btn"><i class="bx bxs-edit"></i></button>
              <button class="delete-btn"><i class="bx bxs-trash"></i></button>
            </td>
          </tr>`;
          
        $('tbody').append(newRow);
        $('#newUserForm')[0].reset();
        $('#newUserModal').hide();
      }
    });
  });

  // Show user data in edit form when edit button is clicked
  $(document).on('click', '.edit-btn', function () {
    const id = $(this).closest('tr').data('id');

    // Fetch the user data and fill the form
    $.get(`/users/${id}`, function (user) {
      const [firstName, ...lastNameParts] = user.name.split(' ');
      const lastName = lastNameParts.join(' ');

      // Populate the edit form with the user's current data
      $('#editUserId').val(user.id);
      $('#editFname').val(firstName);  // Fixed: Use 'editFname' instead of 'editFirstName'
      $('#editLname').val(lastName);   // Fixed: Use 'editLname' instead of 'editLastName'
      $('#editUsername').val(user.username);
      $('#editUserType').val(user.userType);

      // Show edit modal with pre-filled data
      $('#editUserModal').show();
    }).fail(function() {
      alert("Error: Could not fetch user data.");
    });
  });

  // Save edited user data when update button is clicked
  $('#editUserForm').submit(function (e) {
    e.preventDefault();
  
    // Combine first name and last name into one "name" field
    const fullName = `${$('#editFname').val()} ${$('#editLname').val()}`;
    const id = $('#editUserId').val();
  
    const formData = {
      name: fullName,
      username: $('#editUsername').val(),
      password: $('#editPassword').val(), // Optional, if empty it should not overwrite the existing one
      userType: $('#editUserType').val(),
    };
  
    $.ajax({
      url: `/users/${id}`,
      method: 'PUT',
      data: formData,
      success: function (updatedUser) {
        alert('User successfully updated!');
  
        // Update the table row with new data
        const row = $(`tr[data-id="${updatedUser.id}"]`);
        row.find('td:nth-child(2)').text(updatedUser.name);
        row.find('td:nth-child(3)').text(updatedUser.username);
        row.find('td:nth-child(4)').text(updatedUser.userType);
  
        $('#editUserModal').hide();
      },
      error: function (xhr) {
        alert('Error updating user. Please try again.');
        console.error(xhr.responseJSON); // Log error response for debugging
      },
    });
  });
  

  // Delete user
  $(document).on('click', '.delete-btn', function () {
    const id = $(this).closest('tr').data('id');

    if (confirm('Are you sure you want to delete this user?')) {
      $.ajax({
        url: `/users/${id}`,
        method: 'DELETE',
        success: function () {
          alert('User successfully deleted!');
          $(`tr[data-id="${id}"]`).remove();
        }
      });
    }
  });

  // Search users dynamically
  $('#search').on('input', function () {
    const query = $(this).val().toLowerCase();

    $('tbody tr').each(function () {
      const name = $(this).find('td:nth-child(2)').text().toLowerCase();
      const username = $(this).find('td:nth-child(3)').text().toLowerCase();
      const userType = $(this).find('td:nth-child(4)').text().toLowerCase();

      if (name.includes(query) || username.includes(query) || userType.includes(query)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });
});
