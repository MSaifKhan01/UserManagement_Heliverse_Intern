const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  try {
    let actualToken = token;
    console.log('Actual Token:', actualToken);
    // Decode and verify the token
    const decoded = jwt.verify(actualToken, 'jammi');
    console.log('Decoded Token:', decoded);

    req.body.userID = decoded.userID;
    next();
  } catch (error) {
    console.error('Token Verification Error:', error);
    res.status(401).send({ "Msz": "Unauthorized" });
  }
};

module.exports = { auth };
