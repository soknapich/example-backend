// server.js
const app = require('./app');
const sequelize = require('@config/db.config');
const PORT = process.env.APP_PORT || 3000;

// auto create/update tables
sequelize.sync({ alter: false })  
  .then(() => console.log("Database synced"))
  .catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
