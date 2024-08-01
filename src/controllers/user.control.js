import bcrypt from  'bcryptjs';
import jwt from  'jsonwebtoken';

import db from '../models/index.model.js';
import { getResponseSuccess, getResponseError } from '../lib/handleResponse.js';
import { TOKEN_EXPIRATION } from '../config/configurations.js';

const user_functions = {
  parseRequest_toUserModel: (body) => {
    return {
      email: body.email, 
      password: body.password,
      firstName: body.firstName,
      lastName: body.lastName,
      business: body.business,
      role: body.role,
      lastLoggedIn: body.lastLoggedIn,
    }
  },
  encryptPassword: async (unencrypted_Password) => {
    const salt = await bcrypt.genSalt(10);
    const encrypted_Password = await bcrypt.hash(unencrypted_Password, salt);
    return encrypted_Password
  },
  createToken_ForUser: (foundUser) => {
    const { _id, email, business, role } = foundUser
    const payload = { _id, email, business, role };
    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: TOKEN_EXPIRATION };
    const token = jwt.sign(payload, secret, options);

    return token;
  },
  comparePasswords: async ({ email, password, storedPassword }) => {
    const isMatch = await bcrypt.compare(password, storedPassword);
    if (!isMatch) {
      throw {
        customThrow: true,
        error: `password failed for user ${email}`,
        userMessage: 'Username or password is incorrect',
        statusCode: 400
      }
    }
  }
}

const controllers ={
  register: async ({ body }, res) => {
    try {
      const { parseRequest_toUserModel, encryptPassword } = user_functions;

      const parsedUser = parseRequest_toUserModel(body);
      parsedUser.password = await encryptPassword(parsedUser.password);
  
      const createdUser = await db.User.create(parsedUser)
      .catch(error => { throw error }); // Validation handled by mongoose
  
      return getResponseSuccess({
        res, 
        payload: 'User created successfully!',
        serverMessage: `User ${createdUser.email} created successfully!`
      });
    } catch (error) {
      return getResponseError({ res, error });
    }
  },
  login: async ({ body }, res) => {
    try {
      const { createToken_ForUser, comparePasswords } = user_functions;
      const { email, password } = body;

      const foundUser = await db.User.findOne({ email })
      .catch(error => { throw error }); // Validation handled by mongoose
  
      const error = await comparePasswords({ email, password, storedPassword: foundUser.password });
      if (error) throw error;

      const token = createToken_ForUser(foundUser);

      return getResponseSuccess({ res, payload: { token } });
    } catch (error) {
      return getResponseError({ res, error });
    }
  }
}

export default controllers;
