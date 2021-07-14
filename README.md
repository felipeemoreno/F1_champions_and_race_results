# F1 champions and Race Results
Projeto desenvolvido para pesquisa dos e listagem dos campeões da Formula 1 e resultado das corridas.


## Requisitos

- node v15.1.0
- Yarn 1.22.5


## Desenvolvendo
Projeto desenvolvido em Typescript e nodeJS.

- para utilizar clone o projeto em sua maquina;
- execute o comando yarn para instalação das dependências;
- yarn build para criar a pasta dist com o projeto compilado;
- yarn start para executar o projeto;



## Documentação
Formula One API
- https://documenter.getpostman.com/view/11586746/SztEa7bL#intro

*List all champions*
*Lista todos os campeões*
yarn start getChampions

*List races from a year*
*Lista corridas do ano*
yarn start getRaces --year=1991

*List the result of a race of the year*
*Lista o resultado de uma corrida do ano*
yarn start getRaceResults --year=1991 --round=1
