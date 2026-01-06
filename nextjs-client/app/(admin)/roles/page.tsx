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
import { DataTable } from "@/components/data-table";
import { DataTableToolbar } from "./data-table-toolbar";
import { RoleInfo } from "@/types";
import { useRoles, useCreateRole, useUpdateRole, useDeleteRole, useAssignRoleMenus } from "@/hooks/useRoleQuery";
import { RoleDialog } from "./role-dialog";
import { useToast } from "@/hooks/use-toast";

export default function RolesPage() {
    const { toast } = useToast();
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
                toast({ title: "삭제 완료", description: "역할이 삭제되었습니다.", variant: "success" });
            } catch (error: unknown) {
                const message = error instanceof Error ? error.message : String(error);
                toast({ title: "삭제 실패", description: message || "Failed to delete role.", variant: "destructive" });
            }
        }
    }, [deleteRoleMutation, toast]);

    const handleFormSubmit = async (formData: Partial<RoleInfo>, menuIds: string[]) => {
        try {
            let roleId = selectedRole?.roleId;

            if (selectedRole) {
                await updateRoleMutation.mutateAsync({ id: selectedRole.roleId, data: formData });
                toast({ title: "수정 완료", description: "역할 정보가 수정되었습니다.", variant: "success" });
            } else {
                roleId = formData.roleId;
                await createRoleMutation.mutateAsync(formData);
                toast({ title: "등록 완료", description: "새 역할이 등록되었습니다.", variant: "success" });
            }

            if (roleId) {
                await assignMenusMutation.mutateAsync({ roleId, menuIds });
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
        <div className="w-full space-y-6">
            <div className="w-full space-y-4">
                <DataTableToolbar
                    onAdd={handleAdd}
                    onRefresh={() => refetch()}
                    isLoading={isLoading}
                />
                <DataTable table={table} showSeparators={true} />
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
