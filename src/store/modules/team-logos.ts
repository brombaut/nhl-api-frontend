import { VuexModule, Module, getModule } from "vuex-module-decorators";
import store from "@/store";
import { TeamLogo } from "@/types/data-types/team-logo";
import teamLogos from "@/data/team-logos";
import { TeamsModule } from "./teams";

export interface TeamLogosState {
  teamLogos: Array<TeamLogo>;
}

@Module({ dynamic: true, store, name: "teamLogos" })
class TeamLogos extends VuexModule implements TeamLogosState {
  private _teamLogos: Array<TeamLogo> = teamLogos;

  public get teamLogos(): Array<TeamLogo> {
    return this._teamLogos;
  }

  public get sortedTeamLogos(): Array<TeamLogo> {
    const sorted = teamLogos.sort((a: TeamLogo, b: TeamLogo) => {
      const teamA = TeamsModule.teamByAbbreviation(a.abbreviation);
      const teamB = TeamsModule.teamByAbbreviation(b.abbreviation);
      if (!teamA) return 1;
      if (!teamB) return -1;
      if (teamA.name > teamB.name) {
        return 1;
      }
      return -1;
    });
    return sorted;
  }

  public get selectedTeamLogo(): TeamLogo | null {
    if (!TeamsModule.selectedTeam) {
      return null;
    }
    const selectedAbbreviation = TeamsModule.selectedTeam.abbreviation;
    const teamLogoObj = this._teamLogos.find((t: TeamLogo) => {
      return t.abbreviation === selectedAbbreviation;
    });
    return teamLogoObj || null;
  }

  public get selectedPrimaryColor(): string {
    if (!this.selectedTeamLogo) {
      return "";
    }
    return this.selectedTeamLogo.primaryColor;
  }

  public get selectedSecondaryColor(): string {
    if (!this.selectedTeamLogo) {
      return "";
    }
    return this.selectedTeamLogo.secondaryColor;
  }

  public get selectedBackdropColor(): string {
    if (!this.selectedTeamLogo) {
      return "#283243";
    }
    return this.selectedTeamLogo.backdropColor || "#283243";
  }

  public get selectedFilename(): string {
    if (!this.selectedTeamLogo) {
      return "";
    }
    return this.selectedTeamLogo.fileName;
  }
}

export const TeamLogosModule = getModule(TeamLogos);
