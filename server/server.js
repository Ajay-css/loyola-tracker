import express from "express";
import dotenv from "dotenv";
import router from "./routes/userRouter.js";
import connectDB from "./config/db.js";
import studentRouter from "./routes/studentRoute.js";
import { initSocket } from "./controllers/studentController.js";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import path from "path";
import http from "http";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Environment Configuration

dotenv.config();

// Database Connection

await connectDB();

// middlewares of this Application

app.use(express.json());
app.use(cors({
    origin: "http://localhost:4173", // frontend URL changed to production
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));
app.use('/api/auth', router)
app.use('/data', express.static(path.join(__dirname, "excel-data")));
app.use('/api/details', studentRouter)

// Socket.IO Initialization

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:4173" // frontend URL changed to production
    }
});

io.on("connection", (socket) => {
    console.log("Client Socket Connected");
    initSocket(io, socket);
    socket.emit("welcome", "Welcome to the Socket.IO Server!");
    socket.on("sendData", (data) => {
        console.log("Data received from client:", data);
        // You can handle the data here, e.g., save it to the database or broadcast
        io.emit("receiveData", data);
    });
});

// Server Response in Webpage

app.get("/", (_, res) => res.send("<h1>Express Server is Working Fine!</h1>"));

// Server Starting

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => console.log(`Socket.io + Server is Running on http://localhost:${PORT}`));