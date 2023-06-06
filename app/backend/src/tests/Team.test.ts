import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamsModel from '../database/models/TeamsModel';
import TeamsService from '../services/TeamsService'

import { Response } from 'superagent';
import Teams from '../database/models/TeamsModel';

chai.use(chaiHttp);

const { expect } = chai;

const teamsMock = [
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  },
  {
    "id": 3,
    "teamName": "Botafogo"
  }
]

describe('findAll test, camada service', () => {
  afterEach(() => {
    sinon.restore()
  })
  describe('retornando um banco de dados', () => {
    it('retorna times corretamente', async () => {
      sinon.stub(TeamsModel, 'findAll').resolves(teamsMock as Teams[]);

      const { body, status } = await chai.request(app).get('/teams')

      expect(status).to.be.deep.equal(200);
      expect(body).to.be.deep.equal(teamsMock)
    })
    it('testando retorno de um time do banco de dados', async () => {
      sinon.stub(TeamsModel, 'findOne').resolves(teamsMock[0] as Teams);

      const { body, status } = await chai.request(app).get('/teams/1');
      
      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(teamsMock[0])
    })
  })
})
