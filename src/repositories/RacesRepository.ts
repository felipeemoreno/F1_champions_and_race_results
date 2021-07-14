import { AxiosResponse } from 'axios';
import Race from '../models/Race';

class RacesRepository {
  private races: Race[];

  constructor() {
    this.races = [];
  }

  public list(response: AxiosResponse): Race[] | null {
    const { data } = response;
    const { total } = data.MRData;
    const { Races } = data.MRData.RaceTable;

    if (Number(total) === 0) {
      return null;
    }

    this.races = Races.map((race: Race) => {
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
