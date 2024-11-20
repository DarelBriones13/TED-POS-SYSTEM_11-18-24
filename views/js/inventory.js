$(document).ready(function() {
  // Show Add Item modal and initialize Select2
  const addButton = document.querySelector(".add-btn");
  const addModal = document.getElementById("addItemModal");
  const editModal = document.getElementById("editItemModal");

  addButton.addEventListener("click", async () => {
    addModal.style.display = "flex";
    initializeSelect2(addModal); // Initialize Select2 for the Add Modal
  });

  // Hide Add Item modal
  const closeAddButton = addModal.querySelector(".close-btn");
  closeAddButton.addEventListener("click", () => {
    addModal.style.display = "none";
  });

  // Hide Edit Item modal
  const closeEditButton = editModal.querySelector(".close-btn");
  closeEditButton.addEventListener("click", () => {
    editModal.style.display = "none";
  });

  // Function to initialize Select2 for modal dropdowns
  function initializeSelect2(modal) {
    const supplierSelect = $(modal).find('#addSupplierName, #editSupplierName'); // Find both supplier dropdowns
    const categorySelect = $(modal).find('#addCategories, #editCategories'); // Find both category dropdowns

    // Fetch categories and populate the dropdown
    fetch('/categories/list')
      .then(response => response.json())
      .then(categories => {
        categorySelect.empty();
        categorySelect.append('<option value="">Select Category</option>');
        categories.forEach(category => {
          categorySelect.append(`<option value="${category.category_id}">${category.category_name}</option>`);
        });
      })
      .catch(error => console.error("Error fetching categories:", error));

    // Fetch suppliers and populate the dropdown
    fetch('/suppliers')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          supplierSelect.empty();
          supplierSelect.append('<option value="">Select Supplier</option>');
          data.forEach(supplier => {
            supplierSelect.append(`<option value="${supplier.supplier_id}">${supplier.supplier_name}</option>`);
          });
        } else {
          console.error('Received data is not an array:', data); 
          alert('Error: Unable to load suppliers. Please try again later.');
        }
      })
      .catch(error => console.error("Error fetching suppliers:", error));

    // Initialize Select2 for the dropdowns
    supplierSelect.select2();
    categorySelect.select2();
  }

  // Handle form submission for adding an item
  $('#addItemForm').submit(function(e) {
    e.preventDefault();

    // Create a new FormData object from the form
    const formData = new FormData(this); // This includes all form fields and the file

    $.ajax({
      url: '/inventory', // Adjust the URL to your route for adding inventory and product
      method: 'POST',
      data: formData,
      processData: false, // Prevent jQuery from automatically transforming the data into a query string
      contentType: false, // Set content type to false to let jQuery set it correctly
      success: function(response) {
        alert(response.message);
        addModal.style.display = "none"; // Hide the modal
        fetchInventoryData(); // Fetch updated inventory data after adding the item
      },
      error: function(xhr) {
        alert('Error adding item: ' + xhr.responseJSON.error);
      }
    });
  });

  // Pagination variables
  let currentPage = 1;
  let rowsPerPage = 3; // Default value
  let totalItems = 0;
  let allItems = [];
  let originalItems = [];

  // Fetch and display inventory data
  function fetchInventoryData() {
    $.ajax({
      url: '/inventories/list', // Adjust the URL to your route for fetching inventory
      method: 'GET',
      success: function(data) {
        originalItems = data;
        allItems = [...originalItems];
        totalItems = allItems.length;
        displayPage(currentPage);
      },
      error: function(xhr) {
        alert('Error fetching inventory data: ' + xhr.responseText);
      }
    });
  }

  // Display a specific page of inventory items ```javascript
  function displayPage(page) {
    const inventoryList = $('#inventoryList');
    inventoryList.empty(); // Clear existing rows

    const start = (page - 1) * rowsPerPage;
    const end = Math.min(start + rowsPerPage, totalItems);

    for (let i = start; i < end; i++) {
      const item = allItems[i];
      const row = `
        <tr>
          <td>${item.inventory_id}</td>
          <td>${item.product.product_name}</td>
          <td>${item.product.product_model}</td>
          <td>${item.Supplier.supplier_name}</td>
          <td>${new Date(item.date_received).toLocaleDateString()}</td>
          <td>${item.stocks}</td>
          <td>${item.inventory_status}</td>
          <td>
            <i class="bx bx-show"></i>
            <i class="bx bx-edit" data-id="${item.inventory_id}"></i>
          </td>
        </tr>
      `;
      inventoryList.append(row);
    }

    document.getElementById("pagination-info").textContent = `Showing ${start + 1} to ${end} of ${totalItems} entries`;
    document.getElementById("prev-button").disabled = page === 1;
    document.getElementById("next-button").disabled = end === totalItems;
  }

  // Event listener for pagination buttons
  document.getElementById("prev-button").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayPage(currentPage);
    }
  });

  document.getElementById("next-button").addEventListener("click", () => {
    if (currentPage * rowsPerPage < totalItems) {
      currentPage++;
      displayPage(currentPage);
    }
  });

  // Change rows per page dynamically
  $('#entries').change(function () {
    rowsPerPage = parseInt(this.value, 10);
    currentPage = 1;
    displayPage(currentPage);
  });

  // Search functionality
  $('#search').on('input', function () {
    const searchTerm = this.value.toLowerCase();

    if (searchTerm) {
      allItems = originalItems.filter(item =>
        item.product.product_name.toLowerCase().includes(searchTerm) ||
        item.product.product_model.toLowerCase().includes(searchTerm) ||
        item.Supplier.supplier_name.toLowerCase().includes(searchTerm)
      );
    } else {
      allItems = [...originalItems];
    }

    totalItems = allItems.length;
    currentPage = 1;
    displayPage(currentPage);
  });

  // Show Edit Item modal and populate data
  $(document).on('click', '.bx-edit', function() {
    const inventoryId = $(this).data('id');

    // Fetch the inventory item details
    fetch(`/inventories/${inventoryId}`)
        .then(response => response.json())
        .then(data => {
            $('#editProductName').val(data.product.product_name);
            $('#editProductModel').val(data.product.product_model);
            $('#editStock').val(data.stocks);
            $('#editDateReceived').val(new Date(data.date_received).toISOString().split('T')[0]);
            $('#editStatus').val(data.inventory_status);
            $('#editPurchasePrice').val(data.product.purchase_price);
            $('#editSellingPrice').val(data.product.selling_price);

            // Set the product ID in the hidden input field
            $('#editProductId').val(data.product.product_id); // Ensure this is correct

            $('#editItemForm').data('id', inventoryId); // Store the inventory ID
            editModal.style.display = "flex"; // Show the modal
            initializeSelect2(editModal); // Initialize Select2
        })
        .catch(error => console.error("Error fetching inventory details:", error));
  });

  // Handle form submission for editing an item
  $('#editItemForm').submit(function(e) {
    e.preventDefault();

    const inventoryId = $(this).data('id'); // Get the inventory ID from the form
    const formData = new FormData(this); // This includes all form fields

    $.ajax({
      url: `/inventory/${inventoryId}`, // Adjust the URL to your route for updating inventory and product
      method: 'PUT',
      data: formData,
      processData: false,
      contentType: false,
      success: function(response) {
        alert(response.message);
        editModal.style.display = "none"; // Hide the modal
        fetchInventoryData(); // Fetch updated inventory data
      },
      error: function(xhr) {
        alert('Error updating item: ' + xhr.responseJSON.error);
      }
    });
  });

  // Call the function to fetch inventory data when the page loads
  fetchInventoryData();
});