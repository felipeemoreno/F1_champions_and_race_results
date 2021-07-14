import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import util from 'util';

import API from './services/api';

import RacesRepository from './repositories/RacesRepository';
import RacesResultsRepository from './repositories/RacesResultsRepository';
import ChampionsRepository from './repositories/ChampionsRepository';

const racesRepository = new RacesRepository();
const racesResultsRepository = new RacesResultsRepository();
const championsRepository = new ChampionsRepository();

const getRaces = (argv: yargs.Arguments) => {
  const { year } = argv;
  API.get(`${year}.json`)
    .then(response => {
      const races = racesRepository.list(response);

      if (!races) {
        console.error('Wrong Year!');
      }

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
      const racesResults = racesResultsRepository.list(response);

      if (!racesResults) {
        console.error('Round or year not found!');
      }

      console.log(util.inspect(racesResults, false, null, true));
      return racesResults;
    })
    .catch(err => {
      console.error(err);
    });
};

const getChampions = () => {
  API.get('driverStandings/1.json')
    .then(response => {
      const champions = championsRepository.list(response);

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
