import mongoose from "mongoose";

// set schema
const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 55,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      enum: ["Technology", "Health", "Education", "Business"],
    },
  },
  {
    timestamps: true,
  }
);

// create table
export const Blog = mongoose.model("Blog", blogSchema);
