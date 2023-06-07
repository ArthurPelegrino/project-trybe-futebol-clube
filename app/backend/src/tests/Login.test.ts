import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as bcrypt from 'bcryptjs';
import { app } from '../app';
// import { generateToken } from '../validations/auth';

import { Response } from 'superagent';
import Users from '../database/models/UsersModels';
import LoginController from '../controllers/LoginController';
import LoginService from '../services/LoginService'
import { generateToken } from '../validations/auth';
import { tokenValidation } from '../middlewares/middleware';

chai.use(chaiHttp);

const { expect } = chai;
const userMock = {
    id: 1,
    username: 'admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: 'secret_admin',
  }
  let token = `aB3xk8Ft9R`
  const createTokenMock = async () => {
    let response: Response;
    sinon
        .stub(Users, "findOne")
        .resolves(userMock as Users);
    sinon.stub(bcrypt, 'compareSync').returns(true);
    response = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: 'secret_admin'
    });
    return response.body.token;
  }
describe('camada de login', () => {
  let response: Response
  afterEach(() => {
    sinon.restore()
  })
  beforeEach(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves(userMock as Users);
  });
  describe('testando a rota de login', () => {
    it('vendo se é possível logar um usuário', async () => {
        sinon.stub(bcrypt, 'compareSync').returns(true);
        response = await chai.request(app).post('/login').send(userMock);
        expect(response.status).to.be.equal(401);
        token = response.body.token;

      });
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
  describe('testando a loginservice', async () => {
    afterEach(() => {
      sinon.restore();
    })
    it('testando se função getByRole retorna um usuário', async () => {
        const userMock = { email: 'usuario@example.com', role: 'admin' };
      
        sinon.stub(Users, 'findOne').resolves(userMock as Users);
      
        const result = await LoginService.getByRole('usuario@example.com');
      
        expect(result).to.be.deep.equal(userMock);
      });
  });
})
