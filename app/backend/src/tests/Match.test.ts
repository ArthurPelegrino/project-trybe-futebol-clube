import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app'
import MatchesModel, { MatchAttributes } from '../database/models/MatchesModel';
import MatchesService from '../services/MatchService';

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
  describe('POST', () => {
    afterEach(() => {
      sinon.restore();
    })
    const newMatch = {
      id: 1,
      homeTeamId: 16,
      homeTeamGoals: 2,
      awayTeamId: 8,
      awayTeamGoals: 2,
      inProgress: true,
    };
    const newMatchBody = {
      homeTeamId: 16,
      awayTeamId: 8, 
      homeTeamGoals: 2,
      awayTeamGoals: 2,
    };
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTY4NDMzNTU2MCwiZXhwIjoxNjg0NTk0NzYwfQ.
    QieacH1Ti1L9pKORenmQ7EC9eKnXBD9zqBuL9FPaCeU`;
    it('testando método addMatch', async () => {
      sinon.stub(MatchesService, 'registerGame').resolves({
        id: 49,
        homeTeamId: 16,
        homeTeamGoals: 2,
        awayTeamId: 8,
        awayTeamGoals: 2,
        inProgress: true,
      } as unknown as MatchesModel);

      const { status, body } = await chai.request(app).post('/matches').send(newMatchBody).set('Authorization', token)
        .send(newMatchBody);

      expect(status).to.be.equal(201);
      expect(body).to.be.deep.equal(newMatch);
    });
  });
});