"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _apolloServer = require("apollo-server");

var _Post = _interopRequireDefault(require("../../models/Post"));

var _checkAuth = require("../../util/checkAuth");

var resolverFn = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, context) {
    var postId, user, post;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            postId = _ref.postId;
            user = (0, _checkAuth.checkAuth)(context);
            _context.next = 4;
            return _Post["default"].findById(postId);

          case 4:
            post = _context.sent;
            _context.prev = 5;

            if (!(user.username === post.username)) {
              _context.next = 12;
              break;
            }

            _context.next = 9;
            return post["delete"]();

          case 9:
            return _context.abrupt("return", 'Post deleted successfully');

          case 12:
            throw new _apolloServer.AuthenticationError('Action not allowed');

          case 13:
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](5);
            throw new Error(_context.t0);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 15]]);
  }));

  return function resolverFn(_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = {
  Mutation: {
    deletePost: resolverFn
  }
};
exports["default"] = _default;