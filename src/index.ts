import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import API from './services/api';

interface RaceData {
  season: number;
  round: number;
  raceName: string;
}

interface ChampionsData {
  season: number;
  round: number;
  DriverStandings: [
    {
      points: number;
      wins: number;
      Driver: {
        driverId: string;
        givenName: string;
        familyName: string;
      };
    },
  ];
}

const getRounds = (argv: yargs.Arguments) => {
  const { year } = argv;
  API.get(`${year}.json`)
    .then(response => {
      const { data } = response;

      const racesDataResult = data.MRData.RaceTable.Races;

      const races = racesDataResult.map((race: RaceData) => {
        return [race.season, race.round, race.raceName];
      });

      console.table(races);
      return races;
    })
    .catch(err => {
      console.error(err);
    });
};

const getChampions = () => {
  API.get('driverStandings/1.json')
    .then(response => {
      const { data } = response;

      const championsDataResults = data.MRData.StandingsTable.StandingsLists;

      const champions = championsDataResults.map((champion: ChampionsData) => {
        return [
          champion.season,
          champion.round,
          champion.DriverStandings[0].points,
          champion.DriverStandings[0].wins,
          champion.DriverStandings[0].Driver.driverId,
          champion.DriverStandings[0].Driver.givenName,
          champion.DriverStandings[0].Driver.familyName,
        ];
      });

      console.table(champions);
      return champions;
    })
    .catch(err => {
      console.error(err);
    });
};

const init = yargs(hideBin(process.argv))
  .command(
    'getRounds',
    'list all races from a year, use --year ',
    {
      year: {
        describe: 'insert year from races',
        demandOption: true,
        alias: 'y',
      },
    },
    argv => {
      console.info(argv);
      getRounds(argv);
    },
  )
  .demandCommand(1)
  .command('getChampions', 'list all Champions', argv => {
    getChampions();
  })
  .demandCommand(1).argv;
