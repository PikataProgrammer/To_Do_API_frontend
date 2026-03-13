// src/pages/Dashboard.tsx
import {useEffect, useRef, useState} from "react";
import type { CreateTaskRequest, TodoTask, UpdateTaskRequest } from "../types";
import { createTask, deleteTask, getTasks, updateTask } from "../api/todoApi";
import { TaskForm } from "../components/TaskForm";
import { TasksTable } from "../components/TaskCard";
import { Toast } from 'primereact/toast';

const Dashboard = () => {
    const [tasks, setTasks] = useState<TodoTask[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingTask, setEditingTask] = useState<TodoTask | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 12;
    const toast = useRef<Toast>(null);


    const fetchTasks = async (pageNumber: number) => {
        setLoading(true);
        try {
            const res = await getTasks(pageNumber, pageSize);
            setTasks(res.data);
            setTotalPages(Math.ceil(res.totalCount / pageSize));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks(page);
    }, [page]);

    const handleDelete = async (id: number) => {
        try {
            await deleteTask(id);
            fetchTasks(page);
            toast.current?.show({ severity: 'success', summary: 'Deleted', detail: 'Task deleted successfully', life: 2000 });
        } catch (err) {
            console.error(err);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete task.', life: 3000 });
        }
    };

    const handleSave = async (taskData: CreateTaskRequest | UpdateTaskRequest) => {
        try {
            if (editingTask) {
                const updated = await updateTask(editingTask.id, taskData as UpdateTaskRequest);
                setTasks(prev => prev.map(t => t.id === updated.id ? updated : t));
                setEditingTask(null);
                toast.current?.show({ severity: 'success', summary: 'Updated', detail: 'Task updated successfully', life: 3000 });
            } else {
                await createTask(taskData as CreateTaskRequest);
                fetchTasks(page);
                toast.current?.show({ severity: 'success', summary: 'Created', detail: 'Task created successfully', life: 3000 });
            }
        } catch (err: any) {
            if (err.response?.status === 409) {
                toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Task with this title already exists!', life: 3000 });
            } else if (err.response?.status === 400 && Array.isArray(err.response.data)) {
                const messages = err.response.data.map(
                    (e: { propertyName: string; errorMessage: string }) =>
                        `${e.propertyName}: ${e.errorMessage}`
                ).join("\n");
                toast.current?.show({ severity: 'error', summary: 'Validation Error', detail: messages, life: 3000 });
            } else {
                toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Something went wrong.', life: 3000 });
            }
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div style={{ padding: "20px" }}>
            <Toast ref={toast} />

            <h1 style={{ textAlign: "center" }}>Dashboard</h1>

            <TaskForm
                onSave={handleSave}
                editingTask={editingTask}
                onCancel={() => setEditingTask(null)}
            />

            <TasksTable
                tasks={tasks}
                onEdit={(task) => setEditingTask(task)}
                onDelete={(task) => handleDelete(task.id)}
            />
        </div>
    );
};

export default Dashboard;