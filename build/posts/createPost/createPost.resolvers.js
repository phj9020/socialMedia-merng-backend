"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Post = _interopRequireDefault(require("../../models/Post"));

var _checkAuth = require("../../util/checkAuth");

var _pubsub = _interopRequireDefault(require("../../pubsub"));

var resolverFn = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, context) {
    var body, user, newPost, post;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            body = _ref.body;
            console.log('createPost');
            user = (0, _checkAuth.checkAuth)(context);

            if (!(body.trim("") === "")) {
              _context.next = 5;
              break;
            }

            throw new Error("Post body must not be empty");

          case 5:
            newPost = new _Post["default"]({
              body: body,
              user: user.id,
              username: user.username,
              createdAt: Date.now()
            });
            _context.next = 8;
            return newPost.save();

          case 8:
            post = _context.sent;

            _pubsub["default"].publish('NEW_POST', {
              newPost: post
            });

            return _context.abrupt("return", post);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function resolverFn(_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = {
  Mutation: {
    createPost: resolverFn
  }
};
exports["default"] = _default;