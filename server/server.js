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
import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
await connectDB();

app.use(express.json());
app.use(cors({
    origin: ["https://loyola-tracker.onrender.com", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));

app.use("/api/auth", router);
app.use("/data", express.static(path.join(__dirname, "excel-data")));
app.use("/api/details", studentRouter);

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "https://loyola-tracker.onrender.com",
        credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("Client connected to Socket.IO");
    initSocket(io, socket);
    socket.emit("welcome", "Connected to socket!");
});

app.get("/", (_, res) => res.send("<h2>✅ Loyola Tracker Server Running</h2>"));

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () =>
    console.log(`🚀 Server & Socket running at http://localhost:${PORT}`)
);

// 🔥 Prevent Render Sleep (keep-alive ping)
if (process.env.RENDER) {
    setInterval(() => {
        axios
            .get("https://loyola-tracker-backend.onrender.com")
            .then(() => console.log("💤 Keep-alive ping sent"))
            .catch(() => console.log("⚠️ Keep-alive ping failed"));
    }, 4 * 60 * 1000); // every 4 min
}