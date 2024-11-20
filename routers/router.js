const express = require("express");
const path = require("path");
const { login } = require("../controllers/authController");
const { saveCategory, getCategories } = require("../controllers/categoryController");
const { addSupplier, getSuppliers, updateSupplier, getSupplierById } = require("../controllers/supplierController");
const { addInventoryAndProduct } = require('../controllers/inventoryController');
const multer = require('multer');
const { User } = require('../models');
const db = require("../models");

const routes = express.Router();

// -------------------- AUTHENTICATION ROUTES --------------------
// Login route
routes.get("/login", (req, res) => {
  res.render("index"); // No need for file extension if you're using EJS
});

routes.post("/login", login); // Login form submission


// Add this route to your router.js
routes.get("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).send('Internal server error');
    }
    res.redirect("/login"); // Redirect to login page after logout
  });
});

// -------------------- DASHBOARD AND PAGE ROUTES --------------------
// Serve dashboard.ejs after successful login
routes.get("/dashboard", (req, res) => {
  const userType = req.session.userType; // Get userType from session
  res.render("dashboard", { activePage: 'dashboard', userType }); // Pass userType to the view
});

// Serve other page routes with userType
routes.get("/orders", (req, res) => {
  const userType = req.session.userType; // Get userType from session
  res.render("orders", { activePage: 'orders', userType }); // Pass userType to the view
});

routes.get("/takeorders", (req, res) => {
  const userType = req.session.userType; // Get userType from session
  res.render("takeorders", { activePage: 'takeorders', userType }); // Pass userType to the view
});

routes.get("/inventory", (req, res) => {
  const userType = req.session.userType; // Get userType from session
  res.render("inventory", { activePage: 'inventory', userType }); // Pass userType to the view
});

routes.get("/supplier", (req, res) => {
  const userType = req.session.userType; // Get userType from session
  res.render("supplier", { activePage: 'supplier', userType }); // Pass userType to the view
});

routes.get("/products", (req, res) => {
  const userType = req.session.userType; // Get userType from session
  res.render("products", { activePage: 'products', userType }); // Pass userType to the view
});

routes.get("/bundleslist", (req, res) => {
  const userType = req.session.userType; // Get userType from session
  res.render("bundleslist", { activePage: 'bundleslist', userType }); // Pass userType to the view
});

routes.get("/addbundle", (req, res) => {
  const userType = req.session.userType; // Get userType from session
  res.render("addbundle", { activePage: 'addbundle', userType }); // Pass userType to the view
});

routes.get("/editBundle", (req, res) => {
  const userType = req.session.userType; // Get userType from session
  res.render("editBundle", { activePage: 'editBundle', userType }); // Pass userType to the view
});

routes.get("/salereport", (req, res) => {
  const userType = req.session.userType; // Get userType from session
  res.render("salereport", { activePage: 'salereport', userType }); // Pass userType to the view
});

// -------------------- CATEGORY ROUTES --------------------
// Get all categories and serve categories.ejs
routes.get("/categories", async (req, res) => {
  try {
    const categories = await getCategories();
    const userType = req.session.userType; // Get userType from session
    res.render("categories", { categories, activePage: 'categories', userType }); // Pass userType to the view
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).send('Internal server error');
  }
});

// Fetch categories list as JSON
routes.get("/categories/list", async (req, res) => {
  try {
    const categories = await getCategories();
    res.json(categories); // Return categories as JSON
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).send('Internal server error');
  }
});

// Update category by ID
routes.put("/categories/:id", async (req, res) => {
  const categoryId = req .params.id;
  const { category_name, category_description } = req.body;

  try {
    const category = await db.Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found.' });
    }

    category.category_name = category_name;
    category.category_description = category_description;
    await category.save();

    res.json(category); // Respond with the updated category
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// Handle form submission for saving categories
routes.post("/categories", saveCategory);

// -------------------- USER MANAGEMENT ROUTES --------------------
// Serve user.ejs at the /users route
routes.get("/users", (req, res) => {
  const userType = req.session.userType; // Get userType from session
  res.render("user", { activePage: 'users', userType }); // Pass userType to the view
});

// Get all users (for display)
routes.get('/users/list', async (req, res) => {
  const users = await User.findAll();
  res.json(users); // Return the users as JSON
});

// Add a new user
routes.post("/users", async (req, res) => {
  const { name, username, password, userType } = req.body;
  try {
    const newUser  = await User.create({ name, username, password, userType });
    res.json(newUser );
  } catch (error) {
    res.status(400).json({ error: "Error creating user" });
  }
});

// Get a user by ID
routes.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User  not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update a user by ID
routes.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, username, password, userType } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User  not found" });
    }

    user.name = name || user.name;
    user.username = username || user.username;
    user.password = password || user.password;
    user.userType = userType || user.userType;

    await user.save();
    res.json(user); // Return the updated user
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a user by ID
routes.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.json({ message: "User  deleted" });
    } else {
      res.status(404).json({ error: "User  not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
});

// -------------------- SUPPLIER ROUTES --------------------
// Add a supplier
routes.post("/suppliers", addSupplier);

// Get all suppliers
routes.get("/suppliers", getSuppliers);

// Get supplier by ID
routes.get("/suppliers/:id", getSupplierById);

// Update a supplier
routes.put("/suppliers/:id", updateSupplier);

// Route to get all supplier names (only IDs and names)
routes.get('/suppliers/names', async (req, res) => {
  try {
    const suppliers = await db.Supplier.findAll({
      attributes: ['supplier_id', 'supplier_name'] // Only fetch supplier_id and supplier_name
    });
    res.json(suppliers); // Send the supplier names as JSON
  } catch (error) {
    console.error("Error fetching supplier names:", error);
    res.status(500).send('Internal server error');
  }
});

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Destination folder
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
  }
});

const upload = multer ({ storage: storage }); // Use the defined storage

// Route to add inventory and product
routes.post('/inventory', upload.single('productImage'), addInventoryAndProduct);

// Fetch all inventory records
routes.get("/inventories/list", async (req, res) => {
  try {
      const inventories = await db.inventory.findAll({
          include: [
              {
                  model: db.products, // The model to include
                  as: 'product', // Use the alias defined in the association
                  attributes: ['product_name', 'product_model'] // Specify attributes to fetch
              },
              {
                  model: db.Supplier, // The model to include
                  as: 'Supplier', // Use the alias defined in the association
                  attributes: ['supplier_name'] // Specify attributes to fetch
              }
          ]
      });
      res.json(inventories); // Return the inventories as JSON
  } catch (error) {
      console.error("Error fetching inventories:", error);
      res.status(500).send('Internal server error');
  }
});

// Fetch all products with their associated categories
routes.get("/products/list", async (req, res) => {
  try {
      const products = await db.products.findAll({
          include: [
              {
                  model: db.Category, // Include the Category model
                  as: 'category', // Use the alias defined in the association
                  attributes: ['category_name'] // Specify attributes to fetch from the category
              }
          ]
      });
      res.json(products); // Return products as JSON
  } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).send('Internal server error');
  }
});

  // Update inventory and product
routes.put('/inventory/:id', upload.single('productImage'), async (req, res) => {
  const inventoryId = req.params.id;
  const {
    productName,
    productModel,
    stock,
    dateReceived,
    supplierId,
    purchasePrice,
    sellingPrice,
    status
  } = req.body;

  // Basic validation
  if (!productName || !stock || !supplierId || !purchasePrice || !sellingPrice || !status) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const transaction = await db.sequelize.transaction(); // Start a transaction

  try {
    // Find the inventory entry
    const inventory = await db.inventory.findOne({ where: { inventory_id: inventoryId } });
    if (!inventory) {
      return res.status(404).json({ error: 'Inventory not found' });
    }

    // Find the product associated with the inventory
    const product = await db.products.findOne({ where: { product_id: inventory.product_id } });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Update the product fields (excluding product_id)
    product.product_name = productName;
    product.product_model = productModel;
    product.product_quantity = stock;
    product.purchase_price = purchasePrice;
    product.selling_price = sellingPrice;
    product.product_status = status; // Update product status
    await product.save();

    // Update the inventory entry
    inventory.stocks = stock;
    inventory.date_received = dateReceived;
    inventory.supplier_id = supplierId;
    inventory.inventory_status = status; // Update inventory status
    await inventory.save();

    await transaction.commit(); // Commit the transaction
    return res.status(200).json({ message: 'Product and inventory updated successfully' });
  } catch (error) {
    await transaction.rollback(); // Rollback the transaction in case of error
    console.error("Error updating product and inventory:", error); // Log the error
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// Get inventory details by ID
routes.get('/inventories/:id', async (req, res) => {
  const inventoryId = req.params.id;
  try {
    const inventory = await db.inventory.findOne({
      where: { inventory_id: inventoryId },
      include: [
        {
          model: db.products,
          as: 'product',
          attributes: ['product_name', 'product_model', 'purchase_price', 'selling_price']
        },
        {
          model: db.Supplier,
          as: 'Supplier',
          attributes: ['supplier_name']
        }
      ]
    });

    if (!inventory) {
      return res.status(404).json({ error: 'Inventory not found' });
    }

    res.json(inventory); // Return the inventory details
  } catch (error) {
    console.error("Error fetching inventory details:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// -------------------- STATIC FILES AND OTHER ROUTES --------------------
// Serve static files
routes.use(express.static(path.join(__dirname, "public ")));

module.exports = routes;