import { Router } from "express";
import { getPosts, createPost, updatePost, deletePost } from "./posts";
import { createUser, deleteUser, getUsers, getUserById, updateUser, userExists } from "./users";

const router: Router = Router();

router.get('/posts', getPosts);
router.post('/posts', createPost);
router.put('/posts/:id', updatePost);
router.delete('/posts/:id', deletePost);

router.get('/users/exists/:userId', userExists);

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;