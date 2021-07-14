import { AxiosResponse } from 'axios';
import Race from '../models/Race';

class RacesRepository {
  private races: Race[];

  constructor() {
    this.races = [];
  }

  public list(response: AxiosResponse): Race[] {
    const { data } = response;

    this.races = data.MRData.RaceTable.Races.map((race: Race) => {
      return {
        Season: race.season,
        Round: race.round,
        RaceName: race.raceName,
      };
    });
    return this.races;
  }
}

export default RacesRepository;
