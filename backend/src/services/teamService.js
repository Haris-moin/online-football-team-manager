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

