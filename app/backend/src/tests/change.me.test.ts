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
  describe('retornando um banco de dados vazio', () => {
    it('retorna um array vazio', async () => {
      sinon.stub(TeamsModel, 'findAll').resolves([])
      const teams = await TeamsService.findAll();
      expect(teams).to.be.deep.equal([])
    })
  })
  describe('caso com bando populado', () => {
    it('retorna um array populado', async () => {
      sinon.stub(TeamsModel, 'findAll').resolves(teamsMock as any)
      const teams = await TeamsService.findAll();
      expect(teams).to.be.deep.equal(teamsMock)
    })
  });
  afterEach(sinon.restore);
});

describe('findAll test, camada controller', () => {
  it('retorna status e json esperados', async () => {
    const req = {};
    const res = {};

    sinon.stub(TeamsService, 'findAll')
    .resolves({type: null, message: teamsMock})
  })
})
