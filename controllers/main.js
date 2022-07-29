const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");

const loginRegister = async (req, res) => {
  const { username, password } = req.body;

  // Custom Validation
  if (!username || !password) {
    throw new CustomAPIError("Please provide username & password.", 400);
  }

  // temp ID
  const id = new Date().getTime();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({
    token,
    msg: "User Created Successfully!",
    success: true,
  });
};

const dashboard = async (req, res) => {
  const { id, username, token } = req.user;
  // Random Number
  const secretCode = Math.floor(Math.random() * 100);
  res.json({
    msg: `Hello, ${username}`,
    secret: `Here is your Authorized data, your secret code is ${
      token.slice(0, 5) + secretCode
    }.`,
  });
};

module.exports = {
  loginRegister,
  dashboard,
};
