import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import pg from 'pg';

const { Pool } = pg;
const PORT = parseInt(process.env.PORT || '4000', 10);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


const typeDefs = `#graphql
  type Query {
    ping: String!
    dbTime: String!
  }
`;

const resolvers = {
  Query: {
    ping: (): string => 'Pong! Standalone Apollo API is active.',
    dbTime: async (): Promise<string> => {
      const res = await pool.query('SELECT NOW()');
      return res.rows[0].now;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function boot() {
  try {
    const client = await pool.connect();
    console.log('🐘 Neon Postgres connection pool established successfully!');
    client.release();

    const { url } = await startStandaloneServer(server, {
      listen: { port: PORT },
    });

    console.log(`API @ ${url}`);
  } catch (err) {
    console.error('Boot Sequence Failed:', err);
  }
}

boot();