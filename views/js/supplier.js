  // Global variables for pagination and entries
  let currentPage = 1;
  let rowsPerPage = 5; // Default rows per page
  let totalSuppliers = 0; // Total number of suppliers
  let allSuppliers = []; // Store all suppliers for search and pagination

  // Add Supplier Modal
  const addSupplierForm = document.querySelector("#addItemModal .modal-form");
  const addModal = document.getElementById("addItemModal");
  const openAddModalButton = document.getElementById("openAddSupplierModal");
  const closeAddModalButton = document.getElementById("closeAddSupplierModal");

  // Open and Close Add Modal
  openAddModalButton.addEventListener("click", () => {
    addModal.style.display = "flex";
  });

  closeAddModalButton.addEventListener("click", () => {
    addModal.style.display = "none";
    addSupplierForm.reset(); // Clear the form when closing
  });

  // Handle Add Supplier Form Submission
  addSupplierForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const supplierNameInput = addSupplierForm.querySelector("input[placeholder='Supplier FullName']");
    const supplierContactInput = addSupplierForm.querySelector("input[placeholder='Contact Number']");
    const supplierAddressInput = addSupplierForm.querySelector("input[placeholder='Supplier Address']");
    const supplierStatusInput = addSupplierForm.querySelector("select");

    if (
      supplierNameInput.value.trim() === "" ||
      supplierContactInput.value.trim() === "" ||
      supplierAddressInput.value.trim() === "" ||
      supplierStatusInput.value === ""
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const supplierData = {
      supplier_name: supplierNameInput.value,
      contact_num: supplierContactInput.value,
      address: supplierAddressInput.value,
      supplier_status: supplierStatusInput.value,
    };

    try {
      const response = await fetch("/suppliers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(supplierData),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        fetchSuppliers(); // Refresh the supplier list
        addModal.style.display = "none"; // Close the modal
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error adding supplier:", error);
      alert("Failed to add supplier");
    }
  });

  // Fetch and Display Suppliers
  const fetchSuppliers = async (page = 1, perPage = rowsPerPage) => {
    try {
      const response = await fetch(`/suppliers?page=${page}&perPage=${perPage}`);
      const result = await response.json();
  
      allSuppliers = result.suppliers; // Store all suppliers for search and pagination
      totalSuppliers = result.total; // Update total suppliers count
  
      displayFilteredSuppliers(result.suppliers);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  // Display Suppliers
  const displayFilteredSuppliers = (suppliers) => {
    const supplierTableBody = document.querySelector(".supplier-table tbody");
    supplierTableBody.innerHTML = "";
  
    const start = (currentPage - 1) * rowsPerPage;
    const end = Math.min(start + rowsPerPage, suppliers.length);
  
    suppliers.forEach((supplier) => {
      const row = document.createElement("tr");
      row.innerHTML =
        `<td>${supplier.supplier_id}</td>
        <td>${supplier.supplier_name}</td>
        <td>${supplier.contact_num}</td>
        <td>${supplier.address}</td>
        <td>${supplier.supplier_status}</td>
        <td><i class="bx bx-edit" data-id="${supplier.supplier_id}"></i></td>`;
      supplierTableBody.appendChild(row);
    });
  
    // Update pagination info
    document.getElementById("showing-count").textContent = suppliers.length; // Showing the number of suppliers on current page
    document.getElementById("total-count").textContent = totalSuppliers; // Total suppliers
    document.getElementById("current-page").textContent = currentPage;
    document.getElementById("previous-page").disabled = currentPage === 1;
    document.getElementById("next-page").disabled = currentPage * rowsPerPage >= totalSuppliers;
  };

  // Pagination logic
  document.getElementById("previous-page").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      fetchSuppliers(currentPage, rowsPerPage);
    }
  });

  document.getElementById("next-page").addEventListener("click", () => {
    if (currentPage * rowsPerPage < totalSuppliers) {
      currentPage++;
      fetchSuppliers(currentPage, rowsPerPage);
    }
  });

  // Change rows per page dynamically
  document.getElementById("entries").addEventListener("change", function () {
    rowsPerPage = parseInt(this.value, 10);
    currentPage = 1; // Reset to first page
    fetchSuppliers(currentPage, rowsPerPage);
  });

  // Search Suppliers Dynamically
  const supplierSearchInput = document.getElementById('supplierSearch');

  supplierSearchInput.addEventListener('input', function () {
    const query = this.value.toLowerCase();

    const filteredSuppliers = allSuppliers.filter(supplier => {
      return (
        supplier.supplier_name.toLowerCase().includes(query) ||
        supplier.contact_num.toLowerCase().includes(query) ||
        supplier.address.toLowerCase().includes(query) ||
        supplier.supplier_status.toLowerCase().includes(query)
      );
    });

    totalSuppliers = filteredSuppliers.length;
    currentPage = 1;
    displayFilteredSuppliers(filteredSuppliers);
  });

  // Edit Supplier Modal
  const editModal = document.getElementById("editItemModal");
  const editForm = editModal.querySelector(".modal-form");
  const closeEditModalButton = document.getElementById("closeEditSupplierModal");

  // Close Edit Modal
  closeEditModalButton.addEventListener("click", () => {
    editModal.style.display = "none";
    editForm.reset();
  });

  // Handle Edit Button
  document.querySelector(".supplier-table tbody").addEventListener("click", async (e) => {
    if (e.target && e.target.classList.contains("bx-edit")) {
      const supplierId = e.target.dataset.id;

      try {
        const response = await fetch(`/suppliers/${supplierId}`);
        const supplier = await response.json();

        // Populate the edit modal
        editForm.dataset.id = supplierId;
        editForm.querySelector("input[placeholder='Supplier Name']").value = supplier.supplier_name;
        editForm.querySelector("input[placeholder='Contact Number']").value = supplier.contact_num;
        editForm.querySelector("input[placeholder='Supplier Address']").value = supplier.address;
        editForm.querySelector("select").value = supplier.supplier_status;

        editModal.style.display = "flex";
      } catch (error) {
        console.error("Error fetching supplier data:", error);
      }
    }
  });

  // Handle Edit Supplier Form Submission
  editForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const supplierId = editForm.dataset.id;
    const supplierData = {
      supplier_name: editForm.querySelector("input[placeholder='Supplier Name']").value,
      contact_num: editForm.querySelector("input[placeholder='Contact Number']").value,
      address: editForm.querySelector("input[placeholder='Supplier Address']").value,
      supplier_status: editForm.querySelector("select").value,
    };

    try {
      const response = await fetch(`/suppliers/${supplierId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(supplierData),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        fetchSuppliers(currentPage, rowsPerPage);
        editModal.style.display = "none";
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error updating supplier:", error);
    }
  });

  // Initialize
  fetchSuppliers(currentPage, rowsPerPage);
