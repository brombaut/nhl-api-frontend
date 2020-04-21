import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Api } from "../api";
import { Division } from "@/types/store-types/division";
import { NhlApiResponseDivisionss } from "@/types/nhl-api-types/nhl-api-response-divisions";
import { NhlApiDivision } from "@/types/nhl-api-types/nhl-api-division";

const API_DIVISIONS = "https://statsapi.web.nhl.com/api/v1/divisions";

class DivisionsApi extends Api {
  public constructor(config?: AxiosRequestConfig) {
    super(config);
    this.getDivisions = this.getDivisions.bind(this);
  }

  public getDivisions(): Promise<Array<Division>> {
    return this.get<NhlApiResponseDivisionss>(API_DIVISIONS)
      .then((divisionsApiResponse: AxiosResponse<NhlApiResponseDivisionss>) => {
        const { divisions: nhlApiDivisions } = divisionsApiResponse.data;
        const divisions: Array<Division> = nhlApiDivisions.map(
          (nhlApiDivisions: NhlApiDivision) => new Division(nhlApiDivisions)
        );
        return divisions;
      })
      .catch((error: AxiosError) => {
        throw error;
      });
  }
}

export const divisionsApi = new DivisionsApi();
