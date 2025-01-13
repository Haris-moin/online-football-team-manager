const Team = require('../models/Team');
const Player = require('../models/Player');

exports.createTeam = async (userId) => {

  const teamCount = await Team.countDocuments({});
  const teamName = `Team ${teamCount + 1}`

  const team = await Team.create({ userId, teamName });
  const positions = { Goalkeeper: 3, Defender: 6, Midfielder: 6, Attacker: 5 };

  const players = [];
  for (const [position, count] of Object.entries(positions)) {
    for (let i = 0; i < count; i++) {
      players.push({
        name: `${position} Player ${i + 1}`,
        position,
        teamId: team._id,
      });
    }
  }

  const createdPlayers = await Player.insertMany(players);
  team.players = createdPlayers.map(player => player._id);
  await team.save();
};

/**
 * Fetch the user's team along with non-transfer-listed players.
 * @param {string} userId - ID of the logged-in user.
 * @returns {Promise<object>} - The team object with players.
 */
exports.fetchTeamByUserId = async (userId) => {
  try {
    const team = await Team.findOne({ userId }).populate({
      path: 'players',
      match: { transferListed: false },
    });
    return team;
  } catch (error) {
    throw new Error(error.message);
  }
};
