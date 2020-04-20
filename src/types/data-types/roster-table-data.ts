import { TableData } from "./table-data";
import { TableDataRow } from "./table-data-row";

export class RosterTableData implements TableData {
  title: string;
  columns: string[];
  rows: TableDataRow[];

  constructor(title: string, columns: string[], rows: TableDataRow[]) {
    this.title = title;
    this.columns = columns;
    this.rows = rows;
  }
}
