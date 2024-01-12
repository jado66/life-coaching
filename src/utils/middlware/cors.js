function setCorsHeaders(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', process.env.BASE_URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
    if (req.method === 'OPTIONS') {
      // Handle pre-flight requests
      res.status(200).end();
      return;
    }
  
    // Call next() to pass control to the next middleware/function
    next();
  }
  
  export {setCorsHeaders};
  