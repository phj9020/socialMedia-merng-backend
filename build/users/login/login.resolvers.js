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

var _apolloServer = require("apollo-server");

var _validators = require("../../util/validators");

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var resolverFn = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref) {
    var username, password, _validateLoginInput, errors, valid, user, match, token;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            username = _ref.username, password = _ref.password;
            _validateLoginInput = (0, _validators.validateLoginInput)(username, password), errors = _validateLoginInput.errors, valid = _validateLoginInput.valid; // find user by username

            _context.next = 4;
            return _User["default"].findOne({
              username: username
            });

          case 4:
            user = _context.sent;

            if (user) {
              _context.next = 8;
              break;
            }

            errors.general = "User not Found";
            throw new _apolloServer.UserInputError("User not Found", {
              errors: errors
            });

          case 8:
            ; // compare password 

            _context.next = 11;
            return _bcryptjs["default"].compare(password, user.password);

          case 11:
            match = _context.sent;

            if (match) {
              _context.next = 15;
              break;
            }

            errors.general = "Wrong password";
            throw new _apolloServer.UserInputError("Wrong password", {
              errors: errors
            });

          case 15:
            ; // not valid throw error 

            if (valid) {
              _context.next = 18;
              break;
            }

            throw new _apolloServer.UserInputError("Error", {
              errors: errors
            });

          case 18:
            ; // create token with user's id, email. username 

            token = _jsonwebtoken["default"].sign({
              id: user.id,
              email: user.email,
              username: user.username
            }, process.env.SECRET_KEY);
            return _context.abrupt("return", _objectSpread(_objectSpread({}, user.toJSON()), {}, {
              id: user.id,
              token: token
            }));

          case 21:
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
    login: resolverFn
  }
};
exports["default"] = _default;