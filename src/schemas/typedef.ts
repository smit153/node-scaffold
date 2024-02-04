const typeDefs = `#graphql
type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
  }
  
  type AuthPayload {
    token: String!
    user: User!
  }

  type protectedData {
      user: User!
      protectedData: String!
  }

  type Query {
    getData(token: String!): protectedData
  }

  type Mutation {
    signup(name: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
  }
`;
export { typeDefs };
