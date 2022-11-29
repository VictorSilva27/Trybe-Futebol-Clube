import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../../app';
import UserModel from '../../database/models/userModel';
import IUser from '../../interfaces/IUser';

import { Response } from 'superagent';
import LoginService from '../../mscr/services/login.service';

chai.use(chaiHttp);

const { app } = new App();

const { getUsername } = new LoginService();

const { expect } = chai;

const mock = {
  id: 1,
  username: 'Victor',
  role: 'Admin',
  email: 'victoradaosilva2@gmail.com',
};

describe('loginService', () => {

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(UserModel, "findOne")
      .resolves(mock as UserModel);
  });

  afterEach(()=>{
    (UserModel.findOne as sinon.SinonStub).restore();
  })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('getUsername', async () => {
    const result = await getUsername('victoradaosilva2@gmail.com')
    expect(result).to.be.eq(mock);
  });
});
