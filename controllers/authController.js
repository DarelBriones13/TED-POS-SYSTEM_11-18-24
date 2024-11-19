// controllers/authController.js

const db = require('../models'); // Import the models

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
      const user = await db.User.findOne({
          where: { username }
      });

      if (!user) {
          return res.render('index', { 
              errorMessage: 'Invalid username or password', 
              username // Pass the entered username back to the view
          });
      }

      // Compare the plain text passwords directly
      if (password !== user.password) {
          return res.render('index', { 
              errorMessage: 'Invalid username or password', 
              username // Pass the entered username back to the view
          });
      }

      // Store user ID and userType in session
      req.session.userId = user.id; // Store the user's ID in the session
      req.session.userType = user.userType; // Store the user's type in the session

      res.redirect('/dashboard');
  } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).send('Internal server error');
  }
};


module.exports = {
  login
};
