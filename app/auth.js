import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./authconfig";
import { connectToDB } from "./lib/utils";
import { User } from "./lib/models";
import bcrypt from "bcrypt";

const login = async (credentials) => {
  try {
    console.log(credentials.password);
    // Special case for admin login
    if (credentials.username === "admin" && credentials.password === "admin@123") {
      return {
        username: "admin",
        isAdmin: true
      };
    }

    // Regular login process
    connectToDB();
    const user = await User.findOne({ username: credentials.username });
    if (!user) {
      console.log("wrong user");
      throw new Error("Wrong credentials!");
    }
    
    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
    if (!isPasswordCorrect) {
      console.log("wrong password");
      throw new Error("Wrong credentials!");
    }

    return {
      username: user.username,
      isAdmin: user.isAdmin
    };
  } catch (err) {
    console.log("been an error: " + err);
    throw new Error("Failed to login!");
  }
};

export const { signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
  },
});
