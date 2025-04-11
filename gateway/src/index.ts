import { ApolloServer } from "apollo-server";
import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://mongo:27017/gateway-service");

    const gateway = new ApolloGateway({
      supergraphSdl: new IntrospectAndCompose({
        subgraphs: [
          { name: 'user', url: 'http://user-service:4001/graphql' },
          { name: 'class', url: 'http://class-service:4002/graphql' },
          { name: 'grade', url: 'http://grade-service:4003/graphql' },
        ],
      }),
    });


    const server = new ApolloServer({
      gateway,
      cors: {
        origin: "*",
      },
    });

    const { url } = await server.listen({ port: 4000 });
    console.log(`🚀 Gateway service ready at ${url}`);
  } catch (err) {
    console.error("❌ Failed to start server:", err);
  }
};

startServer();
