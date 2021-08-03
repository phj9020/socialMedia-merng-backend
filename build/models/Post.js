"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var postSchema = new _mongoose["default"].Schema({
  body: String,
  username: String,
  createdAt: String,
  comments: [{
    body: String,
    username: String,
    createdAt: String
  }],
  likes: [{
    username: String,
    createdAt: String
  }],
  user: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'users'
  }
});

var PostModule = _mongoose["default"].model('Post', postSchema);

var _default = PostModule;
exports["default"] = _default;