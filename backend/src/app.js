import express from "express";
import { createServer } from "node:http";

import { Server } from "socket.io";

import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./routes/users.routes.js";

import dotenv from "dotenv";
dotenv.config();


// const app = express();

// app.get("/home", (req,res) => {
//     return res.json({ "hello" : "world!!" } )
// });



// const start = async () => {

//     app.listen(8000, () => {
//         console.log("Listen on port 8000")
//     });
// }
const app = express();
const server = createServer(app);
const io = connectToSocket(server);


app.set("port", (process.env.PORT || 8000))
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

// const start = async () => {
//     app.set("mongo_user")
//     const connectionDb = await mongoose.connect("mongodb+srv://shivsarra_db_user:Ayushtiwari@zoomcluster0.c850m6w.mongodb.net/?appName=ZoomCluster0")

//     console.log(`MONGO Connected DB HOst: ${connectionDb.connection.host}`)
//     server.listen(app.get("port"), () => {
//         console.log("LISTENIN ON PORT 8000")
//     });
// }

// const start = async () => {
//     try {
//         // MongoDB Atlas connection (TLS enabled)
//         const connectionDb = await mongoose.connect(
//             process.env.MONGO_URI || "mongodb+srv://shivsarra_db_user:Ayushtiwari@zoomcluster0.c850m6w.mongodb.net/?retryWrites=true&w=majority&tls=true",
//             {
//                 useNewUrlParser: true,
//                 useUnifiedTopology: true,
//             }
//         );

//         console.log(`MongoDB Connected! Host: ${connectionDb.connection.host}`);

//         // Start server
//         app.listen(PORT, () => {
//             console.log(`Server listening on PORT ${PORT}`);
//         });
//     } catch (err) {
//         console.error("Failed to start server:", err);
//         process.exit(1);  // crash if DB connection fails
//     }
// };

// const start = async () => {
//   try {
//     const connectionDb = await mongoose.connect(
//       process.env.MONGO_URI || "mongodb+srv://shivsarra_db_user:Ayushtiwari@zoomcluster0.c850m6w.mongodb.net/?retryWrites=true&w=majority&tls=true",
//       {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       }
//     );

//     console.log(`MongoDB Connected! Host: ${connectionDb.connection.host}`);

//     // Start server
//     app.listen(PORT, () => {
//       console.log(`Server listening on PORT ${PORT}`);
//     });
//   } catch (err) {
//     console.error("Failed to start server:", err);
//     process.exit(1);
//   }
// };


const start = async () => {
  try {
    const connectionDb = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected! Host: ${connectionDb.connection.host}`);

    app.listen(PORT, () => {
      console.log(`Server running on PORT ${PORT}`);
    });

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

start();