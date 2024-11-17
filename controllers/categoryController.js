const db = require('../models');

// Save new category
const saveCategory = async (req, res) => {
    const { category_name, category_description } = req.body; // Destructure from the request body
    
    try {
        // Check if category already exists
        const existingCategory = await db.Category.findOne({ where: { category_name } });
        if (existingCategory) {
            return res.status(400).json({ message: 'Category already exists.' }); // Send error message if exists
        }

        const newCategory = await db.Category.create({
            category_name,
            category_description
        });
        res.json(newCategory); // Send back the created category as a response
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).send('Internal server error');
    }
};


// Get all categories
const getCategories = async () => {
    try {
        return await db.Category.findAll(); // Fetch all categories from the database
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw new Error('Error fetching categories');
    }
};



module.exports = {
    saveCategory,
    getCategories
};
