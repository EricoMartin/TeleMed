// eslint-disable-next-line
import jest from 'jest';
import supertest from 'supertest';
import mongoose from 'mongoose';
import server from '../app';
import  client from '../models/client'

const request = supertest(server);
const signupUrl = 'auth/signup';





describe('User', () => {
  const userDetails = () => ({
    username: `martinigram${Math.random().toString(36).substring(2, 5)}`,
    email: `${Math.random().toString(36).substring(2, 15)}@gmail.com`,
    firstName: `Fi${Math.random().toString(36).substring(2, 15)}`,
    lastName: `La${Math.random().toString(36).substring(2, 15)}`,
    password: 'password',
    age: parseInt('30', 10),
    confirmPassword: 'password',
    address: 'my address',
    phone: `${Math.floor(Math.random() * 10000000000)}`,
    createdAt: Date.now(),
  });


  it('should create a new client user', async (done) => {
    const user =  userDetails();
    const res = await request.post(signupUrl).send(user);
    const clientUser = await client.findOne({ email: user.email });
    expect(clientUser.email).toBeTruthy();

    expect(clientUser.email).toEqual(user.email);
    //expect(res.body.firstName).toBeTruthy();
    expect(clientUser.username).toBeTruthy();
    expect(clientUser.lastName).toBeTruthy();
    done();
  });
});



    /* 
    expect(res.body.email).toEqual(userDetails.email);
    expect(res.body.firstName).toEqual(userDetails.firstName);
    expect(res.body.username).toEqual(userDetails.username);
    expect(res.body.lastName).toEqual(userDetails.lastName);
    expect(clientUser.email).toBeTruthy();
    */
    