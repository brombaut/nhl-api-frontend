import { TableDataCell } from "./table-data-cell";

export class LinesTableDataCell extends TableDataCell {
  playerNumber: string;
  playerName: string;
  clickCallBack: Function;
  playerId: number;

  constructor(
    playerNumber: string,
    playerName: string,
    clickCallBack: Function,
    playerId: number
  ) {
    super();
    this.playerNumber = playerNumber;
    this.playerName = playerName;
    this.clickCallBack = clickCallBack;
    this.playerId = playerId;
  }
}
