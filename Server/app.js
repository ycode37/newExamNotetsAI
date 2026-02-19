import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/connectDB.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import notesRouter from "./routes/generate.route.js";
import pdfRouter from "./routes/pdf.route.js";
dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT;
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/notes", notesRouter);
app.use("/api/pdf", pdfRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  connectDB();
});
