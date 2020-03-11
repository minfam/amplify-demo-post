const graphql = require("graphql");
const _ = require("lodash");

//dumy data
const userData = [
  { id: "1", name: "Bond", age: 34, profession: "Coach" },
  { id: "2", name: "Jame", age: 33, profession: "Baker" },
  { id: "3", name: "Lee", age: 37, profession: "Programer" },
  { id: "4", name: "Park", age: 39, profession: "Teacher" }
];

const hobbyData = [
  { id: "1", title: "Hiking", description: "Leo nui", userId: "2" },
  { id: "2", title: "Programing", description: "Using computer", userId: "2" },
  { id: "3", title: "Swimming", description: "Get in the water", userId: "3" },
  { id: "4", title: "Rowing", description: "Sweat", userId: "4" }
];

const postData = [
  { id: "1", comment: "GraphQL is Amazing", userId: "1" },
  { id: "2", comment: "The world change", userId: "1" },
  { id: "3", comment: "Hello all", userId: "3" }
];

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = graphql;

// Create types
const UserType = new GraphQLObjectType({
  name: "User",
  description: "Documentation for user...",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    profession: { type: GraphQLString },
    post: { 
      type: new GraphQLList(PostType),
      resolve: (parent, args) => _.filter(postData, { userId: parent.id })
    },
    hobby: { 
      type: new GraphQLList(HobbyType),
      resolve: (parent, args) => _.filter(hobbyData, { userId: parent.id })
    }
  })
});

//Hobby types
const HobbyType = new GraphQLObjectType({
  name: "Hobby",
  description: "Documentation for hobby...",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    user: {
      type: UserType,
      resolve: (parent, args) => _.find(userData, { id: parent.userId })
    }
  })
});

//Post types
const PostType = new GraphQLObjectType({
  name: "Post",
  description: "Documentation for post...",
  fields: () => ({
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    user: {
      type: UserType,
      resolve: (parent, args) => _.find(userData, { id: parent.userId })
    }
  })
});

//Root query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Description",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => _.find(userData, { id: args.id })
    },
    hobby: {
      type: HobbyType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => _.find(hobbyData, { id: args.id })
    },
    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => _.find(postData, { id: args.id })
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
