import axios from "axios";
import type {
    CreateTaskRequest,
    TodoTask,
    UpdateTaskRequest,
    LoginRequest,
    RegisterRequest,
    PagedResult
} from "../types";

const API_URL = "http://localhost:5090/api";

export const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

export const getTasks = async (
    page: number,
    limit: number
): Promise<PagedResult<TodoTask>> => {
    const response = await api.get("/tasks", {
        params: { page, limit }
    });

    return response.data;
};

export const createTask = async (
    task: CreateTaskRequest
): Promise<TodoTask> => {
    const response = await api.post("/tasks", task);
    return response.data;
};

export const updateTask = async (
    id: number,
    task: UpdateTaskRequest
): Promise<TodoTask> => {
    const response = await api.put(`/tasks/${id}`, task);
    return response.data;
};

export const deleteTask = async (
    id: number
): Promise<void> => {
    await api.delete(`/tasks/${id}`);
};

export const loginUser = async (
    credentials: LoginRequest
): Promise<void> => {
    await api.post("/users/login", credentials);
};

export const registerUser = async (
    data: RegisterRequest
) => {
    const response = await api.post("/users/register", data);
    return response.data;
};
export const logoutUser = async (): Promise<void> => {
    await api.post("/users/logout");
};

