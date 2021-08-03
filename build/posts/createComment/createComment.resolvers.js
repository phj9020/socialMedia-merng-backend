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

var _apolloServer = require("apollo-server");

var resolverFn = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, context) {
    var postId, body, user, post;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            postId = _ref.postId, body = _ref.body;
            user = (0, _checkAuth.checkAuth)(context);
            _context.next = 4;
            return _Post["default"].findById(postId);

          case 4:
            post = _context.sent;

            if (!(body.trim() === '')) {
              _context.next = 7;
              break;
            }

            throw new _apolloServer.UserInputError("Empty Comment", {
              errors: {
                body: 'Comment body must not be empty'
              }
            });

          case 7:
            ;

            if (!post) {
              _context.next = 15;
              break;
            }

            post.comments.unshift({
              body: body,
              username: user.username,
              createdAt: Date.now()
            });
            _context.next = 12;
            return post.save();

          case 12:
            return _context.abrupt("return", post);

          case 15:
            throw new _apolloServer.UserInputError("Post not Found");

          case 16:
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
    createComment: resolverFn
  }
};
exports["default"] = _default;