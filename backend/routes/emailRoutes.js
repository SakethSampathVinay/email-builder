import express from "express";
import multer from "multer";
import { getEmailLayout, uploadImage } from "../controllers/emailController.js";

const router = express.Router();

// Multer setup for image uploads
const upload = multer({ dest: "uploads/" });

// Routes
router.get("/getEmailLayout", getEmailLayout);
router.post("/uploadImage", upload.single("image"), uploadImage);

export default router;
