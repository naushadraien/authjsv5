import { UserModalType } from "@/types/auth";
import mongoose, { Document } from "mongoose";

const userSchema: mongoose.Schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide last name"],
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
    },
    password: {
      type: String,
      minLength: 8,
      select: false,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    image: {
      type: String,
    },
    //coming from google and github providers
    authProviderId: {
      type: String,
    },
  },
  { timestamps: true }
);

export const User: mongoose.Model<UserModalType> =
  mongoose.models?.User || mongoose.model<UserModalType>("User", userSchema);
