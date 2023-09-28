import { DashboardQueries } from '../../services/dashboard';

const store = new DashboardQueries();

describe("Dashboard Model", () => {

    it('should have an completedOrdersbyUser method', () => {
        expect(store.completedOrdersbyUser).toBeDefined();
    });

    it('should have a productsbyCategory method', () => {
        expect(store.productsbyCategory).toBeDefined();
      });
    
      it('should have a fiveMostExpensive method', () => {
        expect(store.fiveMostExpensive).toBeDefined();
      });  
    
      it('completedOrdersbyUser method should show completed orders by user', async () => {
        const result = await store.completedOrdersbyUser(2);
        expect(result).toEqual([
            { 
          id: 2,
          status: 'close',
          user_id: '2'
        }
      ]);
    });

      it('productsbyCategory method should return a list of products by category', async () => {
        const result = await store.productsbyCategory('shortboards');
        expect(result).toEqual([
          {
            id: 2,
            name: 'Surfboard Manly',
            price: 360,
            category: 'shortboards'
          }
        ]);
      });
    
      it('fiveMostExpensive method should return Top 5 most expensive products', async () => {
        const result = await store.fiveMostExpensive();
        expect(result).toEqual([
        {
            name: 'Surfboard Manly',
            price: 360
        },
        { 
            name: 'Surfboard Hawaii',
            price: 350,
        }
    ]);
 });
})