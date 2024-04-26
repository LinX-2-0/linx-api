const express = require('express');

function noAuthMiddleware(req, res, next) {
  // Skip authorization for these specific routes
  if (req.originalUrl === '/api/userExists' || req.originalUrl === '/api/login' || req.originalUrl === '/api/registerUser') {
    next(); // Proceed without authorization check
  } else {
    // Implement your existing authorization logic here (if applicable)
    // For example, using middleware like 'passport' or JWT verification
    next(new Error('Authorization required')); // Or handle unauthorized access
  }
}

module.exports = noAuthMiddleware;
