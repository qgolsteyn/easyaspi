import mongoose, { Schema } from "mongoose";

const TemplateSchema = new Schema({
  problemArchetype: {
    type: String,
    required: true
  },
  problemType: {
    type: String,
    required: true
  },
  operators: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('templateSchema', TemplateSchema);