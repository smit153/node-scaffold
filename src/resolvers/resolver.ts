import { signup, login, validateToken } from "../controllers/userController";

const resolvers = {
  Query: {
    getData:validateToken,
  },
  Mutation: {
    signup,
    login,
  },
};

export { resolvers };
