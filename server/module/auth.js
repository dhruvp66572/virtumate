/* eslint-disable no-undef */
const jwt = require("jsonwebtoken");
const { compare, hash } = require("bcrypt");

const hashPassword = async (password) => {
  if (!password) {
    throw new Error('Password is required');
  }
  return await hash(password, 10);
};

const comparePassword = async (password, hashedPassword) => {
  if (!password || !hashedPassword) {
    throw new Error('Password and hash are required');
  }
  return await compare(password, hashedPassword);
};

const createJWT = (user) => {
  if (!user || !user._id || !user.email) {
    throw new Error('User data is invalid');
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      
    },
    process.env.JWT_SECRET,
    { 
      expiresIn: '24h',
      algorithm: 'HS256' // Explicitly specify algorithm
    }
  );

  return token;
};

const protect = async (req, res, next) => {
  try {
    const bearer = req.headers.authorization;

    if (!bearer) {
      return res.status(401).json({ 
        status: 'error',
        message: "Authentication required",
        code: 'AUTH_REQUIRED'
      });
    }

    const [scheme, token] = bearer.split(" ");

    if (scheme !== 'Bearer' || !token) {
      return res.status(401).json({ 
        status: 'error',
        message: "Invalid authentication format",
        code: 'INVALID_AUTH_FORMAT'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256']
    });

    // Add token expiration check
    if (decoded.exp && decoded.exp < Date.now() / 1000) {
      return res.status(401).json({
        status: 'error',
        message: "Token has expired",
        code: 'TOKEN_EXPIRED'
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      status: 'error',
      message: error.message || "Authentication failed",
      code: 'AUTH_FAILED'
    });
  }
};

module.exports = { createJWT, hashPassword, comparePassword, protect };