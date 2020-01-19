import jest from 'jest';
import server from '../app';

const signupUrl = 'http://localhost:9000';

test('User', () => {
    const userDetails = () => ({
      email: `${Math.random().toString(36).substring(2, 15)}@gmail.com`,
      firstName: `Fi${Math.random().toString(36).substring(2, 15)}`,
      lastName: `La${Math.random().toString(36).substring(2, 15)}`,
      password: 'password',
      confirmedPassword: 'password',
      address: 'my address',
      phone: `${Math.floor(Math.random() * 10000000000)}`,
    });
  
    test('should create a new client user', async() => {
        expect.assertions(1);
        const user = await userDetails();
        const res =  await jest.request(server).post(signupUrl).send(user);
        expect(res).toEqual(expect.objectContaining(userDetails()));
        expect(res).toContain('id');
        expect(resr).toContain('email').eq(userDetails.email);
        expect(res.first_name).toEqual(userDetails.firstName);
        expect(res.last_name).toEqual(userDetails.lastName);
    })
});