import axios, { AxiosError } from "axios";
import { ToastContainerProps, ToastOptions, toast } from "react-toastify";

export const CONTAINER_OPTIONS: ToastContainerProps = {
    position: "top-right",
};

export enum API_ERROR {
    INVALID_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    INTERNAL_SERVER_ERROR = 500,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504,
}

const SUCCESS_OPTIONS: (message: string) => ToastOptions = (message: string) => ({
    toastId: message,
    type: "success",
    icon: "👍",
});

const WARNING_OPTIONS: (message: string) => ToastOptions = (message: string) => ({
    toastId: message,
    type: "warning",
    icon: "👀",
});

const ERROR_OPTIONS: (message: string) => ToastOptions = (message: string) => ({
    toastId: message,
    type: "error",
    icon: "👎",
});

export const postSuccess = (message: string) => toast.success(message, SUCCESS_OPTIONS(message));
export const postWarning = (message: string) => toast.warning(message, WARNING_OPTIONS(message));
export const postError = (message: string) => toast.error(message, ERROR_OPTIONS(message));

export interface IApiError {
    responseStatus?: number;
    message?: string;
}

export const handleApiError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        const responseStatus = axiosError.response?.status;
        const message = axiosError.message;

        return {
            responseStatus,
            message,
        };
    } else {
        const message = (error as Error).message;

        return {
            responseStatus: 500,
            message,
        };
    }
};
