import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Rota /leaderboard', () => {
  let chaiHttpResponse: Response;
  afterEach(sinon.restore);
  it('/leaderboard get', async () => {
    chaiHttpResponse = await chai.request(app).get('/leaderboard').send();
    expect(chaiHttpResponse.status).to.be.eq(200);
  });
  it('/leaderboard/home', async () => {
    chaiHttpResponse = await chai.request(app).get('/leaderboard/home').send();
    expect(chaiHttpResponse.status).to.be.eq(200);
  });  
  it('/leaderboard/away', async () => {
    chaiHttpResponse = await chai.request(app).get('/leaderboard/away').send();
    expect(chaiHttpResponse.status).to.be.eq(200);
  });  
});   
