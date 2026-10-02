import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing details' });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: 'User already exists' });
        }

        const newUser = new userModel({ name, email, password });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id, role: 'user' }, process.env.JWT_SECRET || 'secret');

        res.json({ success: true, token, user: { name: newUser.name, email: newUser.email } });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        let user = await userModel.findOne({ email });

        // Auto-create demo user on the fly for easy testing
        if (!user && email === 'user@example.com') {
            user = new userModel({ name: 'Demo User', email: 'user@example.com', password: 'user123' });
            await user.save();
        }

        if (!user) {
            return res.json({ success: false, message: 'User does not exist' });
        }

        if (user.password === password) {
            const token = jwt.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET || 'secret');
            return res.json({ success: true, token, user: { name: user.name, email: user.email } });
        } else {
            return res.json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';

export const getMyBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ author: req.user.id }).sort({ createdAt: -1 });
        res.json({ success: true, blogs });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const getMyComments = async (req, res) => {
    try {
        const myBlogs = await Blog.find({ author: req.user.id }).select('_id');
        const blogIds = myBlogs.map(b => b._id);
        const comments = await Comment.find({ blog: { $in: blogIds } }).populate('blog').sort({ createdAt: -1 });
        res.json({ success: true, comments });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const getMyDashboard = async (req, res) => {
    try {
        const blogs = await Blog.countDocuments({ author: req.user.id });
        const drafts = await Blog.countDocuments({ author: req.user.id, isPublished: false });
        
        const myBlogs = await Blog.find({ author: req.user.id }).select('_id');
        const blogIds = myBlogs.map(b => b._id);
        const comments = await Comment.countDocuments({ blog: { $in: blogIds } });
        
        const recentBlogs = await Blog.find({ author: req.user.id }).sort({ createdAt: -1 }).limit(5);

        res.json({ success: true, dashboardData: { blogs, drafts, comments, recentBlogs } });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const deleteMyBlogComment = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) return res.status(400).json({ success: false, message: "Comment ID is required" });

        const comment = await Comment.findById(id).populate('blog');
        if (!comment) return res.json({ success: false, message: "Comment not found" });

        if (comment.blog.author?.toString() !== req.user.id) {
            return res.json({ success: false, message: "Unauthorized: Not your blog" });
        }

        await Comment.findByIdAndDelete(id);
        res.json({ success: true, message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const approveMyBlogComment = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) return res.status(400).json({ success: false, message: "Comment ID is required" });

        const comment = await Comment.findById(id).populate('blog');
        if (!comment) return res.json({ success: false, message: "Comment not found" });

        if (comment.blog.author?.toString() !== req.user.id) {
            return res.json({ success: false, message: "Unauthorized: Not your blog" });
        }

        await Comment.findByIdAndUpdate(id, { isApproved: true });
        res.json({ success: true, message: "Comment approved successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
