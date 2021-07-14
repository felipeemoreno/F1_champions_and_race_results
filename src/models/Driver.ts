class Driver {
  driverId: string;

  givenName: string;

  familyName: string;

  constructor(driverId: string, givenName: string, familyName: string) {
    this.driverId = driverId;
    this.givenName = givenName;
    this.familyName = familyName;
  }
}

export default Driver;
