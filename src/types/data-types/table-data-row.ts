export class TableDataRow {
  id: string;
  values: string[];
  clickCallBack?: Function;
  entityId?: number;

  constructor(
    values: string[],
    clickCallBack?: Function,
    entityId?: number,
    id?: string
  ) {
    if (id) {
      this.id = id;
    } else {
      this.id = values.join().replace(/\s/g, "");
    }
    this.values = values;
    this.clickCallBack = clickCallBack;
    this.entityId = entityId;
  }
}
