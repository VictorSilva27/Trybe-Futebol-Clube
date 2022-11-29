import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../../app';
import UserModel from '../../database/models/userModel';
import IUser from '../../interfaces/IUser';
import LoginController from '../../mscr/controllers/loginController';
import LoginService from '../../mscr/services/login.service';
import { Request, Response } from 'express';

LoginController

chai.use(chaiHttp);

const { app } = new App();

const service = new LoginService();
const {getByUsernameAndPassword, getUserByToken} = new LoginController();

const { expect } = chai;

const mock = {
  id: 1,
  username: 'Victor',
  role: 'Admin',
  email: 'victoradaosilva2@gmail.com',
};

describe('getByUsernameAndPassword', () => {

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

  it('getByUsernameAndPassword', async () => {
    const req = { body: {
        email: 'victorsilva@gmail.com',
        password: 'segredo'
    } }
    const res = { status: 200, json: { } };
    res.json = sinon.stub().returns({ token: 'hehehe' });
    sinon.stub(service, 'getUsername').resolves(
        {
            id: 1,
            username: 'Victor',
            role: 'Admin',
            email: 'victoradaosilva2@gmail.com',
          }
      );

    await getByUsernameAndPassword(req as Request, res)
  });
});
