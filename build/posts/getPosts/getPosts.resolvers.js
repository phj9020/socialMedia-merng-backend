"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Post = _interopRequireDefault(require("../../models/Post"));

var _default = {
  Query: {
    getPosts: function getPosts() {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var posts;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log('getPosts');
                _context.prev = 1;
                _context.next = 4;
                return _Post["default"].find().sort({
                  createdAt: -1
                });

              case 4:
                posts = _context.sent;
                return _context.abrupt("return", posts);

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](1);
                throw new Error(_context.t0);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 8]]);
      }))();
    }
  }
};
exports["default"] = _default;