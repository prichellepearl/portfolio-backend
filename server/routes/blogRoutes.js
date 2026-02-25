const express = require("express");
const router = express.Router();
const Joi = require("joi");
const Blog = require("../models/Blog");
const authMiddleware = require("../middleware/authMiddleware");

const blogValidationSchema = Joi.object({
  title: Joi.string().min(3).required(),
  content: Joi.string().min(10).required(),
  author: Joi.string().optional(),
  status: Joi.string().valid("draft", "published").optional()
});

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const skip = (page - 1) * limit;

    const blogs = await Blog.find({ status: "published" })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
});


router.post("/", authMiddleware, async (req, res) => {
  const { error } = blogValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    });
  }

  try {
    const blog = new Blog(req.body);
    await blog.save();

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Failed to create blog" });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete blog" });
  }
});


router.get("/admin/all", authMiddleware, async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
});

module.exports = router;