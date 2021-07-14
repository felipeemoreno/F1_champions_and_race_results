import Driver from './Driver';

class RaceResult {
  season: number;

  round: number;

  raceName: string;

  Circuit: {
    circuitName: string;
  };

  date: string;

  Results: [
    {
      position: number;
      Driver: Driver;
    },
  ];

  constructor(
    season: number,
    round: number,
    raceName: string,
    circuitName: string,
    date: string,
    position: number,
    driverId: string,
    givenName: string,
    familyName: string,
  ) {
    this.season = season;
    this.round = round;
    this.raceName = raceName;
    this.Circuit = {
      circuitName,
    };
    this.date = date;
    this.Results = [
      {
        position,
        Driver: new Driver(driverId, givenName, familyName),
      },
    ];
  }
}

export default RaceResult;
