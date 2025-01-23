import EmailTemplate from "../models/EmailTemplate.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fetch layout.html
const getEmailLayout = (req, res) => {
  const layoutPath = path.join(__dirname, "../views/layout.html");
  fs.readFile(layoutPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error reading layout file" });
    }
    res.send(data);
  });
};

// Upload email configuration
const uploadEmailConfig = async (req, res) => {
  try {
    const emailTemplate = new EmailTemplate(req.body);
    await emailTemplate.save();
    res
      .status(201)
      .json({ message: "Email configuration saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save email configuration" });
  }
};

// Render and download template
const renderAndDownloadTemplate = (req, res) => {
  const { title, content, image } = req.body;
  const layoutPath = path.join(__dirname, "../views/layout.html");

  fs.readFile(layoutPath, "utf8", (err, layoutHtml) => {
    if (err) {
      return res.status(500).json({ error: "Error reading layout file" });
    }

    // Replace placeholders
    const renderedHtml = layoutHtml
      .replace("{{TITLE}}", title)
      .replace("{{CONTENT}}", content)
      .replace("{{IMAGE}}", image || "");

    const outputFilePath = path.join(
      __dirname,
      "../uploads/renderedOutput.html"
    );

    fs.writeFile(outputFilePath, renderedHtml, (writeErr) => {
      if (writeErr) {
        return res.status(500).json({ error: "Error generating output file" });
      }

      res.download(outputFilePath, "renderedOutput.html", (downloadErr) => {
        if (downloadErr) {
          res.status(500).json({ error: "Error downloading file" });
        }
      });
    });
  });
};

export { getEmailLayout, uploadEmailConfig, renderAndDownloadTemplate };
