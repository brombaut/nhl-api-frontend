import { TableDataCell } from "./table-data-cell";

export class LinesTableDataCell extends TableDataCell {
  playerNumber: string;
  playerName: string;
  clickCallBack: Function;

  constructor(
    playerNumber: string,
    playerName: string,
    clickCallBack: Function
  ) {
    super();
    this.playerNumber = playerNumber;
    this.playerName = playerName;
    this.clickCallBack = clickCallBack;
  }
}
