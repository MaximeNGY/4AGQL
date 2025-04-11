import jwt from "jsonwebtoken";
import User from "./models/User";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "secret";

const createToken = (user: any) => {
  return jwt.sign(
    { userId: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
};

const resolvers = {
  Query: {
    me: async (_: any, __: any, { user }: any) => {
      if (!user) throw new Error("Not authenticated");
      return await User.findById(user.userId);
    },
    users: async () => await User.find(),

    getUserById: async (_: any, { id }: { id: string }) => {
      return await User.findById(id);
    },
  },
  Mutation: {
    register: async (_: any, { email, pseudo, password, role }: any) => {
      const existing = await User.findOne({ email });
      if (existing) throw new Error("User already exists");
      const user = new User({ email, pseudo, password, role });
      await user.save();
      const token = createToken(user);
      return { token, user };
    },
    login: async (_: any, { email, password }: any) => {
      const user = await User.findOne({ email });
      if (!user || !(await user.comparePassword(password))) {
        throw new Error("Invalid credentials");
      }
      const token = createToken(user);
      return { token, user };
    },
    updateUser: async (_: any, { pseudo }: any, { user }: any) => {
      if (!user) throw new Error("Not authenticated");
      const updated = await User.findByIdAndUpdate(
        user.userId,
        { pseudo },
        { new: true }
      );
      return updated;
    },
    deleteUser: async (_: any, __: any, { user }: any) => {
      if (!user) throw new Error("Not authenticated");
      await User.findByIdAndDelete(user.userId);
      return true;
    },
  },
};

export default resolvers;