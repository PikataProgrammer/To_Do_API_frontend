
import {useEffect, useState} from "react";
import type { CreateTaskRequest, TodoTask, UpdateTaskRequest } from "../types";
import { createTask, deleteTask, getTasks, updateTask } from "../api/todoApi";
import { TaskForm } from "../components/TaskForm";
import { TasksTable } from "../components/TaskCard";
import {ConfirmDialog, confirmDialog} from "primereact/confirmdialog";
import {useToast} from "../context/ToastContext.tsx";

const Dashboard = () => {
    const {show} = useToast();

    const [tasks, setTasks] = useState<TodoTask[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingTask, setEditingTask] = useState<TodoTask | null>(null);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const pageSize = 10;


    const fetchTasks = async (pageNumber: number) => {
        setLoading(true);
        try {
            const res = await getTasks(pageNumber, pageSize);
            setTasks(res.data);
            setTotalCount(res.totalCount);
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
        confirmDialog({
            message: 'Do you want to delete this task?',
            header: 'Delete Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptClassName: 'p-button-danger',
            accept: async () => {
                try {
                    await deleteTask(id);
                    fetchTasks(page);
                    show({ severity: 'success', summary: 'Deleted', detail: 'Task deleted successfully', life: 3000 });
                } catch (err) {
                    console.error(err);
                    show({ severity: 'error', summary: 'Error', detail: 'Failed to delete task.', life: 3000 });
                }
            },
            reject: () => {
                show({ severity: 'info', summary: 'Cancelled', detail: 'Delete cancelled', life: 3000 });
            }
        });
    };

    const handleSave = async (taskData: CreateTaskRequest | UpdateTaskRequest) => {
        try {
            if (editingTask) {
                const updated = await updateTask(editingTask.id, taskData as UpdateTaskRequest);
                setTasks(prev => prev.map(t => t.id === updated.id ? updated : t));
                setEditingTask(null);
                show({ severity: 'success', summary: 'Updated', detail: 'Task updated successfully', life: 3000 });
            } else {
                await createTask(taskData as CreateTaskRequest);
                fetchTasks(page);
                show({ severity: 'success', summary: 'Created', detail: 'Task created successfully', life: 3000 });
            }
        } catch (err: any) {
            if (err.response?.status === 409) {
                show({ severity: 'error', summary: 'Error', detail: 'Task with this title already exists!', life: 3000 });
            } else if (err.response?.status === 400 && Array.isArray(err.response.data)) {
                const messages = err.response.data.map(
                    (e: { propertyName: string; errorMessage: string }) =>
                        `${e.propertyName}: ${e.errorMessage}`
                ).join("\n");
                show({ severity: 'error', summary: 'Validation Error', detail: messages, life: 3000 });
            } else {
                show({ severity: 'error', summary: 'Error', detail: 'Something went wrong.', life: 3000 });
            }
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <ConfirmDialog />

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
                paginator
                rows={pageSize}
                totalRecords={totalCount}
                first={(page - 1) * pageSize}
                onPage={(e) => setPage(e.first / e.rows + 1)}
            />
        </div>
    );
};

export default Dashboard;