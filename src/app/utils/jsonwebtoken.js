const jwt = require("jsonwebtoken");

// Function to create a JWT
const createJWT = async (email, role) => {
  const token = jwt.sign({ email, role }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d", // Token expires in 1 day
  });
  return token;
};

// Middleware function to validate the JWT
const tokenValidation = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({
      message: "Authorization token is required",
    });
  }

  try {
    // Remove "Bearer " prefix from the token
    const tokenWithoutBearer = token.split(" ")[1];

    // Verify the token
    const decoded = await jwt.verify(
      tokenWithoutBearer,
      process.env.ACCESS_TOKEN_SECRET
    );

    // Attach user information to the request object
    req.email = decoded.email;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token has expired",
      });
    }
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  return next();
};

module.exports = {
  createJWT,
  tokenValidation,
};
