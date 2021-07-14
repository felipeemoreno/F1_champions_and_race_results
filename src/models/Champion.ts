import Driver from './Driver';

class Champion {
  season: number;

  round: number;

  DriverStandings: [
    {
      points: number;
      wins: number;
      Driver: Driver;
    },
  ];

  constructor(
    season: number,
    round: number,
    points: number,
    wins: number,
    driverId: string,
    givenName: string,
    familyName: string,
  ) {
    this.season = season;
    this.round = round;
    this.DriverStandings = [
      {
        points,
        wins,
        Driver: new Driver(driverId, givenName, familyName),
      },
    ];
  }
}

export default Champion;
