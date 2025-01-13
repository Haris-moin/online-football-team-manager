const {
  validatePlayerTransfer,
  toggleTransferListing,
  getTransferredPlayers,
  purchasePlayer,
} = require("../services/transferService");

/**
 * Controller to toggle player transfer listing.
 */
exports.toggleTransferListing = async (req, res) => {
  try {
    const { error, value } = validatePlayerTransfer(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { playerId, askingPrice } = value;
    const player = await toggleTransferListing(playerId, req.user.id, askingPrice);

    res.status(200).json({
      message: `Player transfer listing successfully ${player.transferListed ? "enabled" : "disabled"}.`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Controller to fetch players listed for transfer.
 */
exports.getTransferredPlayers = async (req, res) => {
  try {
    const players = await getTransferredPlayers(req.query, req.user.id);
    res.status(200).json({ message: "Players fetched successfully.", players });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Controller to purchase a player.
 */
exports.purchasePlayer = async (req, res) => {
  try {
    const { playerId } = req.body;

    const player = await purchasePlayer(playerId, req.user.id);
    res.status(200).json({ message: "Player purchased successfully.", player });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
