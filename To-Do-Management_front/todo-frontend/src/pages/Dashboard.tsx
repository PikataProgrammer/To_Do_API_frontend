// src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import type { CreateTaskRequest, TodoTask, UpdateTaskRequest } from "../types";
import { createTask, deleteTask, getTasks, updateTask } from "../api/todoApi";
import { TaskCard } from "../components/TaskCard";
import { TaskForm } from "../components/TaskForm";

const Dashboard = () => {
    const [tasks, setTasks] = useState<TodoTask[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingTask, setEditingTask] = useState<TodoTask | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const pageSize = 12;

    const [deleteId, setDeleteId] = useState<number | null>(null);

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

    const handleDelete = (id: number) => {
        setDeleteId(id);
    };

    const confirmDelete = async () => {
        if (deleteId === null) return;

        await deleteTask(deleteId);

        fetchTasks(page);

        setDeleteId(null);
    };

    const handleSave = async (
        taskData: CreateTaskRequest | UpdateTaskRequest
    ) => {
        try {
            if (editingTask) {
                const updated = await updateTask(
                    editingTask.id,
                    taskData as UpdateTaskRequest
                );

                setTasks(prev =>
                    prev.map(t =>
                        t.id === updated.id ? updated : t
                    )
                );

                setEditingTask(null);
            } else {
                await createTask(taskData as CreateTaskRequest);

                fetchTasks(page);
            }
        } catch (err: any) {
            if (err.response?.status === 409) {
                setErrorMessage("Task with this title already exists!");
            } else {
                setErrorMessage("Something went wrong.");
            }
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Dashboard</h1>

            <TaskForm
                onSave={handleSave}
                editingTask={editingTask}
                onCancel={() => setEditingTask(null)}
            />

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fill, minmax(350px, 1fr))",
                    gap: "16px",
                    marginTop: "20px",
                }}
            >
                {tasks.map(task => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onEdit={() => setEditingTask(task)}
                        onDelete={() => handleDelete(task.id)}
                    />
                ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "20px" }}>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => setPage(index + 1)}
                        style={{
                            margin: "5px",
                            padding: "6px 12px",
                            fontWeight:
                                page === index + 1 ? "bold" : "normal",
                            cursor: "pointer"
                        }}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>


            {deleteId !== null && (
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
                        <p>
                            Are you sure you want to delete this task?
                        </p>

                        <div style={{ marginTop: "15px" }}>
                            <button
                                onClick={confirmDelete}
                                style={{ marginRight: "40px" }}
                            >
                                Yes
                            </button>

                            <button
                                onClick={() => setDeleteId(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
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
                        <p style={{ color: "red" }}>
                            {errorMessage}
                        </p>

                        <div style={{ marginTop: "15px" }}>
                            <button
                                onClick={() => setErrorMessage(null)}
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;