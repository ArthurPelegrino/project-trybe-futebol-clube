import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { generateToken } from '../validations/auth';

import { Response } from 'superagent';
import Users from '../database/models/UsersModels';
import LoginController from '../controllers/LoginController';

chai.use(chaiHttp);

const { expect } = chai;
const userMock = {
    id: 1,
    username: 'admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: 'secret_admin',
  }
describe('camada de login', () => {
  afterEach(() => {
    sinon.restore()
  })
  describe('testando a rota de login', () => {
    // it('vendo se é possível logar um usuario', async () => {
    //     const {body, status } = await chai.request(app).post('/login')
    //     .send({
    //         email: 'admin@admin.com',
    //         password: 'secret_admin',
    //     })

    //     expect(status).to.be.equal(200);
    //     expect(body).to.be.deep.equal({
    //         token: ''
    //     })
    // })
    it('retorna erro se corpo de email estiver vazio', async () => {
        const { body, status } = await chai.request(app).post('/login')
        .send({
            password: 'secret_admin',
        });
        expect(status).to.be.equal(400);
        expect(body).to.be.deep.equal({ message: 'All fields must be filled' });
    })

    it('retorna erro se corpo de senha estiver vazio', async () => {
        const { body, status } = await chai.request(app).post('/login')
        .send({
            email: 'admin@admin.com',
        });
        expect(status).to.be.equal(400);
        expect(body).to.be.deep.equal({ message: 'All fields must be filled' });
    })

    it('retorna erro ao receber um password invalido', async () => {
        const { body, status } = await chai.request(app).post('/login')
          .send({
            email: 'admin@admin.com',
            password: 'secr',
          });
  
        expect(status).to.be.equal(401);
        expect(body).to.be.deep.equal({ message: 'Invalid email or password' });
      })
  
      it('retorna erro 401 ao receber um email invalido', async () => {
        const { body, status } = await chai.request(app).post('/login')
          .send({
            email: 'adminadmin.com',
            password: 'secret_admin',
          });
  
        expect(status).to.be.equal(401);
        expect(body).to.be.deep.equal({ message: 'Invalid email or password' });
      })
  })
})
