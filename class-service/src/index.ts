import { ApolloServer } from 'apollo-server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import mongoose from 'mongoose';
import typeDefs from './schema';
import resolvers from './resolvers';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const PORT = parseInt(process.env.PORT || "4002");

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
  context: ({ req }) => {
    const auth = req.headers.authorization || '';
    try {
      const token = auth.replace('Bearer ', '');
      const user = jwt.verify(token, JWT_SECRET);
      return { user };
    } catch {
      return {};
    }
  },
});

let httpServer: any;

export const startServer = async (port = 4002) => {
  console.log('Connecting to MongoDB with URI:', process.env.MONGO_URI);
  await mongoose.connect(process.env.MONGO_URI!);
  httpServer = await server.listen({ port });
  console.log(`🚀 User service ready at ${httpServer.url}`);
  return httpServer;
};

export const stopServer = async () => {
  await mongoose.disconnect();
  if (httpServer) await httpServer.server.close();
};

startServer(PORT).catch((err) => {
  console.error("❌ Failed to start user service:", err);
});
