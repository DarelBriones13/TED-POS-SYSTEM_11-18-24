// controllers/authController.js

const db = require('../models'); // Import the models

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
      const user = await db.User.findOne({
          where: { username }
      });

      if (!user) {
          return res.status(400).send('Invalid username or password');
      }

      // Compare the plain text passwords directly
      if (password !== user.password) {
          return res.status(400).send('Invalid username or password');
      }

      // Store user ID in session
      req.session.userId = user.id; // Store the user's ID in the session

      res.redirect('/dashboard');
  } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).send('Internal server error');
  }
};

module.exports = {
  login
};
