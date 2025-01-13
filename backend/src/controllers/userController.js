const { validateUser, authenticateUser } = require("../services/userService");

/**
 * Handle user authentication (login or register).
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
exports.userAuthHandler = async (req, res) => {
  try {

    const { error, value } = validateUser(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: error?.details[0]?.message || "Validation error" });
    }

    const { email, password } = value;
    const token = await authenticateUser(email, password);
    res.status(200).json({ token });

  } catch (error) {
    if (error.message === "Invalid credentials") {
      return res.status(401).json({ message: error.message });
    }

    res.status(500).json({ error: error.message });
  }
};
