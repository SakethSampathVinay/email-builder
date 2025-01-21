import fs from "fs";

// Get layout HTML
export const getEmailLayout = (req, res) => {
  fs.readFile("./templates/layout.html", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading layout file");
    }
    res.send(data);
  });
};

// Handle image upload
export const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }
  res
    .status(200)
    .send({ message: "Image uploaded successfully", file: req.file });
};
