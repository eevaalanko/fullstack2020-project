require('dotenv').config()
const {
  AuthenticationError,
  UserInputError,
  ApolloServer,
  gql,
} = require("apollo-server");
const { PubSub } = require("apollo-server");
const pubsub = new PubSub();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "NEED_HERE_A_SECRET_KEY";
const Challenge = require("./models/challenge");
const User = require("./models/user");

const MONGODB_URI = process.env.MONGODB_URI;
console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = gql`
  type Challenge {
    name: String!
    description: String
  }

  type User {
    username: String!
    favoriteGenre: String
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    me: User
    allChallenges: [Challenge!]!
    findChallenge(name: String!): Challenge
  }
  type Mutation {
    createChallenge(name: String!, description: String): Challenge
    editChallenge(name: String!, description: String): Challenge
    createUser(username: String!, favoriteGenre: String): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    allChallenges: async () => {
      return await Challenge.find({});
    },
    findChallenge: (root, args) => Challenge.findOne({ name: args.name }),
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    editChallenge: async (root, args) => {
      if (!args.name) {
        throw new UserInputError("Missing name");
      }
      if (args.name.length < 4) {
        throw new UserInputError("Name input is too short");
      }
      const challenge = await Challenge.findOne({ name: args.name });
      if (!challenge) {
        throw new UserInputError("Challenge not found");
      }
      challenge.description = args.description;
      try {
        await challenge.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return challenge;
    },
    createChallenge: (root, args) => {
      const challenge = new Challenge({
        name: args.name,
        description: args.description || null,
      });

      return challenge.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    createUser: (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre || null,
      });

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id).populate(
        "friends"
      );
      return { currentUser };
    }
  },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});
