import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { Api } from "../api";
import cheerio from "cheerio";
import { LabelValuePair } from "@/types/data-types/label-value-pair";
import { PositionAbbreviation } from "@/types/scraper-types/position-abbreviation";

class LineScraper extends Api {
  public constructor(config?: AxiosRequestConfig) {
    super(config);
    this.scrapeLines = this.scrapeLines.bind(this);
  }

  public scrapeLines(teamName: string): Promise<LabelValuePair[]> {
    const url = this.buildUrl(teamName);
    return this.get<string>(url)
      .then(this.buildLinesFromResponse)
      .catch((error: AxiosError) => {
        throw error;
      });
  }

  private buildUrl(teamName: string) {
    const formatedTeamName = this.formatTeamName(teamName);
    const url = `https://cors-anywhere.herokuapp.com/https://www.dailyfaceoff.com/teams/${formatedTeamName}/line-combinations/`;
    return url;
  }

  private formatTeamName(teamName: string) {
    return teamName.toLowerCase().replace(" ", "-");
  }

  private buildLinesFromResponse(
    page: AxiosResponse<string>
  ): LabelValuePair[] {
    const $ = cheerio.load(page.data);
    const allPositionNameKeyValPairs: LabelValuePair[] = [];
    Object.values(PositionAbbreviation).forEach(pos => {
      const playerName: string = $(`#${pos} .player-name`).text();
      allPositionNameKeyValPairs.push(new LabelValuePair(pos, playerName));
    });
    return allPositionNameKeyValPairs;
  }
}

export const LinesScraper = new LineScraper();
