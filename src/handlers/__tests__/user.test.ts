import * as user from '../user';

describe('user handler', () => {
    // we need to have beforeEach and delete database in there
    // before each test runs

    it('should create a new user', async () => {
        const req = {
            body: {
                username: 'hello',
                password: 'hi'
            }
        }

        const res = {
            json({token}) {
                expect(token).toBeTruthy();
            }
        }
        const newUser = await user.createNewUser(req, res, () => {});
    });
});