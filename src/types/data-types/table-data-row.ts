export class TableDataRow {
  id: string;
  values: string[];
  clickCallBack?: Function;
  constructor(values: string[], clickCallBack?: Function) {
    this.id = values.join().replace(/\s/g, "");
    this.values = values;
    this.clickCallBack = clickCallBack;
  }
}
