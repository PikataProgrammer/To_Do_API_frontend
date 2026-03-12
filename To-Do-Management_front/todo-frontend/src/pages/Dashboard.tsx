// src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import type { CreateTaskRequest, TodoTask, UpdateTaskRequest } from "../types";
import { createTask, deleteTask, getTasks, updateTask } from "../api/todoApi";
import { TaskForm } from "../components/TaskForm";
import { TasksTable } from "../components/TaskCard"; // TasksTable вече е PrimeReact DataTable

const Dashboard = () => {
    const [tasks, setTasks] = useState<TodoTask[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingTask, setEditingTask] = useState<TodoTask | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 12;

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
        } catch (err) {
            console.error(err);
            setErrorMessage("Failed to delete task.");
        }
    };

    const handleSave = async (taskData: CreateTaskRequest | UpdateTaskRequest) => {
        try {
            if (editingTask) {
                const updated = await updateTask(editingTask.id, taskData as UpdateTaskRequest);
                setTasks(prev => prev.map(t => t.id === updated.id ? updated : t));
                setEditingTask(null);
            } else {
                await createTask(taskData as CreateTaskRequest);
                fetchTasks(page);
            }
        } catch (err: any) {
            if (err.response?.status === 409) {
                setErrorMessage("Task with this title already exists!");
            } else if (err.response?.status === 400 && Array.isArray(err.response.data)) {
                const messages = err.response.data.map(
                    (e: { propertyName: string; errorMessage: string }) =>
                        `${e.propertyName}: ${e.errorMessage}`
                );
                setErrorMessage(messages.join("\n"));
            } else {
                setErrorMessage("Something went wrong.");
            }
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div style={{ padding: "20px" }}>
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


            {errorMessage && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "rgba(0,0,0,0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            background: "white",
                            padding: "20px",
                            borderRadius: "8px",
                            minWidth: "300px",
                            textAlign: "center",
                        }}
                    >
                        <p style={{ color: "red", whiteSpace: "pre-line" }}>{errorMessage}</p>
                        <div style={{ marginTop: "15px" }}>
                            <button onClick={() => setErrorMessage(null)}>OK</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;