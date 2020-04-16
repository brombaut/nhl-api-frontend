import { ChartData } from "./chart-data";
import statsLookupTable from "@/data/stats-lookup-table";

export class ChartDataBuilder {
  private _attributes: Array<string> = [];
  private _yValuesSource: { [key: string]: string } = {};
  private _yLabelsSource: { [key: string]: string } = {};
  private _useNhlRankingSource = false;
  private _useYLabels = false;
  private _title = "";

  public setAttributes(attributes: Array<string>) {
    this._attributes = attributes;
    return this;
  }

  public setTitle(title: string) {
    this._title = title;
    return this;
  }

  public setYValuesSource(values: { [key: string]: string }) {
    this._yValuesSource = values;
    return this;
  }

  public setYLabelsSource(labels: { [key: string]: string }) {
    this._yLabelsSource = labels;
    this._useYLabels = true;
    return this;
  }

  public setUseNhlRanking(use: boolean) {
    this._useNhlRankingSource = use;
    return this;
  }

  public buildRadarChartData() {
    const xLabels: Array<string> = this.buildXLabels();
    const yValues: Array<number> = this.buildYValues();
    let yLabels: Array<string> = [];
    if (this._useYLabels) {
      yLabels = this.buildYLabels();
    }
    return new ChartData(this._title, xLabels, yValues, yLabels);
  }

  private buildXLabels(): Array<string> {
    const xLabels: Array<string> = [];
    this._attributes.forEach((att: string) => {
      xLabels.push(statsLookupTable[att].label);
    });
    return xLabels;
  }

  private buildYValues(): Array<number> {
    const yValues: Array<number> = [];
    this._attributes.forEach((att: string) => {
      if (this._useNhlRankingSource) {
        yValues.push(31 - Number.parseInt(this._yValuesSource[att]));
      } else {
        yValues.push(Number.parseInt(this._yValuesSource[att]));
      }
    });
    return yValues;
  }

  private buildYLabels(): Array<string> {
    const yLabels: Array<string> = [];
    this._attributes.forEach((att: string) => {
      yLabels.push(this._yLabelsSource[att]?.toString());
    });
    this._useYLabels = true;
    return yLabels;
  }
}
