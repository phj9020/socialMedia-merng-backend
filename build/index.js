"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _http = require("http");

var _graphql = require("graphql");

var _subscriptionsTransportWs = require("subscriptions-transport-ws");

var _schema = require("@graphql-tools/schema");

var _express = _interopRequireDefault(require("express"));

var _apolloServerExpress = require("apollo-server-express");

var _schema2 = require("./schema");

var _mongoose = _interopRequireDefault(require("mongoose"));

require("dotenv").config();

(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  var app, httpServer, schema, server, PORT;
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          app = (0, _express["default"])();
          httpServer = (0, _http.createServer)(app);
          schema = (0, _schema.makeExecutableSchema)({
            typeDefs: _schema2.typeDefs,
            resolvers: _schema2.resolvers,
            playground: true,
            introspection: true
          });
          server = new _apolloServerExpress.ApolloServer({
            schema: schema,
            context: function context(_ref2) {
              var req = _ref2.req;
              return {
                req: req
              };
            }
          });
          _context.next = 6;
          return server.start();

        case 6:
          server.applyMiddleware({
            app: app
          });

          _subscriptionsTransportWs.SubscriptionServer.create({
            schema: schema,
            execute: _graphql.execute,
            subscribe: _graphql.subscribe
          }, {
            server: httpServer,
            path: server.graphqlPath
          });

          PORT = process.env.PORT;

          _mongoose["default"].connect(process.env.MONGO_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          }).then(function () {
            console.log("MongoDB connected");
            httpServer.listen(PORT, function () {
              return console.log("Server is now running on http://localhost:".concat(PORT, "/graphql"));
            });
          })["catch"](function (err) {
            return console.error(err);
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}))();