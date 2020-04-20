import { TableDataRow } from "./table-data-row";

export interface TableData {
  title: string;
  columns: string[];
  rows: TableDataRow[];
}
