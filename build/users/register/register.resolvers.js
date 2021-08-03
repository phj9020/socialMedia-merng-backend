"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _User = _interopRequireDefault(require("../../models/User"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _apolloServer = require("apollo-server");

var _validators = require("../../util/validators");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var resolverFn = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref) {
    var _ref$registerInput, username, password, confirmPassword, email, _validateRegisterInpu, valid, errors, alreadyExistEmail, alreadyExistUsername, newUser, result, token;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref$registerInput = _ref.registerInput, username = _ref$registerInput.username, password = _ref$registerInput.password, confirmPassword = _ref$registerInput.confirmPassword, email = _ref$registerInput.email;
            // validate user data
            _validateRegisterInpu = (0, _validators.validateRegisterInput)(username, password, confirmPassword, email), valid = _validateRegisterInpu.valid, errors = _validateRegisterInpu.errors;

            if (valid) {
              _context.next = 4;
              break;
            }

            throw new _apolloServer.UserInputError('Errors', {
              errors: errors
            });

          case 4:
            _context.next = 6;
            return _User["default"].findOne({
              email: email
            });

          case 6:
            alreadyExistEmail = _context.sent;

            if (!alreadyExistEmail) {
              _context.next = 9;
              break;
            }

            throw new _apolloServer.UserInputError("Email is already in use", {
              errors: {
                email: "This email is taken"
              }
            });

          case 9:
            _context.next = 11;
            return _User["default"].findOne({
              username: username
            });

          case 11:
            alreadyExistUsername = _context.sent;

            if (!alreadyExistUsername) {
              _context.next = 14;
              break;
            }

            throw new _apolloServer.UserInputError("Username is already in use", {
              errors: {
                username: "This username is taken"
              }
            });

          case 14:
            _context.next = 16;
            return _bcryptjs["default"].hash(password, 12);

          case 16:
            password = _context.sent;
            // create new user
            newUser = new _User["default"]({
              username: username,
              password: password,
              email: email,
              createdAt: Date.now()
            }); // save in MongoDB 

            _context.next = 20;
            return newUser.save();

          case 20:
            result = _context.sent;
            // create token with id, email. username 
            token = _jsonwebtoken["default"].sign({
              id: result.id,
              email: result.email,
              username: result.username
            }, process.env.SECRET_KEY, {
              expiresIn: "24h"
            });
            return _context.abrupt("return", _objectSpread(_objectSpread({}, result.toJSON()), {}, {
              id: result.id,
              token: token
            }));

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function resolverFn(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = {
  Mutation: {
    register: resolverFn
  }
};
exports["default"] = _default;