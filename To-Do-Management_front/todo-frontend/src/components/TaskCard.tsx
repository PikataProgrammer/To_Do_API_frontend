
import type { TodoTask } from "../types";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

interface TasksTableProps {
    tasks: TodoTask[];
    onEdit?: (task: TodoTask) => void;
    onDelete?: (task: TodoTask) => void;
}

export const TasksTable = ({ tasks, onEdit, onDelete }: TasksTableProps) => {

    const actionBodyTemplate = (rowData: TodoTask) => (
        <div style={{ display: "flex", gap: "0.5rem" }}>
            {onEdit && (
                <Button icon="pi pi-pencil" className="p-button-sm p-button-success" onClick={() => onEdit(rowData)} />
            )}
            {onDelete && (
                <Button icon="pi pi-trash" className="p-button-sm p-button-danger" onClick={() => onDelete(rowData)} />
            )}
        </div>
    );

    return (
        <DataTable value={tasks} responsiveLayout="scroll" paginator rows={10}>
            <Column field="title" header="Title" sortable></Column>
            <Column field="description" header="Description"></Column>
            <Column field="status" header="Status" sortable></Column>
            <Column field="priority" header="Priority" sortable></Column>
            <Column field="dueDate" header="Due Date" body={(row) => row.dueDate ? new Date(row.dueDate).toLocaleDateString() : '-'} sortable></Column>
            <Column header="Actions" body={actionBodyTemplate}></Column>
        </DataTable>
    );
};