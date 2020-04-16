export class ChartData {
  private _title = "";
  private _xLabels: Array<string> = [];
  private _yValues: Array<number> = [];
  private _yLabels: Array<string> = [];

  constructor(
    title: string,
    xLabels: Array<string>,
    yValues: Array<number>,
    yLabels?: Array<string>
  ) {
    this._title = title;
    for (let i = 0; i < xLabels.length; ++i) {
      this._xLabels.push(xLabels[i]);
      this._yValues.push(yValues[i]);
      this._yLabels.push(
        yLabels && yLabels.length > 0 ? yLabels[i] : yValues[i].toString()
      );
    }
  }

  get title() {
    return this._title;
  }

  get xLabels() {
    return this._xLabels;
  }

  get yValues() {
    return this._yValues;
  }

  get yLabels() {
    return this._yLabels;
  }
}
