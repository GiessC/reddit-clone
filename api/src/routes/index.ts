import { Router } from "express";
import { getPosts, createPost, updatePost, deletePost } from "./posts";

const router: Router = Router();

router.get('/posts', getPosts);
router.post('/posts', createPost);
router.put('/posts/:id', updatePost);
router.delete('/posts/:id', deletePost);

export default router;