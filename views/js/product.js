$(document).ready(function() {
    // Fetch and display product data
    function fetchProductData() {
      $.ajax({
        url: '/products/list', // Adjust the URL to your route for fetching products
        method: 'GET',
        success: function(data) {
          originalProducts = data;
          allProducts = [...originalProducts];
          totalProducts = allProducts.length;
          displayPage(currentPage);
        },
        error: function(xhr) {
          alert('Error fetching product data: ' + xhr.responseText);
        }
      });
    }
  
    // Pagination variables
    let currentPage = 1;
    let rowsPerPage = 3; // Default value
    let totalProducts = 0;
    let allProducts = [];
    let originalProducts = [];
  
    // Display a specific page of products
    function displayPage(page) {
      const productList = $('#productList');
      productList.empty(); // Clear existing rows
  
      const start = (page - 1) * rowsPerPage;
      const end = Math.min(start + rowsPerPage, totalProducts);
  
      for (let i = start; i < end; i++) {
        const product = allProducts[i];
        const row = `
          <tr>
            <td>${product.product_id}</td>
            <td>${product.category ? product.category.category_name : 'N/A'}</td>
            <td>${product.product_name}</td>
            <td>${product.product_model}</td>
            <td>${product.selling_price}</td>
            <td>${product.product_quantity}</td>
            <td>${product.product_status || 'Active'}</td>
          </tr>
        `;
        productList.append(row);
      }
  
      // Update pagination info
      $('.table-footer p').text(`Showing ${start + 1} to ${end} of ${totalProducts} entries`);
      $('.btn-pagination').prop('disabled', page === 1); // Disable previous button if on first page
      $('.btn-pagination').last().prop('disabled', end === totalProducts); // Disable next button if on last page
    }
  
    // Event listener for pagination buttons
    $('.btn-pagination').first().click(() => {
      if (currentPage > 1) {
        currentPage--;
        displayPage(currentPage);
      }
    });
  
    $('.btn-pagination').last().click(() => {
      if (currentPage * rowsPerPage < totalProducts) {
        currentPage++;
        displayPage(currentPage);
      }
    });
  
    // Change rows per page dynamically
    $('#show-entries').change(function () {
      rowsPerPage = parseInt(this.value, 10);
      currentPage = 1; // Reset to first page
      displayPage(currentPage);
    });
  
    // Search functionality
    $('.search-box input').on('input', function () {
      const searchTerm = this.value.toLowerCase();
  
      if (searchTerm) {
        allProducts = originalProducts.filter(product =>
          product.product_name.toLowerCase().includes(searchTerm) ||
          product.product_model.toLowerCase().includes(searchTerm) ||
          (product.category && product.category.category_name.toLowerCase().includes(searchTerm))
        );
      } else {
        allProducts = [...originalProducts];
      }
  
      totalProducts = allProducts.length;
      currentPage = 1; // Reset to first page
      displayPage(currentPage);
    });
  
    // Call the function to fetch product data when the page loads
    fetchProductData();
  });