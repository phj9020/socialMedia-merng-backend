"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _User = _interopRequireDefault(require("../../models/User"));

var _checkAuth = require("../../util/checkAuth");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var resolverFn = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, __, context) {
    var user, userDb, token;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = (0, _checkAuth.checkAuth)(context);
            _context.next = 3;
            return _User["default"].findOne({
              _id: user.id
            });

          case 3:
            userDb = _context.sent;
            token = _jsonwebtoken["default"].sign({
              id: user.id,
              email: user.email,
              username: user.username
            }, process.env.SECRET_KEY);
            return _context.abrupt("return", {
              id: user.id,
              email: user.email,
              token: token,
              username: user.username,
              createdAt: userDb.createdAt
            });

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function resolverFn(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = {
  Query: {
    me: resolverFn
  }
};
exports["default"] = _default;