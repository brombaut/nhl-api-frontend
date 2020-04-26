import { LineCombination } from "@/types/store-types/line-combination";
import {
  Module,
  VuexModule,
  getModule,
  Mutation,
  Action
} from "vuex-module-decorators";
import store from "@/store";
import { LinesScraper } from "@/services/lines-scraper/lines-scraper";
import { LabelValuePair } from "@/types/data-types/label-value-pair";
import { PlayersModule } from "./players";
import { PositionAbbreviation } from "@/types/scraper-types/position-abbreviation";
import { NullPlayer } from "@/types/store-types/player";
import { TeamsModule } from "./teams";
import { NullTeam, Team } from "@/types/store-types/team";

export interface LineCombinationsState {
  lineCombinations: LineCombination[];
}

@Module({ dynamic: true, store, name: "lineCombinations" })
class LineCombinations extends VuexModule implements LineCombinationsState {
  private _lineCombinations: LineCombination[] = [];

  public get lineCombinations(): LineCombination[] {
    return this._lineCombinations;
  }

  public get teamLines(): (teamId: number) => LineCombination[] {
    return (teamId: number) => {
      return this._lineCombinations.filter(
        (lc: LineCombination) => lc.teamId === teamId
      );
    };
  }

  @Action
  public async loadTeamLineCombinations(teamId: number): Promise<void> {
    const team: Team = TeamsModule.teamById(teamId);
    if (team instanceof NullTeam) {
      return;
    }
    const scrapedPairs: LabelValuePair[] = await LinesScraper.scrapeLines(
      team.name
    );
    const lineCombinations: LineCombination[] = scrapedPairs.map(
      (pair: LabelValuePair) => {
        const player = PlayersModule.playerByName(pair.value);
        if (player instanceof NullPlayer) {
          return new LineCombination(
            0,
            teamId,
            pair.label as PositionAbbreviation
          );
        }
        return new LineCombination(
          player.id,
          teamId,
          pair.label as PositionAbbreviation
        );
      }
    );
    lineCombinations.map(this.addLineCombination);
  }

  @Mutation
  private addLineCombination(lc: LineCombination): void {
    this._lineCombinations.push(lc);
  }
}

export const LineCombinationsModule = getModule(LineCombinations);
