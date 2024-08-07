"use server";
import { config } from "@/config/config";
import { connectDB } from "@/lib/connectDB";
import { User } from "@/models/user";
import { loginSchema, registerSchema } from "@/validationSchema/auth";
import bcrypt from "bcryptjs";
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

export { createUser, loginUser };
