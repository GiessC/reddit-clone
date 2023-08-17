import axios, { AxiosError, AxiosResponse } from "axios";
import { baseUrl } from "@/common/const/api";
import { trackPromise } from "react-promise-tracker";
import areas from "@/common/const/areas";

type UserExistsApiType = {
    message: string;
    status: string;
    exists: boolean;
};

export const getUserById = async (userId: string): Promise<AxiosResponse<UserApiDataType>> => {
    try {
        const user: AxiosResponse<UserApiDataType> = await trackPromise(
            axios.get(
                `${baseUrl}/users/${userId}`,
            ),
            areas.users,
        );
        return user;
    } catch (error) {
        throw error;
    }
};

export const createUser = async (formData: IUser): Promise<AxiosResponse<UserApiDataType>> => {
    if (!formData.userId) {
        throw new Error('userId is null or undefined');
    }
    try {
        const user: Omit<IUser, '_id'> = {
            userId: formData.userId,
            username: formData.username,
        };
        const saveUser: AxiosResponse<UserApiDataType> = await trackPromise(
            axios.post(
                `${baseUrl}/users`,
                user
            ),
            areas.users
        );
        return saveUser;
    } catch (error) {
        throw error;
    }
};

export const userExists = async (userId?: string | null): Promise<boolean> => {
    if (!userId) {
        throw new Error('userId is null or undefined');
    }
    try {
        const response: AxiosResponse<UserExistsApiType> = await trackPromise(
            axios.get(
                `${baseUrl}/users/exists/${userId}`
            ),
            areas.users
        );
        return response.data.exists;
    } catch (error) {
        throw error;
    }
};