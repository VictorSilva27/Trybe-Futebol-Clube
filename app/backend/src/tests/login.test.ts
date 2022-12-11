import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as bcrypt from 'bcryptjs';

import App from '../app';

import { Response } from 'superagent';
import UserModel from '../database/models/userModel';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

const mockBody = {
    email: 'string@gmail.com',
    password: 'não tenta'
}

const mockBodyPasswordFalse = {
    email: 'string@gmail.com',
    password: 'não consegue'
}

const mockBodyEmailFalse = {
    email: 'nemtenta@hotmail.com',
    password: 'não tenta'
}

const mockBodyErrorEmail = {
    email: 'string',
    password: 'não tenta'
}

const mockBodyErrorPassword = {
    email: 'string@gmail.com',
    password: 'não'
}

const returnModelMock = {
    id: 1,
    username: 'VictorSilva27',
    email: 'string@gmail.com',
    password: 'não tenta',
    role: 'Admin',
}

// sempre altere a const token, com o resultado da roda post /login, para a verificar correto
let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJ1c2VybmFtZSI6IlVzZXIiLCJyb2xlIjoidXNlciIsImVtYWlsIjoidXNlckB1c2VyLmNvbSIsInBhc3N3b3JkIjoiJDJhJDA4JFk4QWJpOGpYdnNYeXFtLnJtcDBCLnVRQkE1cVV6N1Q2R2hsZy9DdlZyL2dMeFlqNVVBWlZPIn0sImlhdCI6MTY3MDUzNTE0MywiZXhwIjoxNjcwNjIxNTQzfQ.l7K-nivevzF8qKZEQl9lQzY2FcfU9mdTrawI0dTFmY8`;
const tokenInvalid = `hehe`;
const role = { role: 'Admin' };

const createTokenMock = async () => {
  let chaiHttpResponse: Response;
  sinon
      .stub(UserModel, "findOne")
      .resolves(returnModelMock as UserModel);
  sinon.stub(bcrypt, 'compareSync').returns(true);
  chaiHttpResponse = await chai.request(app).post('/login').send(mockBody);
  return chaiHttpResponse.body.token;
}

describe('Rota /login', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(UserModel, "findOne")
      .resolves(returnModelMock as UserModel);
  });

  afterEach(sinon.restore);
  it('/login post correto', async () => {
    sinon.stub(bcrypt, 'compareSync').returns(true);
    chaiHttpResponse = await chai.request(app).post('/login').send(mockBody);
    expect(chaiHttpResponse.status).to.be.eq(200);
    token = chaiHttpResponse.body.token;
  });
  it('/login post erro 400 sem o campo "email"', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(mockBody.password);
    expect(chaiHttpResponse.status).to.be.eq(400);
  });
  it('/login post erro 400 sem o campo password', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send(mockBody.email);
      expect(chaiHttpResponse.status).to.be.eq(400);
  });  
  it('/login post erro 422 campo email invalido', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send(mockBodyErrorEmail);
      expect(chaiHttpResponse.status).to.be.eq(422);
  });  
  it('/login post erro 422 campo password com menos de 6 caracteres', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send(mockBodyErrorPassword);
      expect(chaiHttpResponse.status).to.be.eq(422);
  });  
  it('/login post erro 401 com password invalido', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(mockBodyPasswordFalse);
    expect(chaiHttpResponse.status).to.be.eq(401);
    expect(chaiHttpResponse.body).to.be.deep.eq({ message: 'Incorrect email or password' });
  });  
  it('/login post erro 401 com email invalido', async () => {
    sinon.restore();
    chaiHttpResponse = await chai.request(app).post('/login').send(mockBodyEmailFalse);
    expect(chaiHttpResponse.status).to.be.eq(401);
    expect(chaiHttpResponse.body).to.be.deep.eq({ message: 'Incorrect email or password' });
  });  
  it('/login/validate get token correto', async () => {
    chaiHttpResponse = await chai.request(app).get('/login/validate').set('authorization', token);
    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.deep.eq(role);
  });

  it('/login/validate get sem token', async () => {
    chaiHttpResponse = await chai.request(app).get('/login/validate').send();
    expect(chaiHttpResponse.status).to.be.eq(401);
  });
  it('/login/validate get token invalido', async () => {
    chaiHttpResponse = await chai.request(app).get('/login/validate').set('authorization', tokenInvalid);
    expect(chaiHttpResponse.status).to.be.eq(401);
  });
});   

export { createTokenMock };