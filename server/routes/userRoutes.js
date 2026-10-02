import express from 'express';
import { registerUser, loginUser, getMyBlogs, getMyComments, getMyDashboard, deleteMyBlogComment, approveMyBlogComment } from '../controllers/userController.js';
import auth from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/blogs', auth, getMyBlogs);
userRouter.get('/comments', auth, getMyComments);
userRouter.get('/dashboard', auth, getMyDashboard);
userRouter.post('/delete-comment', auth, deleteMyBlogComment);
userRouter.post('/approve-comment', auth, approveMyBlogComment);

export default userRouter;
