"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var userShema = new _mongoose["default"].Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String
});

var userModule = _mongoose["default"].model('User', userShema);

var _default = userModule;
exports["default"] = _default;