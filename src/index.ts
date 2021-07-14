import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import util from 'util';

import API from './services/api';

import Champion from './models/Champion';
import Race from './models/Race';
import RaceResult from './models/RaceResult';

const getRaces = (argv: yargs.Arguments) => {
  const { year } = argv;
  API.get(`${year}.json`)
    .then(response => {
      const { data } = response;

      const racesDataResult = data.MRData.RaceTable.Races;

      const races = racesDataResult.map((race: Race) => {
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

      const races = racesDataResult.map((race: RaceResult) => {
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

      const champions: Champion[] = championsDataResults.map(
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

      console.log(util.inspect(champions, false, null, true));
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
