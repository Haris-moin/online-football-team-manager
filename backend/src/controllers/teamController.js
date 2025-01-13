const { fetchTeamByUserId } = require('../services/teamService');

/**
 * Controller to handle fetching the user's team.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
exports.getTeam = async (req, res) => {
  try {
    const team = await fetchTeamByUserId(req.user.id);

    if (!team) {
      return res.status(404).json({
        message: "Team not found.",
      });
    }

    res.status(200).json({
      message: "Team fetched successfully.",
      team,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
