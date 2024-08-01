import jwt from 'jsonwebtoken';

import { getResponseError } from '../lib/handleResponse.js';
import { ROUTE_PERMISSIONS_SETTINGS } from '../config/permissions.js';


export const authRequired = (req, res, next) => {
  try {  
    const verifyToken = ({ headers }) => {
      const getTokenFromHeaders = (headers) => { return headers['authorization'] };
      const validateToken = (token) => {
        let decodedUser, customError;
        jwt.verify(token, process.env.JWT_SECRET, (error, _decodedUser) => {
          if (error || !_decodedUser) customError = { 
            error,
            customThrow: true, 
            userMessage: 'You are not authorized. Please login and try again',
            statusCode: 401  
          }
          decodedUser = _decodedUser;
        });
        return { decodedUser, customError }
      }
    
    
      const token = getTokenFromHeaders(headers);
      const { decodedUser, customError } = validateToken(token);
    
      if (customError) throw customError
      return decodedUser;
    };
    const verifyRoles = ({ originalUrl, method, currentUser }) => {
      const getUrlSections = (originalUrl) =>{
        const url = originalUrl.replace('/api/v1/', '');
        let [ baseSection, subCall ] = url.split('/')
        if (subCall === '') subCall = '/';
        return { baseSection, subCall };
      }
      const getRolePermissions = ({ baseSection, subCall, method }) => {
        return ROUTE_PERMISSIONS_SETTINGS[baseSection][subCall][method]; // = ticket.'/'.POST
      }
      const splitPermissions = (permissions) => {
        if (permissions.constructor !== Array) {
          const { baseCall, ...specialPermissions } = permissions;
          return { routePermissions: baseCall, specialPermissions };
        }
        return { routePermissions: permissions };
      }
      const validate_user_has_corrrect_roles = (routePermissions, currentUser) => {
        const isUserRoleValid = (routePermissions, currentUser) => (!routePermissions.includes(currentUser.role))
        if (isUserRoleValid(routePermissions, currentUser)) {
          return {
                  customThrow: true,
                  userMessage: 'You do not have permission to make this call',
                  error: `User ${currentUser.email} does not have correct role to run ticket/create`,
                  statusCode: 401
                };
        }
      }
    
      const { baseSection, subCall } = getUrlSections(originalUrl);
      const permissions = getRolePermissions({ baseSection, subCall, method });
      const { routePermissions } = splitPermissions(permissions);
      const error = validate_user_has_corrrect_roles(routePermissions, currentUser);
      if (error) throw error;
    }; 

    req.currentUser = verifyToken(req); // dedcodedUser stored in req.currentUser for use in controllers
    verifyRoles(req);

    next(); // go to next function - command for middleware
  } catch (error) {
    return getResponseError({ res, error });
  }
};