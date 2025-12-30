"use client";

import * as React from "react";
import {
    SortingState,
    VisibilityState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
    PaginationState,
} from "@tanstack/react-table";
import { getColumns } from "./columns";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "./data-table-toolbar";
import { RoleInfo } from "@/types";
import { getRoles, createRole, updateRole, deleteRole } from "./actions";
import { RoleDialog } from "./role-dialog";

export default function RolesPage() {
    const [data, setData] = React.useState<RoleInfo[]>([]);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    // Pagination state
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [pageCount, setPageCount] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(false);

    // Dialog state
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [selectedRole, setSelectedRole] = React.useState<RoleInfo | null>(null);

    const fetchData = React.useCallback(async () => {
        setIsLoading(true);
        try {
            const result = await getRoles(pagination.pageIndex, pagination.pageSize);
            if (result.code === "200" && result.data) {
                setData(result.data.list);
                setPageCount(result.data.pages);
            }
        } catch (error) {
            console.error("Failed to fetch roles:", error);
        } finally {
            setIsLoading(false);
        }
    }, [pagination.pageIndex, pagination.pageSize]);

    React.useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleAdd = () => {
        setSelectedRole(null);
        setDialogOpen(true);
    };

    const handleEdit = React.useCallback((role: RoleInfo) => {
        setSelectedRole(role);
        setDialogOpen(true);
    }, []);

    const handleDelete = React.useCallback(async (role: RoleInfo) => {
        if (confirm(`Are you sure you want to delete role ${role.roleId}?`)) {
            const result = await deleteRole(role.roleId);
            if (result.code === "200") {
                fetchData();
            } else {
                alert(result.message || "Failed to delete role.");
            }
        }
    }, [fetchData]);

    const handleFormSubmit = async (formData: Partial<RoleInfo>) => {
        let result;
        if (selectedRole) {
            result = await updateRole(selectedRole.roleId, formData);
        } else {
            result = await createRole(formData);
        }

        if (result.code === "200") {
            setDialogOpen(false);
            fetchData();
        } else {
            alert(result.message || "An error occurred.");
        }
    };

    const columns = React.useMemo(() => getColumns({
        onEdit: handleEdit,
        onDelete: handleDelete
    }), [handleEdit, handleDelete]);

    const table = useReactTable({
        data,
        columns,
        pageCount,
        manualPagination: true,
        enableSorting: false,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            pagination,
        },
    });

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Role Management</h1>
                        <p className="text-slate-500 dark:text-slate-400">Manage system roles and permissions</p>
                    </div>
                </div>

                <div className="w-full space-y-4">
                    <DataTableToolbar
                        onAdd={handleAdd}
                        onRefresh={fetchData}
                        isLoading={isLoading}
                    />
                    <DataTable table={table} showSeparators={true} />
                </div>
            </div>

            <RoleDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                role={selectedRole}
                onSubmit={handleFormSubmit}
            />
        </div>
    );
}
