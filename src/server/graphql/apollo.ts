import { ApolloServer } from 'apollo-server-express';
import { resolvers } from './resolver';
import typeDefs from './schema.graphql';

export const apollo = new ApolloServer({ typeDefs, resolvers });
