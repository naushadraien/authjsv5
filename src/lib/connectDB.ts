import mongoose from "mongoose";
export const connectDB = (uri: string) => {
  mongoose
    .connect(uri, {
      dbName: "authV5",
    })
    .then((connection) =>
      console.log(
        `DB connected successfully to the host ${connection.connection.host}`
      )
    )
    .catch((error) =>
      console.log(`Error while connecting DB with message: ${error.message}`)
    );
};
