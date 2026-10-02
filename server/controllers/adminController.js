import jwt from 'jsonwebtoken';
import Comment from '../models/Comment.js';
import Blog from '../models/Blog.js';

// Admin Login
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (
            email !== process.env.ADMIN_EMAIL ||
            password !== process.env.ADMIN_PASSWORD
        ) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all blogs (admin)
export const getAllBlogsAdmin = async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({ createdAt: -1 });
        res.json({ success: true, blogs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all comments (admin)
export const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find({})
            .populate('blog')
            .sort({ createdAt: -1 });

        res.json({ success: true, comments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Dashboard stats
export const getDashboard = async (req, res) => {
    try {
        const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
        const blogs = await Blog.countDocuments();
        const comments = await Comment.countDocuments();
        const drafts = await Blog.countDocuments({ isPublished: false });

        const dashboardData = { blogs, comments, drafts, recentBlogs };
        res.json({ success: true, dashboardData });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete comment by ID
export const deleteCommentById = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ success: false, message: "Comment ID is required" });
        }

        await Comment.findByIdAndDelete(id);
        res.json({ success: true, message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Approve comment by ID
export const approveCommentById = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ success: false, message: "Comment ID is required" });
        }

        await Comment.findByIdAndUpdate(id, { isApproved: true });
        res.json({ success: true, message: "Comment approved successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

import userModel from '../models/userModel.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({}).select('-password').sort({ createdAt: -1 });
        res.json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
