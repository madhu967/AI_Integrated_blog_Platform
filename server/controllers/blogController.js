import fs from 'fs';
import imagekit from '../configs/imageKit.js';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import main from '../configs/gemini.js';

export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
    const imageFile = req.file;

    if (!title || !description || !category || !imageFile) {
      return res.json({ succes: false, message: "Missing required fields" });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);

    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: '/blogs',
    });

    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: 'auto' },
        { format: 'webp' },
        { width: '1280' },
      ],
    });

    const image = optimizedImageUrl;

    const authorId = req.user ? req.user.id : null;
    const isUser = req.user && req.user.role === 'user';
    
    // Enforce review workflow: Users must submit for review, admins can bypass
    const finalStatus = isUser ? 'Pending' : 'Approved';
    const finalIsPublished = isUser ? false : isPublished;

    await Blog.create({ 
        title, subTitle, description, category, image, 
        isPublished: finalIsPublished, 
        author: authorId,
        status: finalStatus
    });

    res.json({ success: true, message: isUser ? "Blog submitted for admin review" : "Blog added successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const updateBlogStatus = async (req, res) => {
    try {
        const { id, status } = req.body;
        
        if (req.user && req.user.role === 'user') {
            return res.json({ success: false, message: "Unauthorized. Only admins can update status." });
        }

        const blog = await Blog.findById(id);
        if (!blog) return res.json({ success: false, message: "Blog not found" });

        blog.status = status;
        if (status === 'Approved') {
            blog.isPublished = true;
        } else if (status === 'Rejected') {
            blog.isPublished = false;
        }
        await blog.save();

        res.json({ success: true, message: `Blog ${status.toLowerCase()} successfully` });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });
    res.json({ success: true, blogs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);
    if (!blog) return res.json({ succes: false, message: "Blog not found" });
    res.json({ success: true, blog });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await Blog.findById(id);
    if (!blog) return res.json({ succes: false, message: "Blog not found" });

    if (req.user && req.user.role === 'user' && blog.author?.toString() !== req.user.id) {
        return res.json({ success: false, message: "Unauthorized to delete this blog" });
    }

    await Blog.findByIdAndDelete(id);
    await Comment.deleteMany({ blog: id });
    res.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await Blog.findById(id);
    if (!blog) return res.json({ succes: false, message: "Blog not found" });

    if (req.user && req.user.role === 'user' && blog.author?.toString() !== req.user.id) {
        return res.json({ success: false, message: "Unauthorized to modify this blog" });
    }

    // Only allow publishing if it is Approved
    if (blog.status !== 'Approved' && !blog.isPublished) {
        return res.json({ success: false, message: `Cannot publish a ${blog.status.toLowerCase()} blog. Admin approval required.` });
    }

    blog.isPublished = !blog.isPublished;
    await blog.save();

    res.json({ success: true, message: 'Blog status updated' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;
    if (!blog || !name || !content) {
      return res.json({ succes: false, message: "All fields are required" });
    }

    await Comment.create({ blog, name, content });
    res.json({ success: true, message: "Comment added for review" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.body;
    const comments = await Comment.find({ blog: blogId, isApproved: true }).sort({ createdAt: -1 });
    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const generateContent =async(req,res)=>{
  try {
    const {prompt} =req.body;
    const content =await main(prompt + ' Generate a blog content for this topic in simple text format')
    res.json({success:true,content})

  } catch (error) {
    res.json({success:false,message:error.message})
  }
}
