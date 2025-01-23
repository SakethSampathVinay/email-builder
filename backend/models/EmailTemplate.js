import mongoose from "mongoose";

const EmailTemplateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const EmailTemplate = mongoose.model("EmailTemplate", EmailTemplateSchema);
export default EmailTemplate;