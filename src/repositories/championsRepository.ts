import { AxiosResponse } from 'axios';
import Champion from '../models/Champion';

class ChampionsRepository {
  private champions: Champion[];

  constructor() {
    this.champions = [];
  }

  public list(response: AxiosResponse): Champion[] {
    const { data } = response;

    this.champions = data.MRData.StandingsTable.StandingsLists.map(
      (champion: Champion) => {
        return [
          new Champion(
            champion.season,
            champion.round,
            champion.DriverStandings[0].points,
            champion.DriverStandings[0].wins,
            champion.DriverStandings[0].Driver.driverId,
            champion.DriverStandings[0].Driver.givenName,
            champion.DriverStandings[0].Driver.familyName,
          ),
        ];
      },
    );
    return this.champions;
  }
}

export default ChampionsRepository;
