
import { ROLES } from '../CONST/CONSTBACK.js';
import jwt from 'jsonwebtoken';

export const accessAuth = (req, res, next) => {
  const token = req?.header('x-auth-token');
  console.log('access auth', token)
  if (!token) 
    return res.status(401).json({ message: 'no auth token!' });

  try {
    // verify token and encrypt data
    console.log('payload', process.env.JWT_PRIVATE_KEY);
    const payload = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    // store user on req object for next middleware
    req.user = payload;
    next();
  } catch(err) {
    return res.status(400).json({ message: 'invalid token, expired!' });
  }
}

export const accessAdmin = (req, res, next) => {
  // get user from authUser() middleware
  const user = req.user;
  console.log(user);
  if (user.role === ROLES.ADMIN) {
    next();
  } else {
    return;
  }
}


/* 
const ACCESS = {

  authUser: (req, res, next) => {
    const token = req?.headers('x-auth-token');
    
    if (!token) 
      return res.status(401).json({ message: 'no auth token!' });

    try {
      // verify token and encrypt data
      const payload = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
      // store user on req object for next middleware
      req.user = payload;
      next();
    } catch(err) {
      return res.status(400).json({ message: 'invalid token, expired!' });
    }
  }, 

  admin: (req, res, next) => {
    // get user from authUser() middleware
    const user = req.user;

    if (user.role === ROLES.ADMIN) {
      next();
    } else {
      return;
    }
  }
}

export default ACCESS; 
*/