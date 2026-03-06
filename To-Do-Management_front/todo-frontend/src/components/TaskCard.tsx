
import type { TodoTask } from "../types";

interface TaskCardProps {
    task: TodoTask;
    onEdit?: () => void;
    onDelete?: () => void;
}

export const TaskCard = ({ task, onEdit, onDelete }: TaskCardProps) => (
    <div
        style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "16px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
        }}
    >
        <div>
            <h3 style={{ margin: "0 0 8px 0" }}>{task.title}</h3>
            <p style={{ margin: "0 0 8px 0", color: "#555" }}>{task.description}</p>
            <p style={{ margin: "0 0 4px 0", fontSize: "0.9rem", color: "#333" }}>
                Status: <strong>{task.status}</strong> | Priority: <strong>{task.priority}</strong>
            </p>
            {task.dueDate && (
                <p style={{ margin: "0", fontSize: "0.85rem", color: "#777" }}>
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                </p>
            )}
        </div>

        <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
            {onEdit && (
                <button
                    onClick={onEdit}
                    style={{
                        flex: 1,
                        padding: "6px 10px",
                        borderRadius: "6px",
                        border: "none",
                        backgroundColor: "#4CAF50",
                        color: "#fff",
                        cursor: "pointer",
                    }}
                >
                    Edit
                </button>
            )}
            {onDelete && (
                <button
                    onClick={onDelete}
                    style={{
                        flex: 1,
                        padding: "6px 10px",
                        borderRadius: "6px",
                        border: "none",
                        backgroundColor: "#f44336",
                        color: "#fff",
                        cursor: "pointer",
                    }}
                >
                    Delete
                </button>
            )}
        </div>
    </div>
);
