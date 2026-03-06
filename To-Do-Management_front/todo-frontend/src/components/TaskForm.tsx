import type {CreateTaskRequest, TodoTask, UpdateTaskRequest} from "../types";
import { useEffect, useState} from "react";
import {useAuth} from "../context/AuthContext.tsx";


interface TaskFormProps{
    onSave: (task: CreateTaskRequest | UpdateTaskRequest) => void;
    editingTask?: TodoTask | null;
    onCancel?: () => void;
}

export const TaskForm = ({onSave, editingTask, onCancel}: TaskFormProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<"Pending" | "InProgress" | "Done">('Pending');
    const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Medium");
    const [dueDate, setDueDate] = useState<string>("");
    const { user } = useAuth();

    useEffect(() => {
        if(editingTask){
            setTitle(editingTask.title);
            setDescription(editingTask.description);
            setStatus(editingTask.status);
            setPriority(editingTask.priority);
            setDueDate(editingTask.dueDate ? editingTask.dueDate.slice(0,10) : "");
        }else{
            setTitle("");
            setDescription("");
            setStatus("Pending");
            setPriority("Medium");
            setDueDate("");
        }
    }, [editingTask]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            alert("No logged in user!");
            return;
        }

        const taskData: CreateTaskRequest | UpdateTaskRequest = {
            title,
            description,
            status,
            priority,
            dueDate: dueDate || undefined,
        };
        onSave(taskData);
        setTitle("");
        setDescription("");
        setStatus("Pending");
        setPriority("Medium");
        setDueDate("");
    }
    return (
        <form
            onSubmit={handleSubmit}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
                background: "#f9fafb",
                borderRadius: "12px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    width: "100%",
                }}
            >
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                    style={{
                        padding: "10px",
                        borderRadius: "6px",
                        border: "1px solid #ddd",
                        minWidth: "120px",
                        textAlign: "center",
                        transition: "0.2s",
                    }}
                />
                <input
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                    style={{
                        padding: "10px",
                        borderRadius: "6px",
                        border: "1px solid #ddd",
                        minWidth: "200px",
                        minHeight: "60px",
                        textAlign: "center",
                        transition: "0.2s",
                        resize: "vertical",
                    }}
                />
                <select
                    value={status}
                    onChange={e => setStatus(e.target.value as any)}
                    style={{
                        padding: "10px",
                        borderRadius: "6px",
                        border: "1px solid #ddd",
                        textAlign: "center",
                        minWidth: "120px",
                    }}
                >
                    <option value="Pending">Pending</option>
                    <option value="InProgress">InProgress</option>
                    <option value="Done">Done</option>
                </select>
                <select
                    value={priority}
                    onChange={e => setPriority(e.target.value as any)}
                    style={{padding: "10px", borderRadius: "6px", border: "1px solid #ddd", textAlign: "center", minWidth: "120px",
                    }}
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)}
                    style={{
                        padding: "10px",
                        borderRadius: "6px",
                        border: "1px solid #ddd",
                        textAlign: "center",
                    }}
                />
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
                <button
                    type="submit"
                    style={{
                        padding: "10px 20px",
                        borderRadius: "6px",
                        border: "none",
                        background: "#4f46e5",
                        color: "white",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "0.2s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#4338ca")}
                    onMouseLeave={e => (e.currentTarget.style.background = "#4f46e5")}
                >
                    {editingTask ? "Update" : "Create"}
                </button>
                {editingTask && onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        style={{
                            padding: "10px 20px",
                            borderRadius: "6px",
                            border: "none",
                            background: "#e0e0e0",
                            color: "#333",
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "0.2s",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = "#c7c7c7")}
                        onMouseLeave={e => (e.currentTarget.style.background = "#e0e0e0")}
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>

    );

}
