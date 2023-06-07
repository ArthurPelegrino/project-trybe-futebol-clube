import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app'
import MatchesModel, { MatchAttributes } from '../database/models/MatchesModel';

chai.use(chaiHttp);

const { expect } = chai;

const allMatches = [
    {
      id: 1,
      homeTeamId: 16,
      homeTeamGoals: 1,
      awayTeamId: 8,
      awayTeamGoals: 1,
      inProgress: false,
      homeTeam: {
        teamName: 'São Paulo'
      },
      awayTeam: {
        teamName: 'Grêmio'
      }
    },
    {
      id: 41,
      homeTeamId: 16,
      homeTeamGoals: 2,
      awayTeamId: 9,
      awayTeamGoals: 0,
      inProgress: true,
      homeTeam: {
        teamName: 'São Paulo'
      },
      awayTeam: {
        teamName: 'Internacional'
      }
    }
  ];
  
  const match = [{
    id: 41,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: true,
  }];

describe('testando a rota /matches', () => {
  describe('GET', async () => {
    afterEach(() => {
      sinon.restore();
    })

    it('testando método findAll', async () => {
      sinon.stub(MatchesModel, 'findAll').resolves(match as unknown as MatchesModel[]);

      const { body, status } = await chai.request(app).get('/matches');

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(match);
    });
  });
//   
});