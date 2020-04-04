import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Api } from "./api";
import { Conference } from "@/types/store-types/conference";
import { NhlApiResponseConferences } from "@/types/nhl-api-types/nhl-api-response-conferences";
import { NhlApiConference } from "@/types/nhl-api-types/nhl-api-conference";

const API_CONFERENCES = "https://statsapi.web.nhl.com/api/v1/conferences";

class ConferencesApi extends Api {
  public constructor(config?: AxiosRequestConfig) {
    super(config);
    this.getConferences = this.getConferences.bind(this);
  }

  public getConferences(): Promise<Array<Conference>> {
    return this.get<NhlApiResponseConferences>(API_CONFERENCES)
      .then(
        (conferencesApiResponse: AxiosResponse<NhlApiResponseConferences>) => {
          const {
            conferences: nhlApiConferences
          } = conferencesApiResponse.data;
          const conferences: Array<Conference> = nhlApiConferences.map(
            (nhlApiConference: NhlApiConference) =>
              new Conference(nhlApiConference)
          );
          return conferences;
        }
      )
      .catch((error: AxiosError) => {
        throw error;
      });
  }
}

export const conferencesApi = new ConferencesApi();
