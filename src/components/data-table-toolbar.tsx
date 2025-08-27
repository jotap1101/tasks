"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { DataTableViewOptions } from "@/components/data-table-view-options";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { priorities, statuses } from "../data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
      <div className="flex w-full flex-1 flex-col items-center gap-2 sm:w-auto sm:flex-row">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-full sm:w-[150px] lg:w-[250px]"
        />
        <div className="mr-auto flex flex-col items-stretch gap-2 sm:flex-row">
          {table.getColumn("status") && (
            <DataTableFacetedFilter
              column={table.getColumn("status")}
              title="Status"
              options={statuses}
            />
          )}
          {table.getColumn("priority") && (
            <DataTableFacetedFilter
              column={table.getColumn("priority")}
              title="Priority"
              options={priorities}
            />
          )}
          {isFiltered && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => table.resetColumnFilters()}
              className="justify-start"
            >
              Reset
              <X />
            </Button>
          )}
        </div>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <DataTableViewOptions table={table} />
        <Button size="sm">Add Task</Button>
      </div>
    </div>
  );
}
