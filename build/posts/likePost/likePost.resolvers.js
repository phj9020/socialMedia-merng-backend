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

var resolverFn = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, context) {
    var postId, post, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            postId = _ref.postId;
            _context.next = 3;
            return _Post["default"].findById(postId);

          case 3:
            post = _context.sent;
            user = (0, _checkAuth.checkAuth)(context); // check if post exist 

            if (post) {
              _context.next = 7;
              break;
            }

            throw new Error("Post not Found");

          case 7:
            // check if already liked
            if (post.likes.find(function (like) {
              return like.username === user.username;
            })) {
              // post already liked, unlike post
              post.likes = post.likes.filter(function (like) {
                return like.username !== user.username;
              });
            } else {
              // like post 
              post.likes.push({
                username: user.username,
                createdAt: Date.now()
              });
            }

            _context.next = 10;
            return post.save();

          case 10:
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
    likePost: resolverFn
  }
};
exports["default"] = _default;