const Team = require('../models/Team');

exports.getTeam = async (req, res) => {
  try {
    const team = await Team.findOne({ userId: req.user.id }).populate('players');
    res.json({ team });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
