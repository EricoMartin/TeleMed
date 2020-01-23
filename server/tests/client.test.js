// eslint-disable-next-line
import jest from 'jest';
import supertest from 'supertest';
import server from '../app';

const request = supertest(server);
const signupUrl = '/api/v1/auth/signup';

describe('User', () => {
  const userDetails = () => ({
    username: `martinigram${Math.random().toString(36).substring(2, 5)}`,
    email: `${Math.random().toString(36).substring(2, 15)}@gmail.com`,
    firstName: `Fi${Math.random().toString(36).substring(2, 15)}`,
    lastName: `La${Math.random().toString(36).substring(2, 15)}`,
    password: 'password',
    age: parseInt('30', 10),
    confirmedPassword: 'password',
    address: 'my address',
    phone: `${Math.floor(Math.random() * 10000000000)}`,
  });


  it('should create a new client user', async (done) => {
    expect.assertions(1);

    const user = await userDetails();
    const res = await request.post(signupUrl).send(user);
    expect(res).toEqual(expect.objectContaining(userDetails()));
    expect(res).toContain('id');
    expect(res).toContain('email').eq(userDetails.email);
    expect(res.firstName).toEqual(userDetails.firstName);
    expect(res.lastName).toEqual(userDetails.lastName);
    done();
  });
});
