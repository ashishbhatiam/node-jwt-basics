const loginRegister = async (req, res) => {
  res.send("Testing Login/Register..");
};

const dashboard = async (req, res) => {
  const secretCode = Math.floor(Math.random() * 100);
  res.json({
    msg: "Hello, Ashish",
    secret: `Here is your Authorized data, your secret code is ${secretCode}.`,
  });
};

module.exports = {
  loginRegister,
  dashboard,
};
