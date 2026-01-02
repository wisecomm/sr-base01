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
import { useUsers, useUpdateUser, useCreateUser, useDeleteUser, useAssignUserRoles } from "@/hooks/useUserQuery";
import { UserDialog } from "./user-dialog";
import { useToast } from "@/hooks/use-toast";

export default function UsersPage() {
    const { toast } = useToast();
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    // Pagination state
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const { data: usersData, isLoading, refetch } = useUsers(pagination.pageIndex, pagination.pageSize);
    const createUserMutation = useCreateUser();
    const updateUserMutation = useUpdateUser();
    const deleteUserMutation = useDeleteUser();
    const assignRolesMutation = useAssignUserRoles();

    // Dialog state
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [selectedUser, setSelectedUser] = React.useState<UserDetail | null>(null);

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
            try {
                await deleteUserMutation.mutateAsync(user.userId);
                toast({ title: "삭제 완료", description: "사용자가 삭제되었습니다.", variant: "success" });
            } catch (error: unknown) {
                const message = error instanceof Error ? error.message : String(error);
                toast({ title: "삭제 실패", description: message || "Failed to delete user.", variant: "destructive" });
            }
        }
    }, [deleteUserMutation, toast]);

    const handleFormSubmit = async (formData: Partial<UserDetail>, roleIds: string[]) => {
        try {
            const userId = selectedUser?.userId || formData.userId;

            if (selectedUser) {
                await updateUserMutation.mutateAsync({ id: selectedUser.userId, data: formData });
                toast({ title: "수정 완료", description: "사용자 정보가 수정되었습니다.", variant: "success" });
            } else {
                await createUserMutation.mutateAsync(formData);
                toast({ title: "등록 완료", description: "새 사용자가 등록되었습니다.", variant: "success" });
            }

            if (userId) {
                await assignRolesMutation.mutateAsync({ userId, roleIds });
            }
            setDialogOpen(false);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);
            toast({ title: "오류 발생", description: message || "An error occurred.", variant: "destructive" });
        }
    };

    const columns = React.useMemo(() => getColumns({
        onEdit: handleEdit,
        onDelete: handleDelete
    }), [handleEdit, handleDelete]);

    const table = useReactTable({
        data: usersData?.list || [],
        columns,
        pageCount: usersData?.pages || -1,
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
                        onRefresh={() => refetch()}
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
