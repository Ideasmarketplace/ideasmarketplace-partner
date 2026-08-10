export type SortDirection = "asc" | "desc";

export interface SortState<T = any> {
  column: keyof T | string;
  direction: SortDirection;
}

export interface TableColumn<T = any> {
  id: string;
  header: string;
  accessorKey?: keyof T;
  width?: string;
  sortable?: boolean;
  align?: "left" | "center" | "right";
  className?: string;
  headerClassName?: string;
  cell?: (row: T) => React.ReactNode;
}

export interface DataTableProps<T = any> {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  toolbar?: React.ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
  stickyHeader?: boolean;
  zebra?: boolean;
  selectable?: boolean;
  rowKey?: keyof T;
  selectedRows?: string[];
  onRowSelect?: (id: string) => void;
  onRowClick?: (row: T) => void;
  sort?: SortState<T>;
  onSortChange?: (sort: SortState<T>) => void;
}
