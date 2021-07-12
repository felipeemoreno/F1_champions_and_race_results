import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import util from 'util';

import API from './services/api';

interface RaceData {
  season: number;
  round: number;
  raceName: string;
}

interface RaceResultsData {
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
      Driver: {
        givenName: string;
        familyName: string;
      };
    },
    {
      position: number;
      Driver: {
        givenName: string;
        familyName: string;
      };
    },
    {
      position: number;
      Driver: {
        givenName: string;
        familyName: string;
      };
    },
  ];
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

const getRaces = (argv: yargs.Arguments) => {
  const { year } = argv;
  API.get(`${year}.json`)
    .then(response => {
      const { data } = response;

      const racesDataResult = data.MRData.RaceTable.Races;

      const races = racesDataResult.map((race: RaceData) => {
        return {
          Season: race.season,
          Round: race.round,
          RaceName: race.raceName,
        };
      });

      console.table(races);
      return races;
    })
    .catch(err => {
      console.error(err);
    });
};

const getRaceResults = (argv: yargs.Arguments) => {
  const { year, round } = argv;
  API.get(`${year}/${round}/results.json`)
    .then(response => {
      const { data } = response;

      const racesDataResult = data.MRData.RaceTable.Races;

      const races = racesDataResult.map((race: RaceResultsData) => {
        return {
          Season: race.season,
          Round: race.round,
          'Race Name': race.raceName,
          Circuit: race.Circuit.circuitName,
          Date: race.date,
          Result: [
            {
              Position: race.Results[0].position,
              GivenName: race.Results[0].Driver.givenName,
              FamilyName: race.Results[0].Driver.familyName,
            },
            {
              Position: race.Results[1].position,
              GivenName: race.Results[1].Driver.givenName,
              FamilyName: race.Results[1].Driver.familyName,
            },
            {
              Position: race.Results[2].position,
              GivenName: race.Results[2].Driver.givenName,
              FamilyName: race.Results[2].Driver.familyName,
            },
          ],
        };
      });

      console.log(util.inspect(races, false, null, true));
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
    'getRaceResults',
    'list all races from a year, use --year && use --round',
    {
      year: {
        describe: 'insert year from races',
        demandOption: true,
        alias: 'y',
      },
      round: {
        describe:
          'insert number of the round, if you do not know, use getRaces with --year to view the rounds of the year',
        demandOption: true,
        alias: 'r',
      },
    },
    argv => {
      console.info(argv);
      getRaceResults(argv);
    },
  )
  .demandCommand(1)
  .command(
    'getRaces',
    'list all races from a year, use --year',
    {
      year: {
        describe: 'insert year from races',
        demandOption: true,
        alias: 'y',
      },
    },
    argv => {
      console.info(argv);
      getRaces(argv);
    },
  )
  .demandCommand(1)
  .command('getChampions', 'list all Champions', argv => {
    getChampions();
  })
  .demandCommand(1).argv;
