import express from "express";
import { Blog } from "./blog.model.js";
import { checkMongoIdValidity } from "../middleware/check.mongo.id.validitiy.js";
import { blogValidation } from "./blog.validation.js";
import { validateReqBody } from "../middleware/validation.middleware.js";

const router = express.Router();

// add blog
router.post(
  "/blog/add",
  validateReqBody(blogValidation), // Validate request body using blogValidation schema
  async (req, res) => {
    // Extract blog data from req.body
    const newBlog = req.body;

    // Create blog entry in the database
    await Blog.create(newBlog);

    // Respond with success message
    return res.status(200).send({ message: "Blog is added successfully." });
  }
);

// get all blog
router.get("/blogs", async (req, res) => {
  const allBLog = await Blog.find();
  return res
    .status(200)
    .send({ message: "All blog is displayed successfully.", allBLog });
});

// get blog details by id
router.get("/blog/details/:id", checkMongoIdValidity, async (req, res) => {
  // extract id from req.params
  const blogId = req.params.id;

  // find blog
  const blog = await Blog.findOne({ _id: blogId });

  // if not course, throw error
  if (!blog) {
    return res.status(404).send({ message: "Blog does not exist." });
  }

  // send course details as response
  return res
    .status(200)
    .send({ message: "Blog is displayed successfully.", blog: blog });
});

router.put(
  "/blog/edit/:id",
  checkMongoIdValidity, // Middleware to check if the ID is a valid MongoDB ObjectId
  validateReqBody(blogValidation), // Middleware to validate the request body
  async (req, res) => {
    try {
      // Extract blog ID from req.params
      const blogId = req.params.id;

      // Extract new values from req.body
      const newValues = req.body;

      // Find and update blog by ID
      const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        { $set: newValues },
        { new: true } // Return the updated document
      );

      // If blog does not exist, send a 404 error
      if (!updatedBlog) {
        return res.status(404).send({ message: "Blog does not exist." });
      }

      // Send success response with the updated blog
      return res
        .status(200)
        .send({ message: "Blog is updated successfully.", blog: updatedBlog });
    } catch (error) {
      // Handle any errors
      return res
        .status(500)
        .send({ message: "Failed to update blog.", error: error.message });
    }
  }
);

export default router;
