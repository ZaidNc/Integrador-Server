const app = require("./app");
const PORT = 3001;
const { conn } = require('./DB_connection');

conn.sync({ force: true }).then(() => {
  console.log('Database synced');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});