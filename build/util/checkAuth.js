"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkAuth = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _apolloServer = require("apollo-server");

var checkAuth = function checkAuth(context) {
  var authHeader = context.req.headers.authorization;

  if (authHeader) {
    // Bearer ....
    var token = authHeader.split('Bearer ')[1];

    if (token) {
      try {
        var user = _jsonwebtoken["default"].verify(token, process.env.SECRET_KEY);

        return user;
      } catch (err) {
        throw new _apolloServer.AuthenticationError('Invalid/Expired token');
      }
    }

    throw new Error("Authentication token must be 'Bearer [token]");
  }

  throw new Error('Authorization header must be provided');
}; // export const getUser = (context) => {
//     const token = context.req.headers.token;
//     if(token) {
//         try {
//             const user = jwt.verify(token, process.env.SECRET_KEY);
//             return user;
//         } catch (err) {
//             throw new AuthenticationError('Invalid/Expired token');
//         }
//     }
//     throw new Error('token header must be provided');
// }


exports.checkAuth = checkAuth;