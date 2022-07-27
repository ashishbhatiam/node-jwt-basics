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
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("No token provided.", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Random Number
    const secretCode = Math.floor(Math.random() * 100);
    res.json({
      msg: `Hello, ${decoded.username}`,
      secret: `Here is your Authorized data, your secret code is ${
        token.slice(0, 5) + secretCode
      }.`,
    });
  } catch (error) {
    throw new CustomAPIError("Not authorized to access this route.", 401);
  }
};

module.exports = {
  loginRegister,
  dashboard,
};
