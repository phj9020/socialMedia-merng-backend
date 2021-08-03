"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pubsub = _interopRequireDefault(require("../pubsub"));

var _default = {
  Subscription: {
    newPost: {
      subscribe: function subscribe() {
        return _pubsub["default"].asyncIterator('NEW_POST');
      }
    }
  },
  // computed fields for Post
  // parent aargument brings type Post itself
  Post: {
    likeCount: function likeCount(parent) {
      return parent.likes.length;
    },
    commentCount: function commentCount(parent) {
      return parent.comments.length;
    }
  }
};
exports["default"] = _default;