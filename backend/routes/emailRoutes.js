import express from "express";
import multer from "multer";
import {
  getEmailLayout,
  uploadEmailConfig,
  renderAndDownloadTemplate,
} from "../controllers/emailController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Routes
router.get("/layout", getEmailLayout);
router.post("/uploadConfig", uploadEmailConfig);
router.post("/renderAndDownload", renderAndDownloadTemplate);
router.post("/uploadImage", upload.single("image"), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send("No file uploaded.");
  }
  res.status(200).json({ imageUrl: `/uploads/${file.filename}` });
});

export default router;
