const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { createTeam } = require("./teamService");

/**
 * Validate user authentication data.
 * @param {Object} data - User input data.
 * @returns {Object} - Validated data or error details.
 */
exports.validateUser = (data) => {
  const Joi = require("joi");

  const userSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(8).required(),
  });

  return userSchema.validate(data);
};

/**
 * Authenticate the user.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @returns {Promise<string>} - JWT token.
 */
exports.authenticateUser = async (email, password) => {
  let user = await User.findOne({ email });

  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ email, password: hashedPassword });
    await createTeam(user._id);
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return token;
};
