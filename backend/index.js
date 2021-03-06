require("dotenv").config();
const {
  AuthenticationError,
  UserInputError,
  ApolloServer,
  gql,
} = require("apollo-server");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "NEED_HERE_A_SECRET_KEY";
const Challenge = require("./models/challenge");
const OwnChallenge = require("./models/ownChallenge");
const User = require("./models/user");

let MONGODB_URI = process.env.MONGODB_URI;

if (process.env.NODE_ENV === "test") {
  MONGODB_URI = process.env.TEST_MONGODB_URI;
}

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
    id: ID!
    name: String!
    description: String
    link: String
    duration: Int
    ownChallenges: [OwnChallenge]
  }

  type OwnChallenge {
    id: ID!
    challenge: Challenge
    user: User
    description: String
    duration: Int
    startDate: String
    endDate: String
    abortDate: String
    active: Boolean
    entries: [String]
  }

  type User {
    username: String!
    password: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    me: User
    allChallenges: [Challenge!]!
    allOwnChallenges: [OwnChallenge]
    activeOwnChallenges: [OwnChallenge]
    findChallenge(name: String!): Challenge
    activeChallenges: [Challenge]
  }
  type Mutation {
    createChallenge(
      name: String!
      description: String
      link: String
      duration: Int
    ): Challenge
    createOwnChallenge(
      userID: String
      challengeID: String
      description: String
      startDate: String
      endDate: String
      active: Boolean
    ): OwnChallenge
    editOwnChallenge(
      id: String
      entry: String
      stop: Boolean
      abortDate: String
    ): OwnChallenge
    editChallenge(
      name: String!
      description: String
      link: String
      duration: Int
      startDate: String
    ): Challenge
    createUser(username: String!, password: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    allChallenges: async (root, args, context) => {
      const currentUser = context.currentUser;
      const challenges = await Challenge.find({});
      const ownChallenges = await OwnChallenge.find({ user: currentUser })
        .populate("user")
        .populate("challenge");

      return challenges.map((challenge) => ({
        id: challenge.id,
        name: challenge.name,
        link: challenge.link,
        description: challenge.description,
        duration: challenge.duration,
        ownChallenges: ownChallenges.filter(
          (oc) => oc.challenge.id === challenge.id
        ),
      }));
    },

    allOwnChallenges: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not permitted");
      }

      return OwnChallenge.find({user: currentUser})
          .populate("user")
          .populate("challenge");
    },

    activeOwnChallenges: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not permitted");
      }

      let ownChallenges = await OwnChallenge.find({ user: currentUser })
        .populate("user")
        .populate("challenge");

      return ownChallenges.filter((oc) => oc.active === true);
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
      challenge.name = args.name || challenge.name;
      challenge.description = args.description || challenge.description;
      challenge.duration = args.duration || challenge.duration;
      challenge.link = args.link || challenge.link;
      challenge.startDate = args.startDate || challenge.startDate;
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
        link: args.link || null,
        duration: args.duration || null,
      });

      return challenge.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    editOwnChallenge: async (root, args) => {
      console.log("argggs: ", args);
      const ownChallenge = await OwnChallenge.findById(args.id);
      if (!ownChallenge) {
        throw new UserInputError("Own challenge not found");
      }
      if (args.entry) {
        if (ownChallenge.entries.includes(args.entry)) {
          ownChallenge.entries = ownChallenge.entries.filter(
            (e) => e !== args.entry
          );
        } else {
          ownChallenge.entries.push(args.entry);
        }
      }
      if (args.stop) {
        ownChallenge.active = false;
      }
      if (args.abortDate) {
        ownChallenge.abortDate = args.abortDate;
      }
      try {
        await ownChallenge.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return ownChallenge;
    },
    createOwnChallenge: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not permitted");
      }
      let challenge = await Challenge.findById(args.challengeID);
      let user = await User.findById(args.userID);
      const ownChallenge = new OwnChallenge({
        ...args,
        challenge,
        user,
        active: true,
        entries: [],
      });
      return ownChallenge.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    createUser: (root, args) => {
      const user = new User({
        username: args.username,
        password: args.password,
      });

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== user.password) {
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
  introspection: true,
  playground: true,
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser };
    }
  },
});

server.listen(process.env.PORT || 4000).then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});
