class Race {
  season: number;

  round: number;

  raceName: string;

  constructor(season: number, round: number, raceName: string) {
    this.season = season;
    this.round = round;
    this.raceName = raceName;
  }
}

export default Race;
