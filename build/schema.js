"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = exports.typeDefs = void 0;

var _graphqlTools = require("graphql-tools");

// load Type definition
var loadedTypes = (0, _graphqlTools.loadFilesSync)("".concat(__dirname, "/**/*.typeDefs.js"));
var typeDefs = (0, _graphqlTools.mergeTypeDefs)(loadedTypes); // load resolver -> queries and mutations

exports.typeDefs = typeDefs;
var loadedResolvers = (0, _graphqlTools.loadFilesSync)("".concat(__dirname, "/**/*.resolvers.js"));
var resolvers = (0, _graphqlTools.mergeResolvers)(loadedResolvers);
exports.resolvers = resolvers;