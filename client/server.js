//Global Variables
const express = require("express");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const port = process.env.PORT || 5000;

//requirements
require("dotenv")

// Create a new Express app
const app = express();

// Set up Auth0 configuration
const authConfig = {
  domain: "ds-development.auth0.com",
  audience: "https://ds-development.auth0.com/api/v2/"
};

// Define middleware that validates incoming bearer tokens
// using JWKS from YOUR_DOMAIN
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithm: ["RS256"]
});

// Define an endpoint that must be called with an access token
app.get("/api/external", checkJwt, (req, res) => {
  res.send({
    msg: "Your Access Token was successfully validated!"
  });
});

// Start the app
app.listen(port, () => console.log(`API listening on ${port}`));