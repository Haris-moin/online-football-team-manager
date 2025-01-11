const userRoutes = require('./userRoutes');
const teamRoutes = require('./teamRoutes');
const transferRoutes = require('./transferRoutes');
const auth = require('../middleware/auth');

module.exports = (app) => {
    app.use('/api/users', userRoutes);
    app.use('/api/teams', auth, teamRoutes);
    app.use('/api/transfers', auth, transferRoutes);
  };