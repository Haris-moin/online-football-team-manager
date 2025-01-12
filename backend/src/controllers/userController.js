const bcrypt = require("bcryptjs");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { createTeam } = require("../services/teamService");

exports.userAuthHandler = async (req, res) => {
  const userSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(8).required(),
  });

  try {
    const { error, value } = userSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: error?.details[0]?.message || error.toString() });
    }

    const { email, password } = value;

    let user = await User.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(401).json({ message: "Invalid credentials" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await User.create({ email, password: hashedPassword });
      await createTeam(user._id);
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
