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
import { RoleInfo } from "@/types";
import { useRoles, useCreateRole, useUpdateRole, useDeleteRole, useAssignRoleMenus } from "@/hooks/useRoleQuery";
import { RoleDialog } from "./role-dialog";
import { useToast } from "@/hooks/use-toast";

export default function RolesPage() {
    const { toast } = useToast();
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    // Search state
    const [searchId, setSearchId] = React.useState("");

    // Pagination state
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const { data: rolesData } = useRoles(pagination.pageIndex, pagination.pageSize, searchId);
    const createRoleMutation = useCreateRole();
    const updateRoleMutation = useUpdateRole();
    const deleteRoleMutation = useDeleteRole();
    const assignRoleMenusMutation = useAssignRoleMenus();

    // Dialog state
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [selectedRole, setSelectedRole] = React.useState<RoleInfo | null>(null);

    const handleAdd = () => {
        setSelectedRole(null);
        setDialogOpen(true);
    };

    const handleFormSubmit = async (formData: Partial<RoleInfo>, menuIds: string[]) => {
        try {
            const roleId = selectedRole?.roleId || formData.roleId;

            if (selectedRole) {
                // Ensure roleId is present for update
                if (!roleId) throw new Error("Role ID is missing");
                await updateRoleMutation.mutateAsync({ id: selectedRole.roleId, data: formData });
                toast({ title: "수정 완료", description: "권한 정보가 수정되었습니다.", variant: "success" });
            } else {
                await createRoleMutation.mutateAsync(formData);
                toast({ title: "등록 완료", description: "새 권한이 등록되었습니다.", variant: "success" });
            }

            if (roleId) {
                await assignRoleMenusMutation.mutateAsync({ roleId, menuIds });
            }
            setDialogOpen(false);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);
            toast({ title: "오류 발생", description: message || "An error occurred.", variant: "destructive" });
        }
    };

    const columns = React.useMemo(() => getColumns(), []);

    // Selection mode
    const selectionMode: 'single' | 'multi' | undefined = 'single';

    const table = useReactTable({
        data: rolesData?.list || [],
        columns,
        pageCount: rolesData?.pages || -1,
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
        enableMultiRowSelection: (selectionMode as string) === 'multi',
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination,
        },
    });

    const handleEdit = React.useCallback(() => {
        const selectedRows = table.getSelectedRowModel().rows;
        if (selectedRows.length !== 1) {
            toast({
                title: "알림",
                description: "수정할 권한을 하나만 선택해주세요.",
                variant: "default",
            });
            return;
        }
        const role = selectedRows[0].original;
        setSelectedRole(role);
        setDialogOpen(true);
    }, [table, toast]);

    const handleDelete = React.useCallback(async () => {
        const selectedRows = table.getSelectedRowModel().rows;
        if (selectedRows.length === 0) {
            toast({
                title: "알림",
                description: "삭제할 권한을 선택해주세요.",
                variant: "default",
            });
            return;
        }

        const roleIds = selectedRows.map(row => row.original.roleId);
        if (confirm(`선택한 ${roleIds.length}개의 권한을 삭제하시겠습니까?`)) {
            try {
                for (const id of roleIds) {
                    await deleteRoleMutation.mutateAsync(id);
                }
                table.resetRowSelection();
                toast({ title: "삭제 완료", description: "권한이 삭제되었습니다.", variant: "success" });
            } catch (error: unknown) {
                const message = error instanceof Error ? error.message : String(error);
                toast({ title: "삭제 실패", description: message || "Failed to delete role.", variant: "destructive" });
            }
        }
    }, [table, deleteRoleMutation, toast]);

    const handleSearch = (term: string) => {
        setSearchId(term);
        setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    };

    return (
        <div className="w-full space-y-6">
            <div className="w-full space-y-4">
                <DataTableToolbar
                    onAdd={handleAdd}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onSearch={handleSearch}
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
