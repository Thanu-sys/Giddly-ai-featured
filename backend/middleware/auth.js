export const auth = (req, res, next) => {
  // Simple auth for development
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }
  
  // In production, validate JWT token
  next();
};

export const optionalAuth = (req, res, next) => {
  // Auth is optional for some routes
  next();
};