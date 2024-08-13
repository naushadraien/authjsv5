"use server";
import { signIn } from "@/auth";
import { config } from "@/config/config";
import { connectDB } from "@/lib/connectDB";
import { User } from "@/models/user";
import { loginSchema, registerSchema } from "@/validationSchema/auth";
import bcrypt from "bcryptjs";
import { CredentialsSignin } from "next-auth";
import { redirect } from "next/navigation";

async function createUser(formData: FormData) {
  const { email, password, firstName, lastName } = registerSchema.parse({
    email: formData.get("email"),
    password: formData.get("password"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
  });

  if (!email || !firstName || !lastName || !password) {
    throw new Error("All fields are required");
  }

  connectDB(config.MONGOURI!);

  const existingUser = await User.findOne({
    email,
  });

  if (existingUser) {
    throw new Error("User already exists, Please login");
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = await User.create({
    email,
    password: hashedPassword,
    firstName,
    lastName,
  });
  await user.save();
  console.log("Registered successfully");
  redirect("login");
}

async function loginUser(formData: FormData) {
  const { email, password } = loginSchema.parse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  console.log(email, password);

  if (!email || !password) {
    throw new Error("All fields are required");
  }

  connectDB(config.MONGOURI!);

  const user = await User.findOne(
    {
      email,
    },
    "+password"
  );

  //or
  // const user = await User.findOne(
  //   {
  //     email,
  //   }
  // ).select('+password');

  console.log("user", user);

  if (!user) {
    throw new Error("Invalid email or password");
  }
  const isPasswordCorrect = bcrypt.compareSync(password, user?.password);
  if (!isPasswordCorrect) {
    throw new Error("Invalid email or password");
  }
  console.log(`Welcome back ${user.firstName + user.lastName}`);

  redirect("/");
}

async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
  } catch (error) {
    const someError = error as CredentialsSignin;
    return someError.cause;
  }
  redirect("/");
}

const getAllUsers = async () => {
  connectDB(config.MONGOURI!);
  const users = await User.find({});
  return users;
};

export { createUser, loginUser, login, getAllUsers };
