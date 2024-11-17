let currentPage = 1;
let rowsPerPage = 5;
let totalCategories = 0;
let allCategories = [];
let originalCategories = [];

// Fetch categories and store them in the global variables
function fetchCategories() {
  fetch("/categories/list")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error fetching categories");
      }
      return response.json();
    })
    .then((data) => {
      originalCategories = data;
      allCategories = [...originalCategories];
      totalCategories = allCategories.length;
      displayPage(currentPage);
    })
    .catch((error) => {
      console.error("Error fetching categories:", error);
      alert(error.message);
    });
}

// Display a specific page of categories
function displayPage(page) {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  const start = (page - 1) * rowsPerPage;
  const end = Math.min(start + rowsPerPage, totalCategories);

  for (let i = start; i < end; i++) {
    const category = allCategories[i];
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${i + 1}</td>
      <td>${category.category_name}</td>
      <td>${category.category_description}</td> <!-- Displaying Description -->
      <td>
        <i class="bx bx-edit-alt edit-icon" data-id="${category.category_id}"></i>
      </td>
    `;
    tbody.appendChild(row);
  }

  document.getElementById("pagination-info").textContent = `Showing ${start + 1} to ${end} of ${totalCategories} entries`;

  document.getElementById("prev-button").disabled = page === 1;
  document.getElementById("next-button").disabled = end === totalCategories;
}

// Event listener for pagination buttons
document.getElementById("prev-button").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayPage(currentPage);
  }
});

document.getElementById("next-button").addEventListener("click", () => {
  if (currentPage * rowsPerPage < totalCategories) {
    currentPage++;
    displayPage(currentPage);
  }
});

// Change rows per page dynamically
document.getElementById("entries-count").addEventListener("change", function () {
  rowsPerPage = parseInt(this.value, 10);
  currentPage = 1;
  displayPage(currentPage);
});

// Search functionality
document.getElementById("search").addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();

  if (searchTerm) {
    allCategories = originalCategories.filter(
      (category) =>
        category.category_name.toLowerCase().includes(searchTerm) ||
        category.category_description.toLowerCase().includes(searchTerm)
    );
  } else {
    allCategories = [...originalCategories];
  }

  totalCategories = allCategories.length;
  currentPage = 1;
  displayPage(currentPage);
});

// Show the Add Category Modal
document.getElementById("openCategoryModalBtn").onclick = function () {
  document.getElementById("addCategoryModal").classList.remove("hidden");
};

// Close modal when the close button is clicked
document.getElementById("closeCategoryModalBtn").onclick = function () {
  document.getElementById("addCategoryModal").classList.add("hidden");
};

// Cancel button action
document.getElementById("cancelAdd").onclick = function () {
  document.getElementById("addCategoryModal").classList.add("hidden");
};

// Handle form submission for saving a new category
document.getElementById("categoryForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const categoryName = document.getElementById("category-name").value;
  const categoryDescription = document.getElementById("category-description").value;

  fetch("/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      category_name: categoryName,
      category_description: categoryDescription, // Include description here
    }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          throw new Error(data.message || "Error occurred");
        });
      }
      return response.json();
    })
    .then((data) => {
      alert("Category saved successfully!");
      document.getElementById("category-name").value = "";
      document.getElementById("category-description").value = ""; // Clear description
      document.getElementById("addCategoryModal").classList.add("hidden");
      fetchCategories();
    })
    .catch((error) => {
      console.error("Error saving category:", error);
      alert(error.message);
    });
});

// Fetch categories on initial load
fetchCategories();

// Handle the edit category functionality
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("edit-icon")) {
    const categoryId = e.target.getAttribute("data-id");
    const category = allCategories.find(cat => cat.category_id == categoryId);

    if (category) {
      document.getElementById("edit-category-id").value = category.category_id;
      document.getElementById("edit-category-name").value = category.category_name;
      document.getElementById("edit-category-description").value = category.category_description; // Set description for edit

      document.getElementById("editModal").classList.remove("hidden");
    }
  }
});

// Close edit modal
document.getElementById("closeModal").onclick = function () {
  document.getElementById("editModal").classList.add("hidden");
};

// Cancel edit button action
document.getElementById("cancelEdit").onclick = function () {
  document.getElementById("editModal").classList.add("hidden");
};

// Handle form submission for updating an existing category
document.getElementById("editCategoryForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const categoryId = document.getElementById("edit-category-id").value;
  const categoryName = document.getElementById("edit-category-name").value;
  const categoryDescription = document.getElementById("edit-category-description").value; // Get edited description

  fetch(`/categories/${categoryId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      category_name: categoryName,
      category_description: categoryDescription, // Include updated description
    }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          throw new Error(data.message || "Error occurred");
        });
      }
      return response.json();
    })
    .then((data) => {
      alert("Category updated successfully!");
      document.getElementById("editModal").classList.add("hidden");
      fetchCategories();
    })
    .catch((error) => {
      console.error("Error updating category:", error);
      alert(error.message);
    });
});
