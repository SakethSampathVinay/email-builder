import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import emailRoutes from "./routes/emailRoutes.js";

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api", emailRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
