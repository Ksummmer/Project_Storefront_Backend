import { User, UserStore } from '../../models/user';


const store = new UserStore();

describe("Users Store Model", () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
      });
    
      it('should have a create method', () => {
        expect(store.create).toBeDefined();
      });  

      it('should have an authenticate method', () => {
        expect(store.authenticate).toBeDefined();
      });  
    
      it('create method should add new user', async () => {
         const testUser5: User = {
            username: 'testUser5',
            firstname: 'Xenya', 
            lastname: 'Sarman',
            password: 'password123'
        }

        const result = await store.create(testUser5);
        expect(result.username).toEqual('testUser5');
        expect(result.firstname).toEqual('Xenya');
        expect(result.lastname).toEqual('Sarman');
      });

      it('index method should return a number of users', async () => {
        const result = await store.index();
        expect(result.length).toEqual(5);
      });
    
      it('show method should return the correct user', async () => {
        const result = await store.show(5);
        expect(result.firstname).toBe('Xenya');
      });

      it('authenticate method should check if the password is wrong', async () => {
        const result1 = await store.authenticate('testUser5', 'password321');
        expect(result1).toBe('Wrong password');
      });
})



