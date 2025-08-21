import express from "express";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import cors from "cors";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/use/ws";

import { pubsub } from "./pubsub.js";
import { typeDefs } from "../schema/typeDefs.js";
import { resolvers } from "../schema/resolvers.js";

import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const secretkey = "supersecret"; // move to .env in real app

export async function createExpressServer() {
  const app = express();
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });
  await server.start();

  // Context for HTTP (queries & mutations)
  app.use(
    "/graphql",
    cors(),
    express.json(),
    expressMiddleware(server, {
      // Inside your expressMiddleware context
      context: async ({ req }) => {
        const authHeader = req.headers.authorization;
        let user = null;

        if (authHeader?.startsWith("Bearer ")) {
          const token = authHeader.split(" ")[1];
          try {
            const decoded = jwt.verify(token, secretkey); // Verify token
            user = await User.findById(decoded.id); // Attach user to context
          } catch (err) {
            if (err.name === "TokenExpiredError") {
              console.warn("Token expired, please login again");
            } else {
              console.error("Invalid token:", err.message);
            }
          }
        }

        return { pubsub, user }; // context.user will be null if token is invalid/expired
      },
    })
  );

  //  Context for WebSocket (subscriptions)
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  useServer(
    {
      schema,
      context: async () => ({ pubsub }), //  inject pubsub in WS context
    },
    wsServer
  );

  return httpServer;
}

export const createApolloServer = createExpressServer;
