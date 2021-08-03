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
    var postId, commentId, post, user, commentExist, isMine;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            postId = _ref.postId, commentId = _ref.commentId;
            _context.next = 3;
            return _Post["default"].findById(postId);

          case 3:
            post = _context.sent;
            user = (0, _checkAuth.checkAuth)(context);
            console.log("current User : ", user); // check if post exist

            if (post) {
              _context.next = 8;
              break;
            }

            throw new Error("Post not Found");

          case 8:
            // check if comment exist 
            commentExist = post.comments.find(function (comment) {
              return comment._id.toString() === commentId;
            });

            if (commentExist) {
              _context.next = 11;
              break;
            }

            throw new Error("Comment is not exist");

          case 11:
            // check if comment is mine 
            isMine = post.comments.find(function (comment) {
              return comment.username === user.username;
            });

            if (isMine) {
              _context.next = 14;
              break;
            }

            throw new _apolloServer.AuthenticationError("Only Comment owner can delete comment");

          case 14:
            // delete comments
            post.comments.pull({
              _id: commentId
            }); // save post 

            _context.next = 17;
            return post.save();

          case 17:
            return _context.abrupt("return", post);

          case 18:
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
    deleteComment: resolverFn
  }
};
exports["default"] = _default;