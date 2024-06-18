import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { connectToDb } from "./utils";
import { User } from "./models";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { authConfig } from "./auth.config";

const login = async (credentials: any) => {
  try {
    connectToDb();
    const user = await User.findOne({ username: credentials.username });

    if (!user) {
      throw Error("Wrong credentials");
    }

    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

    if (!isPasswordCorrect) {
      throw new Error("Wrong credentials!")
    }

    return user;

  } catch (error) {
    console.log(error);
    throw new Error("Failed to login");
  }
}

export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    GitHub,
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials)
          return user;
        } catch (error) {
          console.log('auth error: ', error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }: any) {
      console.log(`Account provider: ${account.provider}`)
      if (account.provider === "github") {
        connectToDb();

        try {
          const user = await User.findOne({ email: profile.email });
          if (!user) {
            const newUser = new User({
              username: profile.login,
              email: profile.email,
              image: profile.avatar_url,
            })
            await newUser.save();
          }
        } catch (error) {
          console.log(error);
          return false
        }
      }
      return true;
    },
    ...authConfig.callbacks,
  },
});
