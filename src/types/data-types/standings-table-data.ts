import { TableData } from "./table-data";
import { TableDataRow } from "./table-data-row";

export class StandingsTableData implements TableData {
  title: string;
  columns: string[];
  rows: TableDataRow[];
  teamNameIndex: number;
  highlightIndexes: number[];

  constructor(
    title: string,
    columns: string[],
    rows: TableDataRow[],
    teamNameIndex: number,
    highlightIndexes: number[]
  ) {
    this.title = title;
    this.columns = columns;
    this.rows = rows;
    this.teamNameIndex = teamNameIndex;
    this.highlightIndexes = highlightIndexes;
  }
}
