"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServer = require("apollo-server");

var _templateObject;

var _default = (0, _apolloServer.gql)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n    type Subscription {\n        newPost: Post!\n    }\n    type Comment {\n        id: ID!\n        body: String!\n        username: String!\n        createdAt: String!\n    }\n    type Like {\n        id: ID!\n        username: String!\n        createdAt: String!\n    }\n    type Post {\n        id: ID!\n        body: String!\n        createdAt: String!\n        username: String!\n        comments: [Comment]!\n        likes: [Like]!\n        likeCount: Int!\n        commentCount: Int!\n    }\n"])));

exports["default"] = _default;