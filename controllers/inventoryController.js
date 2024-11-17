const db = require('../models'); // Ensure you have access to your models

// Function to add inventory and product
const addInventoryAndProduct = async (req, res) => {
    // Log the incoming request body and file
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    const {
        productName,
        productModel,
        stock,
        dateReceived,
        supplierId,
        purchasePrice,
        sellingPrice,
        categoryId,
        status // New field for status
    } = req.body;

    // Get userId from session
    const userId = req.session.userId; // Retrieve user ID from the session

    // Basic validation
    if (!productName || !stock || !supplierId || !userId || !purchasePrice || !sellingPrice || !categoryId || !status) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const transaction = await db.sequelize.transaction(); // Start a transaction

    try {
        // Create a new product
        const newProduct = await db.products.create({
            product_name: productName,
            product_model: productModel,
            product_quantity: stock,
            purchase_price: purchasePrice,
            selling_price: sellingPrice,
            category_id: categoryId,
            product_img: req.file ? req.file.filename : null, // Save the image filename
            product_status: status // Save the product status
        });

        // Create a new inventory entry
        await db.inventory.create({
            stocks: stock,
            date_received: dateReceived,
            supplier_id: supplierId,
            product_id: newProduct.product_id,
            user_id: userId, // Use userId from session
            inventory_status: status // Save the inventory status
        });

        await transaction.commit(); // Commit the transaction
        return res.status(201).json({ message: 'Product and inventory added successfully', product: newProduct });
    } catch (error) {
        await transaction.rollback(); // Rollback the transaction in case of error
        console.error("Error adding product and inventory:", error.message || error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    addInventoryAndProduct
};