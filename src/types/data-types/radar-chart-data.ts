export class RadarChartData {
  private _xLabels: Array<string> = [];
  private _yValues: Array<number> = [];
  private _yLabels: Array<string> = [];

  constructor(
    xLabels: Array<string>,
    yValues: Array<number>,
    yLabels?: Array<string>
  ) {
    for (let i = 0; i < xLabels.length; ++i) {
      this._xLabels.push(xLabels[i]);
      this._yValues.push(yValues[i]);
      this._yLabels.push(
        yLabels && yLabels.length > 0 ? yLabels[i] : yValues[i].toString()
      );
    }
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
