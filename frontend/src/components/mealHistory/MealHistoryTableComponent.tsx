import React from "react";
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    flexRender,
} from "@tanstack/react-table";
import type { ColumnDef, SortingState } from "@tanstack/react-table";
import type { TableMeal } from "../../types/stats";

import './MealHistory.css'
import { deleteMeal } from "../../api_calls/stats";

type Props = {
    meals: TableMeal[];
    onDataChange: React.Dispatch<React.SetStateAction<number>>;
};

const MealHistoryTableComponent: React.FC<Props> = ({ meals, onDataChange }) => {
    const [sorting, setSorting] = React.useState<SortingState>([
        { id: "date", desc: true },
        { id: "time", desc: true },
    ]);
    const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 10 });

    // Placeholder for delete API call
    const handleDeleteMeal = async (mealId: number) => {
        try {

            const result = await deleteMeal(mealId);
            if (result.success) {
                onDataChange(prev => prev + 1);
            }
            console.log(result.message)

        } catch (error) {
            console.error("Error deleting meal:", error);
        }
    };

    const columns: ColumnDef<TableMeal>[] = [
        {
            id: "date",
            accessorKey: "eatenAt",
            header: "Date",
            cell: info => {
                const date = new Date(info.getValue() as string);
                return date.toLocaleDateString();
            },
            sortingFn: 'datetime',
        },
        {
            id: "time",
            accessorKey: "eatenAt",
            header: "Time",
            cell: info => {
                const date = new Date(info.getValue() as string);
                return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            },
            enableSorting: false,
        },
        {
            accessorKey: "meal",
            header: "Meal",
        },
        {
            accessorKey: "restaurant",
            header: "Restaurant",
        },
        {
            accessorKey: "price",
            header: "Price",
            cell: info => `$${(info.getValue() as number).toFixed(2)}`,
            sortingFn: "alphanumeric",
        },
        {
            id: "actions",
            header: "Delete",
            cell: ({ row }) => (
                <button
                    className="delete-button"
                    onClick={() => handleDeleteMeal(row.original.id)}
                    aria-label="Delete meal"
                    title="Delete meal"
                >
                    🗑️
                </button>
            ),
            enableSorting: false,
            size: 50,
        },
    ];

    const table = useReactTable({
        data: meals,
        columns,
        state: { sorting, pagination },
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: true,
    });

    return (
        <>
            <table className="meal-table">
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} style={{ cursor: "default" }}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination-controls">
                <button
                    className="pagination-button"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                    title="First Page"
                >
                    {"<<"}
                </button>
                <button
                    className="pagination-button"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    title="Previous Page"
                >
                    {"<"}
                </button>

                <span className="pagination-info">
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </span>

                <button
                    className="pagination-button"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    title="Next Page"
                >
                    {">"}
                </button>
                <button
                    className="pagination-button"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                    title="Last Page"
                >
                    {">>"}
                </button>
            </div>
        </>
    );
};

export default MealHistoryTableComponent;
