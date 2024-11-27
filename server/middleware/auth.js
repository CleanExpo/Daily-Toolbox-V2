export const validateApiKey = (req, res, next) => {
  const apiKey = req.headers.authorization?.split('Bearer ')[1];
  
  if (!apiKey) {
    return res.status(401).json({ error: 'No API key provided' });
  }

  if (apiKey !== process.env.ASCORA_API_KEY) {
    return res.status(403).json({ error: 'Invalid API key' });
  }

  next();
};