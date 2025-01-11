const Joi = require("joi");
const Player = require("../models/Player");
const Team = require("../models/Team");

exports.toggleTransferListing = async (req, res) => {

  const playerTransferSchema = Joi.object({
    playerId: Joi.string().required(),
    askingPrice: Joi.number().greater(5000).optional()
  });

  try {
    const { error, value } = playerTransferSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ errors: error.toString() });
    }

    const { playerId, askingPrice } = value;
    const player = await Player.findById(playerId).populate({
      path: 'teamId',
      select: 'userId teamName'
    });

    if (!player) {
      return res.status(404).json({ message: "Player not found." });
    }

    const userId = req.user.id;
    if (player.teamId.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "You are not authorized to transfer this player." });
    }

    if (!player.transferListed && !askingPrice) {
      return res.status(403).json({ message: "Asking price must be greater than 5000." });
    }

    player.transferListed = !player.transferListed;

    if (player.transferListed) {
      player.askingPrice = askingPrice;
    } else {
      player.askingPrice = undefined;
    }

    await player.save();

    res.status(200).json({
      message: `Player transfer listing successfully ${
        player.transferListed ? "enabled" : "disabled"
      }.`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating transfer listing.",
      error: error.message,
    });
  }
};

exports.getTransferredPlayers = async (req, res) => {
  const { playerName, price, teamName } = req.query;

  try {
    const filterPipeline = [
      { $match: { transferListed: true } },
      {
        $lookup: {
          from: "teams",
          localField: "teamId",
          foreignField: "_id",
          as: "team",
        },
      },
      {
        $unwind: "$team",
      },
    ];

    if (teamName) {
      filterPipeline.push({
        $match: { "team.teamName": { $regex: teamName, $options: "i" } },
      });
    }

    if (playerName) {
      filterPipeline.push({
        $match: { name: { $regex: playerName, $options: "i" } },
      });
    }

    if (price) {
      filterPipeline.push({
        $match: {
          askingPrice: {
            $lte: Number(price),
          },
        },
      });
    }

    filterPipeline.push({
      $project: {
        name: 1,
        position: 1,
        askingPrice: 1,
        teamId: 1,
        "team.teamName": 1,
      },
    });

    const filteredPlayers = await Player.aggregate(filterPipeline);
    res.status(200).json({ players: filteredPlayers });
  } catch (error) {
    res.status(500).json({
      message: "Error filtering transfer market.",
      error: error.message,
    });
  }
};

exports.purchasePlayer = async (req, res) => {

  const purchasePlayerSchema = Joi.object({
    playerId: Joi.string().required(),
    buyerTeamId: Joi.string().required(),
  });

  try {
    const { error, value } = purchasePlayerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ errors: error.toString() });
    }

    const { playerId, buyerTeamId } = value;

    const player = await Player.findById(playerId);
    if (!player || !player.transferListed) {
      return res
        .status(400)
        .json({ message: "Player is not available for transfer." });
    }

    const sellerTeam = await Team.findById(player.teamId);
    const buyerTeam = await Team.findById(buyerTeamId);

    if (!buyerTeam) {
      return res.status(404).json({ message: "Buyer team not found." });
    }

    const transferPrice = player.askingPrice * 0.95;

    if (buyerTeam.budget < transferPrice) {
      return res
        .status(400)
        .json({ message: "Insufficient budget to purchase player." });
    }

    // Update budgets for buyer and seller
    buyerTeam.budget -= transferPrice;
    sellerTeam.budget += transferPrice;

    // Update the player's ownership
    player.teamId = buyerTeam._id;
    player.transferListed = false;
    player.askingPrice = undefined;

    // Update the player lists in both teams
    sellerTeam.players = sellerTeam.players.filter(
      (pId) => pId.toString() !== playerId
    );
    buyerTeam.players.push(playerId);

    // Save all changes
    await Promise.all([player.save(), buyerTeam.save(), sellerTeam.save()]);

    res.status(200).json({
      message: "Player purchased successfully.",
      player,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error completing player purchase.",
        error: error.message,
      });
  }
};
