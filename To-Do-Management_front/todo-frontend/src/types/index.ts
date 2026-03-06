export interface TodoTask{
    id: number;
    title: string;
    description: string;
    status: "Pending" | "InProgress" | "Done";
    priority: "Low" | "Medium" | "High";
    createdAt: string;
    dueDate?: string;
    userId: number;
}

export interface User{
    id: number;
    name: string;
    email: string;
    tasks: TodoTask[];
}

export interface LoginRequest{
    email: string;
    password: string;
}

export interface CreateTaskRequest{
    title: string;
    description: string;
    status: "Pending" | "InProgress" | "Done";
    priority: "Low" | "Medium" | "High";
    dueDate?: string;
}
export interface RegisterRequest{
    name: string;
    email: string;
    password: string;
}
export interface PagedResult<T> {
    data: T[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
}
export interface UpdateTaskRequest extends CreateTaskRequest {}