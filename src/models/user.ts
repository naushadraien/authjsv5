import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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
      maxLength: 20,
      select: false,
    },
    role: {
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

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
