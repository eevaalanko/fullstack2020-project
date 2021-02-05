require("dotenv").config();
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
const OwnChallenge = require("./models/ownChallenge");
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
    active: Boolean
    entries: [String]
  }

  type User {
    username: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    me: User
    allChallenges: [Challenge!]!
    allOwnChallenges: [OwnChallenge]
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
    editOwnChallenge(id: String, entry: String): OwnChallenge
    editChallenge(
      name: String!
      description: String
      link: String
      duration: Int
      startDate: String
    ): Challenge
    createUser(username: String!, favoriteGenre: String): User
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

      console.log("own challllll: ", ownChallenges);

      console.log("challenges: ", challenges);
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
      console.log("user is: ", currentUser);
      if (!currentUser) {
        throw new AuthenticationError("not permitted");
      }

      let ownChallenges = await OwnChallenge.find({ user: currentUser })
        .populate("user")
        .populate("challenge");

      console.log("testing... ", ownChallenges);
      return ownChallenges;
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
        startDate: args.startDate || null,
      });

      return challenge.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    editOwnChallenge: async (root, args) => {
      if (!args.entry) {
        throw new UserInputError("Missing entry");
      }
      const ownChallenge = await OwnChallenge.findById(args.id);
      if (!ownChallenge) {
        throw new UserInputError("Own challenge not found");
      }
      if (ownChallenge.entries.includes(args.entry)) {
        ownChallenge.entries = ownChallenge.entries.filter(
          (e) => e !== args.entry
        );
      } else {
        ownChallenge.entries.push(args.entry);
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
        // todo: set other passwords...
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
