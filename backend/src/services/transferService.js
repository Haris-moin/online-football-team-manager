const Joi = require("joi");
const Player = require("../models/Player");
const Team = require("../models/Team");

/**
 * Validate player transfer schema.
 * @param {Object} data - The data to validate.
 * @returns {Object} - Validation result.
 */
exports.validatePlayerTransfer = (data) => {
  const schema = Joi.object({
    playerId: Joi.string().required(),
    askingPrice: Joi.number().optional(),
  });
  return schema.validate(data);
};

/**
 * Toggle player's transfer listing.
 * @param {string} playerId - The ID of the player.
 * @param {string} userId - The ID of the current user.
 * @param {number} [askingPrice] - Asking price for the player.
 * @returns {Promise<Object>} - Updated player details.
 */
exports.toggleTransferListing = async (playerId, userId, askingPrice) => {
  const player = await Player.findById(playerId).populate({
    path: "teamId",
    select: "userId teamName",
  });

  if (!player) throw new Error("Player not found.");
  if (player.teamId.userId.toString() !== userId.toString()) {
    throw new Error("You are not authorized to transfer this player.");
  }
  if (!player.transferListed && !askingPrice) {
    throw new Error("Asking price must be provided.");
  }

  player.transferListed = !player.transferListed;
  player.askingPrice = player.transferListed ? askingPrice : undefined;
  await player.save();

  return player;
};

/**
 * Get players listed for transfer.
 * @param {Object} filters - Query filters (e.g., teamName, playerName, price).
 * @param {string} userId - The ID of the current user.
 * @returns {Promise<Array>} - List of players matching the filters.
 */
exports.getTransferredPlayers = async (filters, userId) => {
  const { playerName, price, teamName } = filters;

  const pipeline = [
    { $match: { transferListed: true } },
    {
      $lookup: {
        from: "teams",
        localField: "teamId",
        foreignField: "_id",
        as: "team",
      },
    },
    { $unwind: "$team" },
  ];

  if (teamName) pipeline.push({ $match: { "team.teamName": { $regex: teamName, $options: "i" } } });
  if (playerName) pipeline.push({ $match: { name: { $regex: playerName, $options: "i" } } });
  if (price) pipeline.push({ $match: { askingPrice: { $lte: Number(price) } } });

  pipeline.push({
    $project: { name: 1, position: 1, askingPrice: 1, teamId: 1, "team.teamName": 1 },
  });

  const players = await Player.aggregate(pipeline);
  const team = await Team.findOne({ userId });

  return players.map((player) => ({
    ...player,
    isTeamMember: player.teamId.equals(team._id),
  }));
};

/**
 * Purchase a player.
 * @param {string} playerId - The ID of the player to purchase.
 * @param {string} userId - The ID of the buyer.
 * @returns {Promise<Object>} - Details of the purchased player.
 */
exports.purchasePlayer = async (playerId, userId) => {
  const player = await Player.findById(playerId);
  if (!player || !player.transferListed) throw new Error("Player is not available for transfer.");

  const buyerTeam = await Team.findOne({ userId });
  const sellerTeam = await Team.findById(player.teamId);

  if (!buyerTeam) throw new Error("Buyer team not found.");
  const transferPrice = player.askingPrice * 0.95;

  if (buyerTeam.budget < transferPrice) throw new Error("Insufficient budget to purchase player.");

  buyerTeam.budget -= transferPrice;
  sellerTeam.budget += transferPrice;

  player.teamId = buyerTeam._id;
  player.transferListed = false;
  player.askingPrice = undefined;

  sellerTeam.players = sellerTeam.players.filter((id) => id.toString() !== playerId);
  buyerTeam.players.push(playerId);

  await Promise.all([player.save(), buyerTeam.save(), sellerTeam.save()]);

  return player;
};
