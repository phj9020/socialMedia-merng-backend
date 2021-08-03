"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Post = _interopRequireDefault(require("../../models/Post"));

var resolverFn = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref) {
    var postId, post;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            postId = _ref.postId;
            _context.prev = 1;
            _context.next = 4;
            return _Post["default"].findById(postId);

          case 4:
            post = _context.sent;

            if (post) {
              _context.next = 9;
              break;
            }

            throw new Error("Post not Found");

          case 9:
            return _context.abrupt("return", post);

          case 10:
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](1);
            throw new Error(_context.t0);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 12]]);
  }));

  return function resolverFn(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = {
  Query: {
    getPost: resolverFn
  }
};
exports["default"] = _default;