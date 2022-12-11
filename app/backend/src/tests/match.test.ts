import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import App from '../app';

import { Response } from 'superagent';
import MatchesModel from '../database/models/matchesModel';
import IMatch from '../interfaces/IMatch';
import { createTokenMock } from './login.test';

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
];

const resultMockUpdate = [
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
  },];

const mockInProgress = (InProgress: boolean) => returnModelMock.filter((match) => match.inProgress === InProgress);

const mockPostCreate = {
  id: 49,
  homeTeam: 16,
  homeTeamGoals: 2,
  awayTeam: 8,
  awayTeamGoals: 2,
  inProgress: true
};

const mockBodyPost = (idHome: number, idAway: number) => { 
  return {
    homeTeam: idHome,
    awayTeam: idAway,
    homeTeamGoals: 1,
    awayTeamGoals: 2,
  }
};

const mockPatchId = {
  homeTeamGoals: 3,
  awayTeamGoals: 1
};

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
        .resolves(mockInProgress(true) as []);
      chaiHttpResponse = await chai.request(app).get('/matches').query({inProgress: true});
      expect(chaiHttpResponse.status).to.be.eq(200);
      expect(chaiHttpResponse.body).to.be.deep.eq(mockInProgress(true));
    }); 

    it('/matches?inProgress=false get', async () => {
      sinon
        .stub(MatchesModel, "findAll")
        .resolves(mockInProgress(false) as []);
      chaiHttpResponse = await chai.request(app).get('/matches').query({inProgress: false});
      expect(chaiHttpResponse.status).to.be.eq(200);
      expect(chaiHttpResponse.body).to.be.deep.eq(mockInProgress(false));
    }); 
    
    
    // /matches post
    it('/matches post correto', async () => {
      const tokenMock = await createTokenMock();
      sinon
        .stub(MatchesModel, "create")
        .resolves(mockPostCreate as any);
      chaiHttpResponse = await chai.request(app).post('/matches')
        .send(mockBodyPost(2, 3))
        .set('authorization', tokenMock);
      expect(chaiHttpResponse.status).to.be.eq(201);
      expect(chaiHttpResponse.body).to.be.deep.eq(mockPostCreate);
    }); 

    it('/matches post com os ids iguais', async () => {
      const tokenMock = await createTokenMock();
      sinon
        .stub(MatchesModel, "create")
        .resolves(mockPostCreate as any);
      chaiHttpResponse = await chai.request(app).post('/matches')
        .send(mockBodyPost(2, 2))
        .set('authorization', tokenMock);
      expect(chaiHttpResponse.status).to.be.eq(422);
      expect(chaiHttpResponse.body).to.be.deep.eq({ message: 'It is not possible to create a match with two equal teams' });
    }); 

    it('/matches post com o idHome invalido', async () => {
      const tokenMock = await createTokenMock();
      sinon
        .stub(MatchesModel, "create")
        .resolves(mockPostCreate as any);
      chaiHttpResponse = await chai.request(app).post('/matches')
        .send(mockBodyPost(200, 2))
        .set('authorization', tokenMock);
      expect(chaiHttpResponse.status).to.be.eq(404);
      expect(chaiHttpResponse.body).to.be.deep.eq({ message: 'There is no team with such id!' });
    }); 

    it('/matches post com o idAway invalido', async () => {
      const tokenMock = await createTokenMock();
      sinon
        .stub(MatchesModel, "create")
        .resolves(mockPostCreate as any);
      chaiHttpResponse = await chai.request(app).post('/matches')
        .send(mockBodyPost(1, 200))
        .set('authorization', tokenMock);
      expect(chaiHttpResponse.status).to.be.eq(404);
      expect(chaiHttpResponse.body).to.be.deep.eq({ message: 'There is no team with such id!' });
    }); 

    it('/matches/:id/finish', async () => {
      sinon
        .stub(MatchesModel, "update")
        .resolves();
      chaiHttpResponse = await chai.request(app).patch('/matches/1/finish').send();
      expect(chaiHttpResponse.status).to.be.eq(200);
      expect(chaiHttpResponse.body).to.be.deep.eq({ message: 'Finished' });
    }); 

    it('/matches/:id/', async () => {
      sinon
        .stub(MatchesModel, "update")
        .resolves();
      chaiHttpResponse = await chai.request(app).patch('/matches/1').send(mockPatchId);
      expect(chaiHttpResponse.status).to.be.eq(200);
      expect(chaiHttpResponse.body).to.be.deep.eq({ message: 'Updated' });
    }); 
  });   