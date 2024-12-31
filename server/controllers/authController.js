const check = (req, res) => {
  res.json({
    message: "Hello from Auth Controller",
  });
};

const register = (req, res) => {
  res.json({
    message: "Register route",
  });
};

const login = (req, res) => {
  res.json({
    message: "Login route",
  });
};

module.exports = {
  check,
  register,
  login,
};
