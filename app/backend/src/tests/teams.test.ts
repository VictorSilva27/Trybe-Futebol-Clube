import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

import { Response } from 'superagent';
import TeamModel from '../database/models/teamsModel';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

const mockBody = {
    email: 'string@gmail.com',
    password: 'não tenta'
}

const returnModelMock = [
    {
      id: 1,
      teamName: "Avaí/Kindermann"
    },
    {
      id: 2,
      teamName: "Bahia"
    },
    {
      id: 3,
      teamName: "Botafogo"
    },
  ];

describe('Rota /teams', () => {
  let chaiHttpResponse: Response;
  afterEach(sinon.restore);
  it('/teams get', async () => {
    sinon
      .stub(TeamModel, "findAll")
      .resolves(returnModelMock as TeamModel[]);
    chaiHttpResponse = await chai.request(app).get('/teams').send();
    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.deep.eq(returnModelMock);
  });
  it('/teams/:id', async () => {
    sinon
      .stub(TeamModel, "findOne")
      .resolves(returnModelMock[1] as TeamModel);
    chaiHttpResponse = await chai.request(app).get('/teams/2').send();
    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.deep.eq(returnModelMock[1]);
  });  
});   
