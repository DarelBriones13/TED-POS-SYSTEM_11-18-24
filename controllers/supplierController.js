const db = require("../models");

const addSupplier = async (req, res) => {
  const { supplier_name, contact_num, address, supplier_status } = req.body;
  try {
    const supplier = await db.Supplier.create({
      supplier_name,
      contact_num,
      address,
      supplier_status,
    });
    res.json({ message: "Supplier added successfully", supplier });
  } catch (error) {
    res.status(500).json({ message: "Error adding supplier", error: error.message });
  }
};

const getSuppliers = async (req, res) => {
  const { page, perPage } = req.query; // Get page and perPage from query

  try {
    if (page) {
      // If page is provided, handle pagination
      const offset = (page - 1) * (perPage || 5); // Default perPage to 5 if not provided
      const suppliers = await db.Supplier.findAndCountAll({
        limit: parseInt(perPage, 10), // Ensure perPage is an integer
        offset: offset,
      });

      console.log("Fetched suppliers with pagination:", suppliers); // Log the suppliers data

      // Return total count and rows
      return res.json({
        total: suppliers.count, // Total number of suppliers
        suppliers: suppliers.rows // Return only the rows array
      });
    } else {
      // If page is not provided, return all suppliers
      const suppliers = await db.Supplier.findAll({
        attributes: ['supplier_id', 'supplier_name'] // Only fetch supplier_id and supplier_name
      });

      console.log("Fetched all suppliers:", suppliers); // Log the suppliers data

      // Return all suppliers
      return res.json(suppliers);
    }
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    res.status(500).json({ message: "Error fetching suppliers", error: error.message });
  }
};

// In supplierController.js
const updateSupplier = async (req, res) => {
  const { id } = req.params;
  const { supplier_name, contact_num, address, supplier_status } = req.body;
  
  try {
    const supplier = await db.Supplier.findByPk(id);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    // Update supplier fields
    await supplier.update({
      supplier_name,
      contact_num,
      address,
      supplier_status,
    });

    res.json({ message: "Supplier updated successfully", supplier });
  } catch (error) {
    res.status(500).json({ message: "Error updating supplier", error: error.message });
  }
};

const getSupplierById = async (req, res) => {
  const { id } = req.params;
  try {
    const supplier = await db.Supplier.findByPk(id);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ message: "Error fetching supplier", error: error.message });
  }
};


module.exports = { addSupplier, getSuppliers, updateSupplier, getSupplierById };