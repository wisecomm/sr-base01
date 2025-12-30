"use client";

import * as React from "react";
import {
    ColumnFiltersState,
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
import { UserDetail } from "@/types";
import { getUsers, createUser, updateUser, deleteUser } from "./actions";
import { UserDialog } from "./user-dialog";

export default function UsersPage() {
    const [data, setData] = React.useState<UserDetail[]>([]);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
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
    const [selectedUser, setSelectedUser] = React.useState<UserDetail | null>(null);

    const fetchData = React.useCallback(async () => {
        setIsLoading(true);
        try {
            const result = await getUsers(pagination.pageIndex, pagination.pageSize);
            if (result.code === "200" && result.data) {
                setData(result.data.list);
                setPageCount(result.data.pages);
            }
        } catch (error) {
            console.error("Failed to fetch users:", error);
        } finally {
            setIsLoading(false);
        }
    }, [pagination.pageIndex, pagination.pageSize]);

    React.useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleAdd = () => {
        setSelectedUser(null);
        setDialogOpen(true);
    };

    const handleEdit = React.useCallback((user: UserDetail) => {
        setSelectedUser(user);
        setDialogOpen(true);
    }, []);

    const handleDelete = React.useCallback(async (user: UserDetail) => {
        if (confirm(`Are you sure you want to delete user ${user.userId}?`)) {
            const result = await deleteUser(user.userId);
            if (result.code === "200") {
                fetchData();
            } else {
                alert(result.message || "Failed to delete user.");
            }
        }
    }, [fetchData]);

    const handleFormSubmit = async (formData: Partial<UserDetail>, roleIds: string[]) => {
        let result;
        let userId = selectedUser?.userId;

        if (selectedUser) {
            result = await updateUser(selectedUser.userId, formData);
        } else {
            result = await createUser(formData);
            userId = formData.userId; // Use the userId from form for new users
        }

        if (result.code === "200") {
            // Assign roles if userId is available
            if (userId) {
                const { assignUserRoles } = await import("./actions");
                await assignUserRoles(userId, roleIds);
            }
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
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        state: {
            sorting,
            columnFilters,
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
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">User Management</h1>
                        <p className="text-slate-500 dark:text-slate-400">Manage your system users and their profiles</p>
                    </div>
                </div>

                <div className="w-full space-y-4">
                    <DataTableToolbar
                        table={table}
                        onAdd={handleAdd}
                        onRefresh={fetchData}
                        isLoading={isLoading}
                    />
                    <DataTable table={table} showSeparators={true} />
                </div>
            </div>

            <UserDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                user={selectedUser}
                onSubmit={handleFormSubmit}
            />
        </div>
    );
}
