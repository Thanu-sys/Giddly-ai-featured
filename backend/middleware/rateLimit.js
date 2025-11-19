import rateLimit from 'express-rate-limit';

export const chatRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { error: "Too many chat requests, please try again later." }
});

export const apiRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: { error: "Too many API requests, please try again later." }
});