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
import { useRoles, useCreateRole, useUpdateRole, useDeleteRole, useAssignRoleMenus } from "@/hooks/useRoleQuery";
import { RoleDialog } from "./role-dialog";

export default function RolesPage() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    // Pagination state
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const { data: rolesData, isLoading, refetch } = useRoles(pagination.pageIndex, pagination.pageSize);
    const createRoleMutation = useCreateRole();
    const updateRoleMutation = useUpdateRole();
    const deleteRoleMutation = useDeleteRole();
    const assignMenusMutation = useAssignRoleMenus();

    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [selectedRole, setSelectedRole] = React.useState<RoleInfo | null>(null);

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
            try {
                await deleteRoleMutation.mutateAsync(role.roleId);
            } catch (error: unknown) {
                const message = error instanceof Error ? error.message : String(error);
                alert(message || "Failed to delete role.");
            }
        }
    }, [deleteRoleMutation]);

    const handleFormSubmit = async (formData: Partial<RoleInfo>, menuIds: string[]) => {
        try {
            let roleId = selectedRole?.roleId;

            if (selectedRole) {
                await updateRoleMutation.mutateAsync({ id: selectedRole.roleId, data: formData });
            } else {
                // If the backend doesn't return the new ID, we might need to adjust this
                // But usually, roleId is part of the formData if it's user-provided
                roleId = formData.roleId;
                await createRoleMutation.mutateAsync(formData);
            }

            if (roleId) {
                await assignMenusMutation.mutateAsync({ roleId, menuIds });
            }
            setDialogOpen(false);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);
            alert(message || "An error occurred.");
        }
    };

    const columns = React.useMemo(() => getColumns({
        onEdit: handleEdit,
        onDelete: handleDelete
    }), [handleEdit, handleDelete]);

    const table = useReactTable({
        data: rolesData?.list || [],
        columns,
        pageCount: rolesData?.pages || -1,
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
                        onRefresh={() => refetch()}
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
