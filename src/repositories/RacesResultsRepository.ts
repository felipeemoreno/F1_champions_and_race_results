import { AxiosResponse } from 'axios';
import RaceResult from '../models/RaceResult';

class RaceResultsRepositories {
  private raceResults: RaceResult[];

  constructor() {
    this.raceResults = [];
  }

  public list(response: AxiosResponse): RaceResult[] | null {
    const { data } = response;
    const { total } = data.MRData;
    const { Races } = data.MRData.RaceTable;

    if (Number(total) === 0) {
      return null;
    }

    // this.raceResults = .map((race: RaceResult) => {
    this.raceResults = Races.map((race: RaceResult) => {
      return {
        Season: race.season,
        Round: race.round,
        'Race Name': race.raceName,
        Circuit: race.Circuit.circuitName,
        Date: race.date,
        Result: [
          race.Results.map(result => {
            return {
              Position: result.position,
              GivenName: result.Driver.givenName,
              FamilyName: result.Driver.familyName,
            };
          }),
        ],
      };
    });

    return this.raceResults;
  }
}

export default RaceResultsRepositories;
