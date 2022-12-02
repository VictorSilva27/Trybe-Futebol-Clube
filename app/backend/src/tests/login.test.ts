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

const returnModelMock = {
    id: 1,
    username: 'VictorSilva27',
    email: 'string@gmail.com',
    password: 'não tenta',
    role: 'Admin',
}

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJ1c2VybmFtZSI6IlVzZXIiLCJyb2xlIjoidXNlciIsImVtYWlsIjoidXNlckB1c2VyLmNvbSIsInBhc3N3b3JkIjoiJDJhJDA4JFk4QWJpOGpYdnNYeXFtLnJtcDBCLnVRQkE1cVV6N1Q2R2hsZy9DdlZyL2dMeFlqNVVBWlZPIn0sImlhdCI6MTY2OTk5MjgxMiwiZXhwIjoxNjcwMDc5MjEyfQ._mjsrLv_Zei6rlUXXFH0hVl_i9RIcvWdUMOQwCHsD84`;
const tokenInvalid = `hehe`;
const role = { role: 'user' };

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
  });
  it('/login post erro 400 sem o campo "email"', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(mockBody.password);
    expect(chaiHttpResponse.status).to.be.eq(400);
  });
  it('/login post erro 400 sem o campo password', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send(mockBody.email);
      expect(chaiHttpResponse.status).to.be.eq(400);
  });  
  it('/login post err0 401 com email invalido', async () => {
    sinon.stub(bcrypt, 'compareSync').returns(false);
    chaiHttpResponse = await chai.request(app).post('/login').send(mockBody);
    expect(chaiHttpResponse.status).to.be.eq(401);
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
