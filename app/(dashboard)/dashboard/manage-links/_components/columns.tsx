"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { SecureLink } from "@/lib/generated/prisma";
import { CheckCircleIcon, Eye, XCircleIcon, ZapIcon } from "lucide-react";

export const columns: ColumnDef<SecureLink>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
        className="translate-y-[2px] cursor-pointer"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px] cursor-pointer"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <Badge variant="outline" className="gap-1.5">
            <span
              className={`size-1.5 rounded-full ${
                row.getValue("type") === "TEXT"
                  ? "bg-emerald-500"
                  : "bg-amber-500"
              }`}
              aria-hidden="true"
            ></span>
            {row.getValue("type")}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "currentViews",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Views" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Badge variant="secondary">
            <Eye
              className="-ms-0.5 opacity-60 mr-1"
              size={12}
              aria-hidden="true"
            />
            {row.getValue("currentViews")}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "maxViews",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Max Views" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Badge variant="secondary">
            <ZapIcon
              className="-ms-0.5 opacity-60 mr-1"
              size={12}
              aria-hidden="true"
            />
            {row.getValue("maxViews")}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "isExpired",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="isExpired" />
    ),
    cell: ({ row }) => {
      // Get the original data from the row
      const secureLink = row.original;

      // Calculate if the link is expired
      const isExpired =
        // Check if expiresAt exists and has passed
        (secureLink.expiresAt && new Date(secureLink.expiresAt) < new Date()) ||
        // Check if currentViews has reached or exceeded maxViews
        secureLink.currentViews >= secureLink.maxViews;

      return (
        <div className="flex items-center">
          <Badge variant={isExpired ? "destructive" : "secondary"}>
            {isExpired ? (
              <>
                <XCircleIcon
                  className="-ms-0.5 mr-1 opacity-70"
                  size={12}
                  aria-hidden="true"
                />
                TRUE
              </>
            ) : (
              <>
                <CheckCircleIcon
                  className="-ms-0.5 mr-1 opacity-70"
                  size={12}
                  aria-hidden="true"
                />
                FALSE
              </>
            )}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      // Calculate isExpired for filtering
      const secureLink = row.original;
      const isExpired =
        (secureLink.expiresAt && new Date(secureLink.expiresAt) < new Date()) ||
        secureLink.currentViews >= secureLink.maxViews;

      // Convert boolean to string for filtering
      const stringValue = isExpired ? "TRUE" : "FALSE";
      return value.includes(stringValue);
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
