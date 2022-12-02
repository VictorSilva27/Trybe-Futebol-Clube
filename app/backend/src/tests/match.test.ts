import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import App from '../app';

import { Response } from 'superagent';
import MatchesModel from '../database/models/matchesModel';
import IMatch from '../interfaces/IMatch';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

const returnModelMock = [
    {
      id: 1,
      homeTeam: 16,
      homeTeamGoals: 1,
      awayTeam: 8,
      awayTeamGoals: 1,
      inProgress: false,
      teamHome: {
        teamName: "São Paulo"
      },
      teamAway: {
        teamName: "Grêmio"
      },
    },
    {
      id: 2,
      homeTeam: 16,
      homeTeamGoals: 2,
      awayTeam: 9,
      awayTeamGoals: 0,
      inProgress: true,
      teamHome: {
        teamName: "São Paulo"
      },
      teamAway: {
        teamName: "Internacional"
      },
    },
  ]

describe('Rota /matches', () => {
    let chaiHttpResponse: Response;
    afterEach(sinon.restore);

    it('/matches get', async () => {
      sinon
        .stub(MatchesModel, "findAll")
        .resolves(returnModelMock as []);
      chaiHttpResponse = await chai.request(app).get('/matches').send();
      expect(chaiHttpResponse.status).to.be.eq(200);
      expect(chaiHttpResponse.body).to.be.deep.eq(returnModelMock);
    }); 

    it('/matches?inProgress=true get', async () => {
      sinon
        .stub(MatchesModel, "findAll")
        .resolves(returnModelMock as []);
      chaiHttpResponse = await chai.request(app).get('/matches').query({inProgress: true});
      console.log(chaiHttpResponse.body);
      expect(chaiHttpResponse.status).to.be.eq(200);
    //   expect(chaiHttpResponse.body).to.be.deep.eq([returnModelMock[1]]);
    }); 

    it('/matches?inProgress=false get', async () => {
      sinon
        .stub(MatchesModel, "findAll")
        .resolves(returnModelMock as []);
      chaiHttpResponse = await chai.request(app).get('/matches').query({inProgress: false});
      expect(chaiHttpResponse.status).to.be.eq(200);
    //   expect(chaiHttpResponse.body).to.be.deep.eq([returnModelMock[0]]);
    }); 
  });   