
import { Button } from "primereact/button";
import type { TodoTask } from "../types";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

interface TasksTableProps {
    tasks: TodoTask[];
    onEdit?: (task: TodoTask) => void;
    onDelete?: (task: TodoTask) => void;
    paginator?: boolean;
    rows?: number;
    totalRecords?: number;
    first?: number;
    onPage?: (event: any) => void;
}

export const TasksTable = ({tasks, onEdit, onDelete, paginator = false, rows = 10, totalRecords = 0, first = 0,
                               onPage
                           }: TasksTableProps) => {

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
        <DataTable
            value={tasks}
            responsiveLayout="scroll"
            paginator={paginator}
            rows={rows}
            totalRecords={totalRecords}
            first={first}
            onPage={onPage}
            lazy // with this i say to DataTable that i have all the control of the backend pages
        >
            <Column field="title" header="Title" sortable />
            <Column field="description" header="Description" />
            <Column field="status" header="Status" sortable />
            <Column field="priority" header="Priority" sortable />
            <Column field="dueDate" header="Due Date" body={(row) => row.dueDate ? new Date(row.dueDate).toLocaleDateString() : '-'} sortable />
            <Column header="Actions" body={actionBodyTemplate} />
        </DataTable>
    );
};