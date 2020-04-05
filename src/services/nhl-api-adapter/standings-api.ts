import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Api } from "./api";
import { NhlApiResponseStandingsTypes } from "@/types/nhl-api-types/nhl-api-response-standings-types";
import { NhlApiResponseStandings } from "@/types/nhl-api-types/nhl-api-response-standings";
import { StandingsType } from "@/types/store-types/standings-type";
import { NhlApiStandingsType } from "@/types/nhl-api-types/nhl-api-standings-type";
import { StandingsRecord } from "@/types/store-types/standings";

const API_STANDINGS = "https://statsapi.web.nhl.com/api/v1/standings";
const API_STANDINGS_TYPES =
  "https://statsapi.web.nhl.com/api/v1/standingsTypes";

class StandingsApi extends Api {
  public constructor(config?: AxiosRequestConfig) {
    super(config);
    this.getStandingsTypes = this.getStandingsTypes.bind(this);
    this.getRegularSeasonStandings = this.getRegularSeasonStandings.bind(this);
  }

  public getStandingsTypes(): Promise<Array<StandingsType>> {
    return this.get<NhlApiResponseStandingsTypes>(API_STANDINGS_TYPES)
      .then(
        (
          standingsTypesApiResponse: AxiosResponse<NhlApiResponseStandingsTypes>
        ) => {
          const nhlApiStandingsStypes: Array<NhlApiStandingsType> =
            standingsTypesApiResponse.data;
          const standingsTypes: Array<StandingsType> = nhlApiStandingsStypes.map(
            (nhlApiStandingsType: NhlApiStandingsType) =>
              new StandingsType(nhlApiStandingsType)
          );
          return standingsTypes;
        }
      )
      .catch((error: AxiosError) => {
        throw error;
      });
  }

  public getRegularSeasonStandings(): Promise<Array<StandingsRecord>> {
    return this.get<NhlApiResponseStandings>(API_STANDINGS)
      .then((standingsApiResponse: AxiosResponse<NhlApiResponseStandings>) => {
        const { records: nhlApiStandings } = standingsApiResponse.data;
        const divisionStandings: Array<StandingsRecord> = nhlApiStandings.map(
          standings => new StandingsRecord(standings)
        );
        return divisionStandings;
      })
      .catch((error: AxiosError) => {
        throw error;
      });
  }

  public getStandingsByType(
    type: StandingsType
  ): Promise<Array<StandingsRecord>> {
    return this.get<NhlApiResponseStandings>(`${API_STANDINGS}/${type.name}`)
      .then((standingsApiResponse: AxiosResponse<NhlApiResponseStandings>) => {
        const { records: nhlApiStandings } = standingsApiResponse.data;
        const divisionStandings: Array<StandingsRecord> = nhlApiStandings.map(
          standings => new StandingsRecord(standings)
        );
        return divisionStandings;
      })
      .catch((error: AxiosError) => {
        throw error;
      });
  }
}

export const standingsApi = new StandingsApi();
