import { Response, Request } from 'express';
import { IUser } from '../../types/User';
import User from '../../models/User';

const getUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
        const users: IUser[] = await User.find();
        res
            .setHeader('Access-Control-Allow-Origin', '*')
            .status(200).json({ users });
    } catch (error) {
        throw error;
    }
};

const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const user: IUser | null = await User.findById({ 
            _id: req.params.id 
        });
        res
            .setHeader('Access-Control-Allow-Origin', '*')
            .status(200).json({ user });
    } catch (error) {
        throw error;
    }
};

const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<IUser, keyof IUser>;
        console.debug(body);

        const user: IUser = new User({
            userId: body.userId,
            username: body.username,
        });

        const newUser: IUser = await user.save();
        const allUsers: IUser[] = await User.find();

        res
            .setHeader('Access-Control-Allow-Origin', '*')
            .status(201)
            .json({ message: "User created", user: newUser, users: allUsers });
    } catch (error) {
        throw error;
    }
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: { id },
            body,
        } = req;
        const updateUser: IUser | null = await User.findByIdAndUpdate(
            { _id: id },
            body
        );
        const allUsers: IUser[] = await User.find();
        res
            .setHeader('Access-Control-Allow-Origin', '*')
            .status(200).json({
                message: 'User updated',
                user: updateUser,
                users: allUsers,
            });
    } catch (error) {
        throw(error);
    }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedUser: IUser | null = await User.findByIdAndRemove(
            req.params.id
        );
        const allUsers: IUser[] = await User.find();
        res
            .setHeader('Access-Control-Allow-Origin', '*')
            .status(200).json({
                message: 'User deleted',
                user: deletedUser,
                users: allUsers,
            });
    } catch (error) {
        throw error;
    }
};

const userExists = async (req: Request, res: Response): Promise<void> => {
    try {
        const user: IUser | null = await User.findOne({ userId: req.params.userId });
        if (user) {
            res
                .setHeader('Access-Control-Allow-Origin', '*')
                .status(200).json({ message: 'User exists', exists: true });
        } else {
            res
                .setHeader('Access-Control-Allow-Origin', '*')
                .status(200).json({ message: 'User does not exist', exists: false });
        }
    } catch (error) {
        throw error;
    }
};

export { userExists, getUsers, getUserById, createUser, updateUser, deleteUser };